interface UseMouseInteractionProps {
    mouseStateSetter: (state: boolean) => void
    neverCloseOnTouchEnd?: boolean
}

function useMouseInteraction({
    mouseStateSetter,
    neverCloseOnTouchEnd: neverCloseOnTouch,
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
