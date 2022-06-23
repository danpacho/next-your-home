export type PalleteType = keyof Pallete

export type Pallete = typeof pallete

import { config } from "blog.config"

const pallete = {
    white: "#FFFFFF",

    backgroundDark: "#25242B",

    dark: "#3A3A3A",
    middleDark: "#2A2A2A",
    deepDark: "#212121",
    trueDeepDark: "#1E1E1E",

    gray1: "#F9FAFB",
    gray2: "#F3F4F6",
    gray3: "#E5E7EB",
    gray4: "#D1D5DB",
    gray5: "#9CA3AF",
    gray6: "#6B7280",
    gray7: "#4B5563",
    gray8: "#374151",
    gray9: "#1F2937",
    gray10: "#111827",

    red1: "#FEE2E2",
    red2: "#FEE2E2",
    red3: "#FCA5A5",
    red4: "#F87171",
    red5: "#EF4444",
    red6: "#DC2626",

    blue1: "#EFF6FF",
    blue2: "#DBEAFE",
    blue3: "#BFDBFE",
    blue4: "#93C5FD",
    blue5: "#60A5FA",
    blue6: "#3B82F6",
    blue7: "#2563EB",
    blue8: "#1D4ED8",
    blue9: "#1E40AF",
    blue10: "#1E3A8A",

    teal1: "#CCFBF1",
    teal2: "#C3FAE8",
    teal3: "#96F2D7",
    teal4: "#63E6BE",
    teal5: "#38D9A9",
    teal6: "#20C997",
    teal7: "#12B886",
    teal8: "#0CA678",
    teal9: "#099268",
    teal10: "#087F5B",

    yellow1: "#FFFDD0",
    yellow2: "#FCF4A3",
    yellow3: "#F8E473",
    yellow4: "#FADA5E",
    yellow5: "#FEDC56",
    yellow6: "#FFD300",
    yellow7: "#FFC30B",
    yellow8: "#F9A602",

    purple1: "#f5f3ff",
    purple2: "#ede9fe",
    purple3: "#ddd6fe",
    purple4: "#c4b5fd",
    purple5: "#a78bfa",
    purple6: "#8b5cf6",
    purple7: "#7c3aed",
    purple8: "#6d28d9",
    purple9: "#5b21b6",
    purple10: "#4c1d95",

    ...config.userPallete,
}

export default pallete
