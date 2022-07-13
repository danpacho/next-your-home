interface UseMouseInteractionProps {
    mouseStateSetter: (state: boolean) => void
    neverCloseOnTouch?: boolean
}

function useMouseInteraction({
    mouseStateSetter,
    neverCloseOnTouch,
}: UseMouseInteractionProps): React.HTMLAttributes<HTMLElement> {
    return {
        onPointerEnter: () => mouseStateSetter(true),
        onPointerLeave: ({ pointerType }) => {
            if (pointerType === "touch" && neverCloseOnTouch) return
            mouseStateSetter(false)
        },
    }
}

export default useMouseInteraction
