# Pages 📄

1.  `_document.tsx`

    **SSR** setting for using `styled-components` in nextJs, and common **SEO**

2.  `_app.tsx`

    Configure the default common **layout** of the page and set the `jotai` global status provider

3.  `index.tsx`

    Main page

    > **https://DEPLOY_URL**

4.  `category.tsx`

    All category page

    > **https://DEPLOY_URL/category**

5.  `profile.tsx`

    Writer profile page

    > **https://DEPLOY_URL/profile**

6.  `[category]/index.tsx`

    Specific category main page

    > **https://DEPLOY_URL/{category}**

7.  `[category]/[pageNumber]/index.tsx`

    Specific category pagination page

    > **https://DEPLOY_URL/{category}/{page-number}**

8.  `[category]/[pageNumber]/[postTitle].tsx`

    Specific category post page

    > **https://DEPLOY_URL/{category}/{page-number}/{post-title}**

9.  `404.tsx, 505.tsx`

    404, 505 error page
