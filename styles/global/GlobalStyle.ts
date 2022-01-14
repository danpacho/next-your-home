import { createGlobalStyle } from "styled-components"
import { reset } from "styled-reset"

export const GlobalStyle = createGlobalStyle`
      ${reset}
      html {
            //* set 1rem unit
            font-size: 16px;
            font-display: fallback;
            font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
            Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
            'Noto Sans KR', 'Malgun Gothic', sans-serif;
            -webkit-text-size-adjust: none;

            scrollbar-width: none;
      }
      input, button {
            background: none;
            border: none;
            outline: none;
            /* &:focus {
                  outline: none;
                  border: none;
            }
            &:active {
                  outline: none;
                  border: none;
            } */
      }
      button {
            cursor: pointer;
            user-select: none;
      }

      ::-webkit-scrollbar {
            display: none;
      }
    
      ::selection {
            background-color: #1E1E1E;
            color: #F3F4F6;
      }

      -webkit-font-smoothing: antialiased;

        /* ::placeholder {
            padding-left: 5px;
      } */

`
