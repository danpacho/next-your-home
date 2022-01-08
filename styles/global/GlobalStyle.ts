import { createGlobalStyle } from "styled-components"
import { reset } from "styled-reset"

//* 콤마 절대 사용 금지
export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
        //* set 1rem unit
        font-size: 14px;
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
  :focus, :active {
        outline: none;
        border: none;
  }
  ::-webkit-scrollbar {
        display: none;
  }
  /* ::placeholder {
        padding-left: 5px;
  } */
  /* ::selection {
        background-color: black;
        color: white;
  } */
`
