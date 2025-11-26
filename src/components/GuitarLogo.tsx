import React from 'react';

export const GuitarLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 160 40"
    width="160"
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
      <style>
        {`
          .guitar-icon {
            fill: url(#logoGradient);
            transform-origin: center;
            transform: rotate(-15deg) scale(0.9) translate(-2px, 2px);
          }
        `}
      </style>
    </defs>
    
    <g className="guitar-icon">
      <path d="M30.4,11.2c-0.8-0.8-2-1.2-3.2-1.2c-1.2,0-2.4,0.4-3.2,1.2c-1.8,1.8-1.8,4.6,0,6.4l8.8,8.8c1.8,1.8,4.6,1.8,6.4,0 c1.8-1.8,1.8-4.6,0-6.4L30.4,11.2z M35.2,18.8c-0.4,0.4-1,0.4-1.4,0L25,10c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l8.8,8.8 C35.6,17.8,35.6,18.4,35.2,18.8z" />
      <path d="M12.4,30.8l-1.6,1.6c-0.6,0.6-0.6,1.6,0,2.2c0.6,0.6,1.6,0.6,2.2,0l1.6-1.6L12.4,30.8z" />
      <path d="M19.6,23.6L9.2,34c-0.8,0.8-0.8,2,0,2.8c0.8,0.8,2,0.8,2.8,0l10.4-10.4L19.6,23.6z" />
    </g>
    
    <text
      x="45"
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
