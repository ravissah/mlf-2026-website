export function RangoliPattern() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="opacity-20"
      style={{ fill: 'var(--mlf-gold)' }}
    >
      {/* Center Circle */}
      <circle cx="50" cy="50" r="8" />
      
      {/* Petal Pattern */}
      <path d="M 50 50 Q 40 30 50 20 Q 60 30 50 50" />
      <path d="M 50 50 Q 70 40 80 50 Q 70 60 50 50" />
      <path d="M 50 50 Q 60 70 50 80 Q 40 70 50 50" />
      <path d="M 50 50 Q 30 60 20 50 Q 30 40 50 50" />
      
      {/* Diagonal Petals */}
      <path d="M 50 50 Q 35 35 28 28 Q 38 32 50 50" />
      <path d="M 50 50 Q 65 35 72 28 Q 62 38 50 50" />
      <path d="M 50 50 Q 65 65 72 72 Q 62 62 50 50" />
      <path d="M 50 50 Q 35 65 28 72 Q 38 62 50 50" />
      
      {/* Dots */}
      <circle cx="50" cy="15" r="3" />
      <circle cx="85" cy="50" r="3" />
      <circle cx="50" cy="85" r="3" />
      <circle cx="15" cy="50" r="3" />
    </svg>
  );
}

export function ArchPattern() {
  return (
    <svg
      width="200"
      height="100"
      viewBox="0 0 200 100"
      className="opacity-30"
      style={{ fill: 'none', stroke: 'var(--mlf-gold)', strokeWidth: '2' }}
    >
      <path d="M 0 100 Q 50 20 100 100" />
      <path d="M 100 100 Q 150 20 200 100" />
      <path d="M 25 100 Q 62.5 40 100 100" />
      <path d="M 100 100 Q 137.5 40 175 100" />
    </svg>
  );
}

export function DiamondPattern() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      className="opacity-20"
    >
      <path
        d="M 30 5 L 55 30 L 30 55 L 5 30 Z"
        style={{ fill: 'none', stroke: 'var(--mlf-saffron)', strokeWidth: '2' }}
      />
      <path
        d="M 30 15 L 45 30 L 30 45 L 15 30 Z"
        style={{ fill: 'none', stroke: 'var(--mlf-indigo)', strokeWidth: '2' }}
      />
      <circle cx="30" cy="30" r="4" style={{ fill: 'var(--mlf-leaf-green)' }} />
    </svg>
  );
}
