<br />

![next your home banner](/public/banner.png)

<br />

1. [이건 무엇인가요?](#이건-무엇인가요)
    - [🏠 블로그](#-블로그)
    - [🛠 무엇으로 만들어졌나요?](#-무엇으로-만들어졌나요)
2. [왜 이걸 사용해야하나요?](#왜-이걸-사용해야하죠)

    - [😀 손쉬운 시작](#-손쉬운-시작)
    - [🔥 성능](#-성능)
    - [😲 직관적인 글 조직](#-직관적인-글-조직)
    - [📔 사용자 중심의 읽기 경험 제공](#-사용자-중심의-읽기-경험-제공)
    - [🎨 색과 함께 나만의 감성 뽐내기](#-색과-함께-나만의-감성-뽐내기)
    - [🍻 풍부한 기능](#-풍부한-기능)

3. [어떻게 시작하나요?](#어떻게-시작하나요)
4. [커스터마이즈 하고 싶어요!](#커스터마이즈-하고-싶어요)
5. [지금쯤 떠오를 질문](#지금쯤-떠오를-질문)
6. [저작권](#저작권)

<br />

# 이건 무엇인가요?

## 🏠 블로그

1.  **콘텐츠에**
2.  **UI/UX에**
3.  **성능에**
4.  **직관적인 레이아웃에**
5.  **유지보수성에**
6.  **커스텀에**

    **집중한 `블로그 템플릿` 입니다**

> 위 템플릿으로 제작된 [Next Your Home Guide](https://next-your-home-guide.vercel.app)에 방문해보세요

## 🛠 무엇으로 만들어졌나요?

1.  **언어** 📜
    -   `typescript`
2.  **프레임워크** ⚙️
    -   `NextJs`
3.  **스타일** 💅
    -   `styled-components`
4.  **마크업** 📝
    -   `mdx`
        -   📌 `markdown` 이상의 풍부한 기능 제공합니다
        -   📌 `JSX`와 `javascript expressions`을 사용해보세요
        -   🔎 [공식 MDX 사이트](https://mdxjs.com/table-of-components/)에서 더 많은 기능을 볼 수 있습니다
    -   `mdx-bundler`
        -   📦 순수 `react component`를 `.mdx` 포스팅 파일에서 불러올 수 있습니다
        -   🔎 설정 옵션을 [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)에서 알아보세요

<br />

# 왜 이걸 사용해야하나요?

## 😀 손쉬운 시작

-   📌 `React`입니다
-   📌 환경 설정, 필요 없습니다
-   📌 `vercel`과 함께라면 배포는 일도 아니죠[(vercel + NextJs의 강력함 알아보기 🔎)](https://vercel.com/solutions/nextjs)
-   📦 [CLI 포스트 생성기](https://github.com/danpa725/blog-post-generator)로 터미널에서 쉽게 글을 만들수 있습니다

## 🔥 성능

-   📌 Light house, `100`점
-   📌 `next-seo`와 함께 SEO도 완벽합니다 [(next-seo 알아보기 🔎)](https://github.com/garmeeh/next-seo)
-   📌 `bundle size`, 더욱 작게
    -   빌드 시 `Preact`로 `React`를 대체합니다 (`3kb`) [(Preact가 무엇인가요? 🔎)](https://preactjs.com)
-   등등...

## 😲 직관적인 글 조직

-   📌 카테고리로 글의 큰 뿌리를 나눕니다
    -   더불어 각 카테고리에 대한 설명을 적을 수 있습니다
-   📌 카테고리 페이지는 pagination 됩니다
    -   태그로 페이지에 있는 글을 빠르게 탐색할 수 있습니다
    -   또한 `blog.config.ts`로 보여질 글의 갯수를 조정할 수 있습니다
-   📌 공통된 흐름을 가진 글은 시리즈로 묶을 수 있습니다

## 📔 사용자 중심의 읽기 경험 제공

-   📌 UI는 읽기에 직관적이죠
-   📌 `post controller`로 쉽게 글을 탐색할 수 있습니다
-   📌 더욱 적은 수직 스크롤로 글을 찾는 수고를 덜 수 있습니다
-   📌 창 크기에따라 자동으로 말줄임표가 적용되는 매직

## 🎨 색과 함께 나만의 감성 뽐내기

-   📌 각 카테고리와 글은 색을 정할 수 있습니다
-   📌 `personal color`로 블로그를 멋지게 꾸며봅시다
-   📌 페이지마다 색다르지만, 일관된 `UI`를 선사합니다

## 🍻 풍부한 기능

-   📌 `Light`/`Dark`모드, 이제는 필수죠
-   📌 `mdx`의 강력한 기능은 덤입니다
-   📌 글의 목차는 `desktop`/`mobile` 독자에게 큰 도움이 됩니다! (`mobile` 선택)
-   📌 `next/image`와 함께 이미지는 자동으로 최적화 됩니다[(next/image 톱아보기 🔎)](https://nextjs.org/docs/api-reference/next/image)
-   📌 또한 `static`/`external` 이미지는 별 설정 없이 사이즈가 조절됩니다
-   📌 pagination, 기본이죠
-   📌 이전 글로 되돌아가면 스크롤 위치는 그대로!
-   📌 `google analytics`로 방문자 기록을 살펴봅시다! `partytown🎉` 스레드에서 실행하면서 성능도 잡았죠 [(partytown 알아보기 🔎)](https://partytown.builder.io)
-   📌 `sitemap`과 `rss`는 빌드시 생성됩니다
-   📌 `katex`와 함께 화끈한 수식도 보여줍시다 (선택)
-   📌 `dev` 모드에서 글을 수정하면 자동으로 새로고침합니다
-   📌 `error`는 최대한 상세하게! 무엇이 잘못되었는지 쉽게 알 수 있습니다
-   📌 코드 복사기능을 곁들인 예쁜 `code` 블럭은 개발자의 낭만아니였나요
-   등등...

<br />

# 어떻게 시작하나요?

1.  `Use this template` 버튼을 **클릭**하여 **`1commit`** 으로 자신만의 블로그 `repo`를 만듭니다
    -   블로그 `repo` 를 나의 컴퓨터로 가져옵시다
2.  **패키지 설치**

    ```bash
    pnpm i
    ```

    -   이 블로그는 `pnpm`을 패키지 매니저로 사용합니다
    -   만약 `pnpm`이 설치되지 않았다면, [pnpm 설치 가이드](https://pnpm.io/installation)를 보세요

        ```bash
        npm install -g pnpm
        ```

3.  **📜 `blog.config.ts`, 📜 `public/robots.txt`** 를 업데이트 해봅시다

    1.  `blog.config.ts`:
        -   `authorInfo`
            -   name
            -   currentState
            -   currentGoal
            -   contacts
        -   `blogInfo`
            -   url: deploy url
            -   siteName
            -   subtitle
            -   language
    2.  `public/robots.txt`:
        -   `Sitemap`을 배포 url로 바꿔주세요

4.  **개발 테스트**
    ```bash
    pnpm dev
    ```
    포트 `3000`이 기본으로 사용됩니다
5.  **첫 글 작성해보기!**
    ```bash
    pnpm post
    ```
6.  **빌드 테스트**
    ```bash
    pnpm build
    ```
    빌드 결과물은 `.next`에 저장됩니다
7.  **`vercel`** 과 함께 세상으로 **배포**

    1.  [계정만들기](https://vercel.com/login)
    2.  블로그 `repo`를 선택합니다
    3.  `vercel`배포 과정을 따라가거나, `deploy` 버튼을 통해 쉽게 시작할 수 있습니다

        [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/danpa725/next-your-home)

<br />

# 커스터마이즈 하고 싶어요!

-   `blog.config.ts`에 있는 다양한 설정을 확인해보세요!
-   커스터마이즈는 쉽습니다
    1. 🙌 `react`, 알고있죠?
    2. 🙌 `styled-components`, 알고있죠?
    3. 🙌 더욱 멋진 디자인으로 수정할 수 있습니다
-   프로젝트 폴더는 **구조 설명**에 관한 `README.md`를 포함하고 있습니다. 마음껏 바꿔봅시다!

<br />

# 지금쯤 떠오를 질문

<details>
  <summary>
    <strong>
      🤔 왜 <code>gatsby</code>를 사용하지 않죠?
    </strong>
  </summary>

1.  <code>NextJs</code>보다 제한적입니다
2.  글을 불러오는데 <code>graphql</code>을 사용해야합니다

    -   <code>typescript</code>만 사용합시다
    -   <code>graphql</code>몰라도 쉽게! (_~~제가 모르는건 비🤫~~_)

3.  몇몇 기능을 도입하기 위해 <code>gatsby</code> 커뮤니티에 의존해야 하기도 합니다
<br />
</details>

<details>
  <summary>
    <strong>
     🤔 얼마나 빠르다는 거죠?
    </strong>
  </summary>

1.  [pagespeed test](https://pagespeed.web.dev)

    -   `desktop` result: `100` / `100` / `100` / `100`
    -   `mobile` result: `100` / `97` / `100` / `100`

2.  [Webpage Test](https://www.webpagetest.org/): **좋은 평가를 받았어요**

3.  빌드 `bundle size`를 확인 해봅시다
    ```bash
    Page                                         Size     First Load JS
    ┌ ● /                                        1.46 kB        91.1 kB
    ├   /_app                                    0 B            70.3 kB
    ├ ● /[category]                              748 B          90.4 kB
    ├ ● /[category]/[pageNumber]                 832 B          90.5 kB
    ├ ● /[category]/[pageNumber]/[postTitle]     1.64 kB        96.8 kB
    ├ ○ /404                                     269 B          70.6 kB
    ├ ○ /500                                     269 B          70.6 kB
    ├ ● /category                                3.21 kB        78.1 kB
    └ ● /profile                                 2.68  kB       89   kB
    + First Load JS shared by all                70.3 kB
    ├ chunks/main-be00b42900d433cc.js            36.8 kB
    ├ chunks/pages/_app-764e610a6d9ea0f7.js      32.7 kB
    ├ chunks/webpack-3373b0f21806983f.js         827 B
    └ css/a36597fbcc4c45ff.css                   813 B
    ```

</details>

<br />

# 저작권

```ts
const LICENSE = "MIT 🎉"
const KOR = "감사합니다 😎"
const ENG = "Thanks 😎"
```

<div align="center">

<img src="/public/favicon.png" width="75" height="75">

[MIT](https://github.com/danpa725/next-your-home/blob/main/LICENSE)

</div>
