import palleteOpacity from "./palleteOpacity"

const scrollBar = {
    basic: (color: string) => `
        ::-webkit-scrollbar {
            width: 0.1rem;
            padding: 0.25rem;
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${color};
            border-radius: 0.2rem;
        }

        ::-webkit-scrollbar-track {
            background: ${color}${palleteOpacity.opacity30};
            border-radius: 0.2rem;
        }
    `,
}

export { scrollBar }
