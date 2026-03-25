export const Chevrons = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
    <svg
      className="h-full w-auto"
      viewBox="0 0 300 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMid slice"
    >
      <path
        d="M100 0 L220 180 L100 360 L160 360 L280 180 L160 0 Z"
        fill="white"
        fillOpacity="0.06"
      />
      <path
        d="M30 0 L150 180 L30 360 L90 360 L210 180 L90 0 Z"
        fill="white"
        fillOpacity="0.04"
      />
    </svg>
  </div>
);
