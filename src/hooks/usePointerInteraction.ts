interface UsePointerInteractionProps {
    pointerStateSetter: (state: boolean) => void
    neverCloseOnTouchEnd?: boolean
}

function usePointerInteraction({
    pointerStateSetter,
    neverCloseOnTouchEnd,
}: UsePointerInteractionProps): React.HTMLAttributes<HTMLElement> {
    return {
        onPointerEnter: () => pointerStateSetter(true),
        onPointerLeave: ({ pointerType }) => {
            if (pointerType === "touch" && neverCloseOnTouchEnd) return
            pointerStateSetter(false)
        },
    }
}

export default usePointerInteraction
