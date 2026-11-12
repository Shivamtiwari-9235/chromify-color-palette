/**
 * Chromify Color Utility & Harmony Engine
 * Pure client-side mathematical color conversions, WCAG 2.1 calculation,
 * color naming heuristics, and color theory harmony generators.
 */

// Validate 3 or 6 digit hex string (with or without #)
export function isValidHex(hex) {
  if (typeof hex !== 'string') return false;
  const cleaned = hex.trim().replace(/^#/, '');
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleaned);
}

// Normalize hex to standard #RRGGBB format
export function normalizeHex(hex) {
  if (!isValidHex(hex)) return '#000000';
  let cleaned = hex.trim().replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return `#${cleaned.toUpperCase()}`;
}

// Convert HEX to RGB { r, g, b } (0-255)
export function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  const num = parseInt(normalized.slice(1), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Convert RGB to HEX #RRGGBB
export function rgbToHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v) => clamp(v).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Convert RGB to HSL { h, s, l } (h: 0-360, s: 0-100, l: 0-100)
export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h *= 60;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Convert HEX directly to HSL { h, s, l }
export function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
}

// Convert HSL to RGB { r, g, b }
export function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Convert HSL to HEX
export function hslToHex(h, s, l) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

// Relative luminance per WCAG 2.1 specification
export function getLuminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate WCAG 2.1 contrast ratio between two HEX colors (1.0 to 21.0)
export function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

// Detailed WCAG 2.1 compliance breakdown for any two colors
export function getWcagCompliance(hex1, hex2) {
  const ratio = getContrastRatio(hex1, hex2);
  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaaNormal: ratio >= 7.0,
    aaaLarge: ratio >= 4.5,
    uiComponent: ratio >= 3.0,
  };
}

// Determine if a color is perceived as dark (WCAG luminance midpoint ~0.179)
export function isDarkColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  return getLuminance(r, g, b) <= 0.179;
}

// Compute WCAG compliance label against dark/light surfaces
export function getWcagInfo(hex) {
  const contrastOnDark = getContrastRatio(hex, '#0F172A');
  const contrastOnLight = getContrastRatio(hex, '#FFFFFF');
  const maxContrast = Math.max(contrastOnDark, contrastOnLight);
  const surface = contrastOnDark >= contrastOnLight ? 'Dark' : 'Light';

  let grade = 'Fail';
  if (maxContrast >= 7.0) grade = 'AAA';
  else if (maxContrast >= 4.5) grade = 'AA';
  else if (maxContrast >= 3.0) grade = 'AA (Lg)';

  return {
    ratio: Number(maxContrast.toFixed(1)),
    grade,
    surface,
    summary: `${grade} ${maxContrast.toFixed(1)}:1`,
  };
}

// Color naming heuristic for UI palettes
export function getColorName(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const { h, s, l } = hsl;

  if (s <= 10) {
    if (l < 15) return 'Obsidian Black';
    if (l < 30) return 'Deep Slate';
    if (l < 60) return 'Cool Charcoal';
    if (l < 85) return 'Muted Platinum';
    return 'Snow Crisp';
  }

  let hueName = 'Color';
  if (h >= 345 || h < 15) hueName = 'Crimson Coral';
  else if (h >= 15 && h < 45) hueName = 'Sunset Orange';
  else if (h >= 45 && h < 70) hueName = 'Amber Gold';
  else if (h >= 70 && h < 150) hueName = 'Emerald Mint';
  else if (h >= 150 && h < 190) hueName = 'Aqua Teal';
  else if (h >= 190 && h < 250) hueName = 'Electric Blue';
  else if (h >= 250 && h < 290) hueName = 'Royal Indigo';
  else if (h >= 290 && h < 330) hueName = 'Vivid Magenta';
  else hueName = 'Rose Quartz';

  let tone = '';
  if (l < 25) tone = 'Deep ';
  else if (l > 75) tone = 'Soft ';
  else if (s > 75) tone = 'Vibrant ';
  else if (s < 40) tone = 'Muted ';

  return `${tone}${hueName}`;
}

