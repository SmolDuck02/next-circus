import { SVGProps } from "react";

export default function Heart(props: SVGProps<SVGSVGElement>) {
  return (
    <>
      <svg
        {...props}
        width="81"
        height="91"
        viewBox="0 0 81 91"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_201_70)">
          <path
            d="M40.0474 79.0859C39.6082 79.0887 39.1727 78.9946 38.7661 78.809C38.3594 78.6234 37.9896 78.3499 37.6777 78.0042L11.7442 48.9857C8.49119 45.3125 6.6665 40.3532 6.6665 35.1852C6.6665 30.0172 8.49119 25.0579 11.7442 21.3846C15.0226 17.7313 19.4636 15.6797 24.0935 15.6797C28.7234 15.6797 33.1643 17.7313 36.4428 21.3846L40.0474 25.4129L43.6521 21.3846C46.9305 17.7313 51.3715 15.6797 56.0014 15.6797C60.6313 15.6797 65.0722 17.7313 68.3507 21.3846C71.6037 25.0579 73.4284 30.0172 73.4284 35.1852C73.4284 40.3532 71.6037 45.3125 68.3507 48.9857L42.4172 78.0042C42.1053 78.3499 41.7354 78.6234 41.3288 78.809C40.9221 78.9946 40.4867 79.0887 40.0474 79.0859Z"
            fill="#E21B1B"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_201_70"
            x="2.6665"
            y="15.6797"
            width="74.7617"
            height="71.4062"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_201_70" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_201_70"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
