import { config } from "blog.config"
import { writeFile } from "fs/promises"
import { TempMetaType } from "./utils"

const email = config.author.contacts.email.replace("mailto:", "")

const generateRSSItem = ({
    postUrl,
    title,
    author,
    update,
    tags,
    preview,
}: TempMetaType) => `<item>
      <guid>${config.url}${postUrl}</guid>
      <title>${title}</title>
      <link>${config.url}${postUrl}</link>
      <description>${preview}</description>
      <pubDate>${new Date(update).toUTCString()}</pubDate>
      <author>${email} (${author})</author>
      ${tags.map((tag) => `<category>${tag.trim()}</category>`).join("")}
    </item>
    `

async function generateRSS(posts: TempMetaType[], rssFileName = "rss.xml") {
    const rss = `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.siteName}</title>
    <link>${config.url}</link>
    <description>${config.subtitle}</description>
    <language>${config.language}</language>
    <lastBuildDate>${new Date(posts[0].update).toUTCString()}</lastBuildDate>
    <webMaster>${email} (${config.author.name})</webMaster>
    <managingEditor>${email} (${config.author.name})</managingEditor>
    <atom:link href="${
        config.url
    }/${rssFileName}" rel="self" type="application/rss+xml"/>

    ${posts.map(generateRSSItem).join("")}
  </channel>
</rss>
`

    await writeFile("public/rss.xml", rss, {
        encoding: "utf-8",
    })
}
export { generateRSS }
