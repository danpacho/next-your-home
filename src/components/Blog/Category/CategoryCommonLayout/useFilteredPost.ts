import { PostMetaType } from "@typing/post/meta"
import { useEffect, useState } from "react"

interface UseFilteredPostProps {
    originalCategoryPostArray: PostMetaType[]
    filteredTagArray: string[]
}
function useFilteredPost({
    originalCategoryPostArray,
    filteredTagArray,
}: UseFilteredPostProps) {
    const [filteredCategoryPostArray, setFilteredCategoryPostArray] = useState<
        PostMetaType[]
    >([])

    useEffect(() => {
        const updatedFilteredCategoryPostArray =
            originalCategoryPostArray.filter(({ tags }) =>
                tags.map((tag) => filteredTagArray.includes(tag)).includes(true)
            )
        setFilteredCategoryPostArray(updatedFilteredCategoryPostArray)
    }, [filteredTagArray, originalCategoryPostArray])

    return filteredCategoryPostArray
}

export default useFilteredPost
