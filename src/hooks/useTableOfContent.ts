import { useEffect, useState } from "react"

type HeaderType = "H1" | "H2"

interface HeaderInfo {
    title: string
    onClick: () => void
    type: HeaderType
}
interface H2Children extends Omit<HeaderInfo, "type"> {}

export interface TableOfContents extends Omit<HeaderInfo, "type"> {
    children: H2Children[]
}

interface DocumentRef<RefT extends HTMLElement> {
    documentRef: React.RefObject<RefT>
}
function getTableOfContents<RefT extends HTMLElement>({
    documentRef,
}: DocumentRef<RefT>): TableOfContents[] {
    const headerDOMArray = documentRef.current?.querySelectorAll("h1, h2")
    const headerInfoArray = headerDOMArray
        ? [...headerDOMArray].reduce<HeaderInfo[]>((acc, item) => {
              const title = item.textContent?.trim()
              if (title) {
                  const headerInfo: HeaderInfo = {
                      title,
                      type: item.nodeName as HeaderType,
                      onClick: () =>
                          item.scrollIntoView({
                              behavior: "auto",
                          }),
                  }
                  return [...acc, headerInfo]
              }
              return acc
          }, [])
        : []

    const H1IndexArray = headerInfoArray.reduce<number[]>(
        (acc, { type }, idx) => (type === "H1" ? [...acc, idx] : acc),
        []
    )

    const tableOfContentsArray = headerInfoArray.reduce<TableOfContents[]>(
        (acc, { onClick, title, type }, index) => {
            if (type === "H2") return acc

            const nextHeaderIndex = index + 1
            const nextH1Index = H1IndexArray[H1IndexArray.indexOf(index) + 1]

            const isChildrenNotExsist = nextHeaderIndex === nextH1Index

            const H1Children = isChildrenNotExsist
                ? []
                : headerInfoArray
                      .slice(nextHeaderIndex, nextH1Index)
                      .map<H2Children>(({ onClick, title }) => ({
                          onClick,
                          title,
                      }))

            return [
                ...acc,
                {
                    onClick,
                    title,
                    children: H1Children,
                },
            ]
        },
        []
    )

    return tableOfContentsArray
}

interface UseTableOfContentsProps<RefT extends HTMLElement>
    extends DocumentRef<RefT> {
    updateTrigger: any
}
function useTableOfContents<RefT extends HTMLElement>({
    documentRef,
    updateTrigger,
}: UseTableOfContentsProps<RefT>) {
    const [tableOfContents, setTableOfContents] = useState<TableOfContents[]>(
        []
    )
    useEffect(() => {
        setTableOfContents(getTableOfContents({ documentRef }))
    }, [documentRef, setTableOfContents, updateTrigger])

    return { tableOfContents }
}

export default useTableOfContents
