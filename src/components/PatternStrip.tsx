import type { CSSProperties } from 'react';


export function PatternStrip({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-100 ${className}`}
      style={{
        height: '0.75rem',
        backgroundImage: `repeating-linear-gradient(
          45deg,
          var(--brand-red) 0px, var(--brand-red) 12px,
          var(--brand-red-deep) 12px, var(--brand-red-deep) 24px,
          var(--color-dark) 24px, var(--color-dark) 36px
        )`,
      }}
      aria-hidden="true"
    />
  );
}

export function PatternMotif({
  className = '',
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 120 24"
      className={className}
      style={style}
      aria-hidden="true"
      preserveAspectRatio="xMinYMid"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 24}, 0)`}>
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            transform="rotate(45 12 12)"
            fill="none"
            stroke="var(--brand-red)"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="3" fill="var(--brand-red-deep)" />
        </g>
      ))}
    </svg>
  );
}
