import React, { useState } from 'react';
import { Code2, Copy, Check, Download } from 'lucide-react';

const EXPORT_META = {
  css: {
    label: 'CSS Variables',
    filename: 'chromify-palette.css',
    mime: 'text/css;charset=utf-8',
  },
  tailwind: {
    label: 'Tailwind Config',
    filename: 'tailwind.colors.js',
    mime: 'application/javascript;charset=utf-8',
  },
  hex: {
    label: 'HEX List',
    filename: 'chromify-palette.txt',
    mime: 'text/plain;charset=utf-8',
  },
};

export default function ExportPanel({ colors, onCopy, onNotify }) {
  const [format, setFormat] = useState('css');
  const [copiedFormat, setCopiedFormat] = useState(null);

  if (!colors || colors.length === 0) return null;

  const getExportCode = () => {
    switch (format) {
      case 'css':
        return `:root {\n${colors
          .map((c, i) => `  --color-${i + 1}: ${c.hex}; /* ${c.name} */`)
          .join('\n')}\n}`;
      case 'tailwind':
        return `// tailwind.config.js\nexport default {\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n${colors
          .map((c, i) => `          ${(i + 1) * 100}: '${c.hex}', // ${c.name}`)
          .join('\n')}\n        },\n      },\n    },\n  },\n};`;
      case 'hex':
        return colors.map((c) => c.hex).join('\n');
      default:
        return '';
    }
  };

  const code = getExportCode();
  const meta = EXPORT_META[format];

  const handleCopySnippet = () => {
    onCopy(code, `Copied ${meta.label} to clipboard!`);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 1500);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([code], { type: meta.mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = meta.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onNotify) {
      onNotify(`Downloaded ${meta.filename}!`);
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Developer-Ready Export</h2>
            <p className="text-xs text-slate-400">
              Copy or download your active palette as CSS variables, Tailwind config, or a plain HEX list.
            </p>
          </div>
        </div>

        {/* Format Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          {Object.entries(EXPORT_META).map(([id, item]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFormat(id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                format === id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Block with Copy & Download */}
      <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-end gap-2 mb-3 sm:mb-0 sm:absolute sm:top-3 sm:right-3">
          <button
            type="button"
            onClick={handleDownloadFile}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-sans font-semibold transition-colors shadow-sm"
            title={`Download ${meta.filename}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {meta.filename.split('.').pop().toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={handleCopySnippet}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-sans font-semibold transition-colors"
          >
            {copiedFormat === format ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-indigo-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <pre className="leading-relaxed sm:pr-56">{code}</pre>
      </div>
    </div>
  );
}
