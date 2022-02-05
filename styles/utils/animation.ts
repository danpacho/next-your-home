import { keyframes } from "styled-components"
import pallete from "./pallete"

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const popInFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }
  75% {
    opacity: 1;
    transform: translateY(-16px) scale(1.0);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }`

const popOutToBottom = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px) scale(1.0);
  }
  100% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }`

const popIn = keyframes`
  0% {
    opacity: 0.7;
    transform: scale3d(0.8, 0.8, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  };
`

const slideDown = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  };
`

const scaleRotation = keyframes`
  0% {
    transform: scale(.65) rotate(-60deg)
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`

const appearMotion = keyframes`

  25% {
    opacity: .7;
    filter: drop-shadow(0px 0px .7px ${pallete.gray6});
    transform: scale(0.925) translate(.25rem ,.05rem)  skew(1.5deg, .5deg);
  }
  
  100% {
   opacity: 1;
   transform: scale(1) translate(0,0) skew(0deg, 0deg);
   filter: none;
  }
`

const lineRender = keyframes`
  0% {
    opacity: 0;
    stroke-width: 3.5px;
    stroke: ${pallete.teal10};
  }
  100% {
    opacity: 1;
  }
`

const zoomIn = keyframes`
  0% {
        transform: scale(0);
        opacity: 0;
    }
  100% {
      transform: scale(1);
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
    fadeOut,
    popInFromBottom,
    popOutToBottom,
    popIn,
    slideUp,
    slideDown,
    scaleRotation,
    appearMotion,
    lineRender,
    zoomIn,
    pureZoomIn,
    boxZoom,
}

export default animation
