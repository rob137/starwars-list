import React, { SVGAttributes } from 'react';

function HeroIconFilter(props: SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-current ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M2.3 7.7A1 1 0 012 7V3a1 1 0 011-1h18a1 1 0 011 1v4a1 1 0 01-.3.7L15 14.42V17a1 1 0 01-.3.7l-4 4A1 1 0 019 21v-6.59l-6.7-6.7zM4 4v2.59l6.7 6.7a1 1 0 01.3.71v4.59l2-2V14a1 1 0 01.3-.7L20 6.58V4H4z"></path>
    </svg>
  );
}

export default HeroIconFilter;