// Role assignments for visual product hierarchy
export const SWATCH_ROLES = [
  'Surface / Base',
  'Primary Brand',
  'Interactive Accent',
  'Semantic Success',
  'Highlight / Notice',
];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate 5 Harmonious Colors
 * Respects all locked swatches independently and guarantees unlocked swatches
 * regenerate with fresh harmonious variations on every call.
 *
 * @param {'analogous'|'complementary'|'triadic'|'split-complementary'|'monochromatic'} mode
 * @param {Array} existingColors - array of 5 current color objects
 * @returns {Array} array of 5 color objects
 */
export function generateHarmoniousPalette(mode = 'analogous', existingColors = []) {
  const lockedSwatches = existingColors.filter((c) => c && c.isLocked);

  let baseHue;
  if (lockedSwatches.length > 0) {
    // Pick a random locked swatch as the harmony anchor so multiple locks still yield fresh variations
    const anchor = lockedSwatches[Math.floor(Math.random() * lockedSwatches.length)];
    const { r, g, b } = hexToRgb(anchor.hex);
    baseHue = rgbToHsl(r, g, b).h;
  } else {
    // Pick a fresh base hue distinct from any existing primary swatch
    const prevHue =
      existingColors[1]?.hex ? hexToHsl(existingColors[1].hex).h : null;
    baseHue = Math.floor(Math.random() * 360);
    if (prevHue !== null && Math.abs(baseHue - prevHue) < 30) {
      baseHue = (baseHue + 60 + randInt(0, 120)) % 360;
    }
  }

  // Random jitter for saturation & lightness so locked palettes always produce new unlocked variations
  const hasLocks = lockedSwatches.length > 0;
  const hueJitter = hasLocks ? randInt(-14, 14) : randInt(-6, 6);
  const satJitter = () => randInt(-10, 10);
  const lightJitter = () => randInt(-8, 8);

  let targets = [];

  switch (mode.toLowerCase()) {
    case 'analogous': {
      const baseOffsets = [-36, -18, 0, 20, 40];
      const baseLightnesses = [18, 46, 56, 68, 86];
      const baseSaturations = [42, 76, 82, 76, 52];

      // Shift the analogous window slightly when locked so repeated clicks explore different adjacent tones
      const windowShift = hasLocks ? randInt(-25, 25) : 0;

      targets = baseOffsets.map((off, idx) => ({
        h: (baseHue + off + windowShift + randInt(-5, 5) + 360) % 360,
        s: Math.max(20, Math.min(95, baseSaturations[idx] + satJitter())),
        l: Math.max(12, Math.min(92, baseLightnesses[idx] + lightJitter())),
      }));
      break;
    }

    case 'complementary': {
      const compHue = (baseHue + 180 + hueJitter + 360) % 360;
      const splitOffset = hasLocks ? randInt(-22, 22) : randInt(-12, 12);
      targets = [
        { h: (baseHue + randInt(-8, 8) + 360) % 360, s: Math.max(25, 44 + satJitter()), l: Math.max(12, 17 + lightJitter()) },
        { h: (baseHue + randInt(-6, 6) + 360) % 360, s: Math.min(95, 78 + satJitter()), l: 50 + lightJitter() },
        { h: (compHue + splitOffset + 360) % 360, s: 76 + satJitter(), l: 58 + lightJitter() },
        { h: (compHue + randInt(-10, 10) + 360) % 360, s: Math.min(96, 84 + satJitter()), l: 54 + lightJitter() },
        { h: (baseHue + 20 + splitOffset + 360) % 360, s: Math.max(25, 42 + satJitter()), l: Math.min(92, 86 + lightJitter()) },
      ];
      break;
    }

    case 'triadic': {
      const rot = hasLocks ? randInt(-15, 15) : 0;
      const h1 = (baseHue + rot + 360) % 360;
      const h2 = (h1 + 120) % 360;
      const h3 = (h1 + 240) % 360;
      targets = [
        { h: h1, s: Math.max(25, 42 + satJitter()), l: Math.max(12, 18 + lightJitter()) },
        { h: h1, s: Math.min(95, 80 + satJitter()), l: 52 + lightJitter() },
        { h: (h2 + randInt(-8, 8) + 360) % 360, s: 76 + satJitter(), l: 56 + lightJitter() },
        { h: (h3 + randInt(-8, 8) + 360) % 360, s: 78 + satJitter(), l: 54 + lightJitter() },
        { h: h2, s: Math.max(25, 45 + satJitter()), l: Math.min(92, 85 + lightJitter()) },
      ];
      break;
    }

    case 'split-complementary': {
      const splitOffset = hasLocks ? randInt(-15, 15) : 0;
      const splitHueA = (baseHue + 150 + splitOffset + 360) % 360;
      const splitHueB = (baseHue + 210 + splitOffset + 360) % 360;
      targets = [
        { h: (baseHue + randInt(-8, 8) + 360) % 360, s: Math.max(25, 42 + satJitter()), l: Math.max(12, 18 + lightJitter()) },
        { h: baseHue, s: Math.min(95, 80 + satJitter()), l: 52 + lightJitter() },
        { h: (splitHueA + randInt(-8, 8) + 360) % 360, s: 76 + satJitter(), l: 56 + lightJitter() },
        { h: (splitHueB + randInt(-8, 8) + 360) % 360, s: 78 + satJitter(), l: 54 + lightJitter() },
        { h: (baseHue + 20 + 360) % 360, s: Math.max(25, 45 + satJitter()), l: Math.min(92, 85 + lightJitter()) },
      ];
      break;
    }

    case 'monochromatic': {
      const lightSteps = [16, 35, 52, 70, 88];
      const satSteps = [48, 70, 84, 72, 44];
      targets = lightSteps.map((l, idx) => ({
        h: baseHue,
        s: Math.max(18, Math.min(96, satSteps[idx] + randInt(-14, 14))),
        l: Math.max(10, Math.min(94, l + randInt(-7, 7))),
      }));
      break;
    }

    default: {
      targets = [
        { h: baseHue, s: 40, l: 18 },
        { h: (baseHue + 20) % 360, s: 75, l: 50 },
        { h: (baseHue + 40) % 360, s: 80, l: 60 },
        { h: (baseHue + 60) % 360, s: 75, l: 70 },
        { h: (baseHue + 80) % 360, s: 45, l: 88 },
      ];
    }
  }

  return targets.map((target, index) => {
    const existing = existingColors[index];

    // Strictly preserve locked swatch without modifying its color or lock state
    if (existing && existing.isLocked) {
      return { ...existing };
    }

    let newHex = hslToHex(target.h, target.s, target.l);

    // Guarantee unlocked swatch visibly changes from its previous value
    if (existing && newHex === existing.hex) {
      const nudgedL = target.l > 50 ? target.l - 12 : target.l + 12;
      const nudgedH = (target.h + 15) % 360;
      newHex = hslToHex(nudgedH, target.s, nudgedL);
    }

    const wcag = getWcagInfo(newHex);

    return {
      id: `swatch-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      hex: newHex,
      name: getColorName(newHex),
      role: SWATCH_ROLES[index] || 'Palette Color',
      isLocked: false,
      wcag: wcag.summary,
      isDark: isDarkColor(newHex),
    };
  });
}

// LocalStorage persistence helpers
const ACTIVE_PALETTE_KEY = 'chromify_active_palette';
const SAVED_PALETTES_KEY = 'chromify_saved_palettes';

export function loadActivePalette() {
  try {
    const raw = localStorage.getItem(ACTIVE_PALETTE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 5) return parsed;
  } catch {
    // Ignore storage errors
  }
  return null;
}

export function saveActivePalette(colors) {
  try {
    localStorage.setItem(ACTIVE_PALETTE_KEY, JSON.stringify(colors));
  } catch {
    // Ignore storage errors
  }
}

export function loadSavedPalettes() {
  try {
    const raw = localStorage.getItem(SAVED_PALETTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        Array.isArray(item.colors) &&
        item.colors.length === 5
    );
  } catch {
    return [];
  }
}

export function savePalettesToStorage(palettes) {
  try {
    localStorage.setItem(SAVED_PALETTES_KEY, JSON.stringify(palettes));
    return true;
  } catch {
    return false;
  }
}

export function isDuplicatePalette(colors, savedList) {
  if (!Array.isArray(colors) || !Array.isArray(savedList)) return false;
  const signature = colors.map((c) => normalizeHex(c.hex)).join('|');
  return savedList.some(
    (item) =>
      Array.isArray(item.colors) &&
      item.colors.map((c) => normalizeHex(c.hex)).join('|') === signature
  );
}
