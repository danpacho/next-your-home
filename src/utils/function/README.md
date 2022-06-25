# Blog Util functions 🛠

1. `blog-contents-loader`

    - A set of functions that extract categories and posts from a `blog file structure` and return the processed data
    - **blog file structure**
    - ```bash
        🏠 ${config.blogContentsDirectoryName}
        ┣ 📦 content
        ┃ ┣ 🗂 [catgory-name]
        ┃ ┃ ┣ 🗂 posts
        ┃ ┃ ┃ ┣ 📔 [post-name].mdx
        ┃ ┃ ┃ ┗...
        ┃ ┃ ┃
        ┃ ┃ ┗ 📔 description.json
        ┃ ┃
        ┣ ┗ 🗂 [catgory-name2]...
        ┃
        ┗ 📦 profile
          ┗ 📔 description.mdx
      ```
        1. File names **must follow the structure above**
        2. You can modify the **`blogContentsDirectoryName`** of the `blog.config.ts` file to set the name of the blog directory name
        3. File names is direct routed
            - Folder structure: ../**`my-category`**/posts/**`first-post`**.mdx
            - Route result: **`https://YOUR_DEPLOY_URL/my-category/{pagination-number}/first-post`**
    - `NextJs` calls these api functions from `getStaticProps` and `getStaticPaths` to build blog static data

2. `blog-error-handler`

    - The Class responsible for **error handling of functions** running on the `blog-contents-loader`
    - If an error occurs in the post that you produced, this class will give you detailed information such as why the error occurred and the location of the file etc

3. ...etc utility functions
