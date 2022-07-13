# Utils 🛠

1. **`blog-contents-loader`**

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
        1. File name and structure **must follow above**
        2. You can modify the **`blogContentsDirectoryName`** of the `blog.config.ts` file to set the name of the blog directory name
        3. `File name` is direct routed as follows
            - File tructure: `../{category}/posts/{post}.mdx`
            - Route result: **`https://DEPLOY_URL/{category}/{pagination}/{post}`**
    - `NextJs` calls these api functions from `getStaticProps` and `getStaticPaths` to build blog static data

---

2. **`blog-error-handler`**

    - The Class responsible for **error handling of functions** running on the `blog-contents-loader`
    - If an error occurs in the post that you produced, this class will give you detailed information such as why the error occurred and the location of the file etc

---

3. **etc ...**
