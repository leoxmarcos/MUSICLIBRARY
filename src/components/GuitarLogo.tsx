import React from 'react';

export const MusicBookLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 40 40"
    width="40"
    height="40"
    role="img"
    aria-label="Muse Music Library Logo"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))' }} />
      </linearGradient>
    </defs>
    
    <g fill="url(#logoGradient)">
      {/* Book shape */}
      <path d="M32,5H8C6.9,5,6,5.9,6,7v26c0,1.1,0.9,2,2,2h24c1.1,0,2-0.9,2-2V7C34,5.9,33.1,5,32,5z M20,33V7h12v26H20z" />
      {/* Musical notes */}
      <path d="M14,12.2c0-1.1-0.9-2-2-2s-2,0.9-2,2v8.5c-0.6-0.3-1.3-0.5-2-0.5c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4v-11l6-2v8.5 c-0.6-0.3-1.3-0.5-2-0.5c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4V12L14,12.2z" fill="hsl(var(--background))" />
    </g>
  </svg>
);

// For backward compatibility if GuitarLogo is used elsewhere
export const GuitarLogo = MusicBookLogo;
