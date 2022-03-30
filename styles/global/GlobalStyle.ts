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
            background-color:#4B5563;    
            border-radius: .1rem;
      }

      ::selection {
            background-color: #1E1E1E;
            color: #F3F4F6;
      }

      -webkit-font-smoothing: antialiased;

`
