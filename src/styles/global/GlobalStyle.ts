import { createGlobalStyle } from "styled-components"
import { reset } from "styled-reset"

export const GlobalStyle = createGlobalStyle`
      ${reset}
      *, *::before, *::after {
            box-sizing: border-box;
      }   
      html {
            //* set 1rem unit
            font-size: 16px;
            font-display: fallback;
            font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
            Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
            'Noto Sans KR', 'Malgun Gothic', sans-serif;
            
            scrollbar-width: none;
      }
      input, button {
            background: none;
            border: none;
            outline: none;
      }
      button {
            cursor: pointer;
            user-select: none;
      }

      ::-webkit-scrollbar {
            width: 0;
            height: 0.35rem;      
      }

      ::-webkit-scrollbar-track {
            background: transparent;        
      }

      ::-webkit-scrollbar-thumb {
            background-color:#6B7280;    
            border-radius: .1rem;
      }

      ::selection {
            background-color: #4c4c4c;
            color: #F3F4F6;
      }

      text-rendering: optimizeLegibility;
      text-size-adjust: none;
      -webkit-text-size-adjust: none;
   
      details {
            width: 100%;
            max-width: 100%;

            summary {
                  display: block;

                  padding-left: 0.25rem;
                  border-left: 0.1rem solid gray;
                  
                  cursor: pointer;
            }     
            summary::-webkit-details-marker {
                  display: none;
            }           
      }
    

      //* disable Katex math slection
      .math {
            user-select: none;
            pointer-events: none;
      }

`
