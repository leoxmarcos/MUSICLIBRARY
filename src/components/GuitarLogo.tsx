import React from 'react';

export const GuitarLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    role="img"
    aria-label="Music Library Logo"
    {...props}
  >
    <path
      fill="currentColor"
      d="M60,10 C50,20 45,35 45,50 C45,65 50,80 60,90 L40,90 C30,80 25,65 25,50 C25,35 30,20 40,10 L60,10 Z M50,45 a5,5 0 1,0 0,10 a5,5 0 1,0 0,-10"
    />
    <path
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      d="M70,50 L90,50 M75,20 L75,80"
    />
  </svg>
);
