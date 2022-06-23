import { keyframes } from "styled-components"

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const pureZoomIn = keyframes`
  0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0);
    }
  100% {
      transform: scale(1);
  }
`

const boxZoom = keyframes`
  50% {
        opacity: 0.8;
        transform: translateY(5px) scale(1.05);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
`

const animation = {
    fadeIn,
    pureZoomIn,
    boxZoom,
}

export default animation
