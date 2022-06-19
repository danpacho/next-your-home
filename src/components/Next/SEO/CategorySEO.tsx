import { NextSeo } from "next-seo"

import { CategoryInfoType } from "@typing/category/info"

import { config } from "blog.config"

function CategorySEO({
    category,
    categoryUrl,
    description,
    emoji,
}: Omit<CategoryInfoType, "color">) {
    const fullCategoryUrl = `${config.url}${categoryUrl}`

    return (
        <NextSeo
            title={`${config.siteName} ${category}${emoji}`}
            canonical={fullCategoryUrl}
            description={description}
            openGraph={{
                url: fullCategoryUrl,
                title: `${category}${emoji}`,
                description,
            }}
        />
    )
}

export { CategorySEO }
