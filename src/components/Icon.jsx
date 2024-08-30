import React from 'react';

const Icon = ({ color = '#ffffff', className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={color}
      d={props.path}
    />
  </svg>
);

export default Icon;
