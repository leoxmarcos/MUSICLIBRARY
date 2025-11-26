import React from 'react';

export const GuitarLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 128 40"
    width="128"
    height="40"
    role="img"
    aria-label="Music Library Logo"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#007BFF', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8A2BE2', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text
      x="0"
      y="30"
      fontFamily="Poppins, sans-serif"
      fontSize="32"
      fontWeight="600"
      fill="url(#logoGradient)"
    >
      Muse
    </text>
  </svg>
);
