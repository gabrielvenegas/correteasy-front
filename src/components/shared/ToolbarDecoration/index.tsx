import React from 'react';

const ToolbarDecoration = (propriedadesComuns: any): JSX.Element => (
  <div {...propriedadesComuns} className="ToolbarDecoration">
    <svg
      width="124"
      height="90"
      viewBox="0 0 124 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M-53.0734 127.427L142.744 -67.067L175.473 -34.5596L-20.3447 159.934L-53.0734 127.427Z"
          fill="#00B495"
        />
        <path
          d="M38.4563 46.4335L153.284 -67.6183L154.394 -66.5163L39.5657 47.5354L38.4563 46.4335Z"
          fill="white"
        />
        <path
          d="M-53.6281 118.06L57.8714 7.31434L78.3962 27.7004L-33.1033 138.446L-53.6281 118.06Z"
          fill="#F79552"
        />
        <path
          d="M145.487 5.25684L90.4035 59.9679L73.7297 43.4067L128.813 -11.3044L145.487 5.25684Z"
          fill="#C81A78"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="124" height="65" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

export default ToolbarDecoration;
