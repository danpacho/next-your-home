import { RefObject, useCallback, useEffect, useState } from "react"

interface ObserveOptions {
    root: IntersectionObserverInit["root"]
    threshold: IntersectionObserverInit["threshold"]
    rootMarginTop: string
    rootMarginBottom: string
    rootMarginLeft: string
    rootMarginRight: string
}

interface useElementObserverProps<ElementType extends HTMLElement> {
    options: ObserveOptions
    ref: RefObject<ElementType>
    customeCallback?: IntersectionObserverCallback
}

function useElementObserver<ElementType extends HTMLElement>({
    ref,
    options: {
        root = null,
        rootMarginBottom,
        rootMarginTop,
        rootMarginLeft,
        rootMarginRight,
        threshold,
    },
    customeCallback,
}: useElementObserverProps<ElementType>): {
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
} {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const rootMargin = `${rootMarginTop} ${rootMarginRight} ${rootMarginBottom} ${rootMarginLeft}`

    const intersectionCallback: IntersectionObserverCallback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach(({ isIntersecting }) => {
                if (isIntersecting) setIsVisible(true)
                if (!isIntersecting) setIsVisible(false)
            })
        },
        []
    )

    useEffect(() => {
        let observeRef: ElementType | null = null
        let observer: IntersectionObserver | null = null
        if (!ref.current) return

        if (ref.current) {
            observeRef = ref.current
            observer = new IntersectionObserver(
                customeCallback ?? intersectionCallback,
                {
                    root,
                    rootMargin,
                    threshold,
                }
            )
            observer.observe(ref.current)
        }

        return () => {
            if (observer && observeRef) observer.unobserve(observeRef)
        }
    }, [
        ref,
        root,
        rootMargin,
        threshold,
        customeCallback,
        intersectionCallback,
    ])

    return {
        isVisible,
        setIsVisible,
    }
}
export default useElementObserver
