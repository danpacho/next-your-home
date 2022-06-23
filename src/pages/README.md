# Blog pages 📄

1. `_document.tsx`
    - ssr setting for using `styled-components` in nextJs, and **common SEO**
2. `_app.tsx`
    - Configure the default common **layout** of the page and set the `jotai` global status provider
3. `index.tsx`: **https://your-deploy-url**
    - Main page
4. `category.tsx`: **https://your-deploy-url/category**
    - All category page
5. `profile.tsx`: **https://your-deploy-url/profile**
    - Writer profile page
6. `[category]/index.tsx`: **https://your-deploy-url/{category}**
    - Specific category main page
7. `[category]/[pageNumber]/index.tsx`: **https://your-deploy-url/{category}/{page-number}**
    - Specific category pagination page
8. `[category]/[pageNumber]/[postTitle].tsx`: **https://your-deploy-url/{category}/{page-number}/{post-title}**
    - Specific category post page
9. `404.tsx, 505.tsx`
    - 404, 505 error page
