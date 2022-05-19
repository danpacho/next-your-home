interface UseScrollToElementProps extends ScrollIntoViewOptions {
    scrollRef: React.RefObject<HTMLElement>
}
function useScrollToElement({
    scrollRef,
    behavior,
    block,
    inline,
}: UseScrollToElementProps) {
    const scrollToElement = () =>
        scrollRef.current?.scrollIntoView({
            behavior: behavior ?? "smooth",
            block: block ?? "start",
            inline: inline ?? "center",
        })
    return { scrollToElement }
}

export default useScrollToElement
