import { createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

// color design tokens export
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#ffffff",
                200: "#ffffff",
                300: "#ffffff",
                400: "#000000",
                500: "#000000",
                600: "#ffffff",
                700: "#ffffff",
                800: "#ffffff",
                900: "#ffffff"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#242424", //other sections
                500: "#242424", //right section background and update/close labels
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#000000",
            },
            greenAccent: {
                100: "#fef2cc",
                200: "#fce59a",
                300: "#fbd967",
                400: "#f9cc35",
                500: "#f8bf02",
                600: "#c69902",
                700: "#957301",
                800: "#634c01",
                900: "#322600"
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
            },
            blueAccent: {
                100: "#fef2cc",
                200: "#fce59a",
                300: "#fbd967",
                400: "#f9cc35",
                500: "#f8bf02",
                600: "#c69902",
                700: "#c69902",
                800: "#f8bf02",
                900: "#f8bf02"
            },
        }
        : {
            grey: {
                // 100: "#141414",
                // 200: "#292929",
                // 300: "#3d3d3d",
                // 400: "#525252",
                // 500: "#666666",
                // 600: "#858585",
                // 700: "#a3a3a3",
                // 800: "#c2c2c2",
                // 900: "#e0e0e0",

                100: "#000000",
                200: "#000000",
                300: "#000000",
                400: "#ffffff",
                500: "#ffffff",
                600: "#000000",
                700: "#000000",
                800: "#000000",
                900: "#000000"
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0", // manually changed
                500: "#141b2d",
                600: "#1F2A40",
                700: "#727681",
                800: "#a1a4ab",
                900: "#f2f0f0",
            },
            greenAccent: {
                100: "#f9cc35",
                200: "#f9cc35",
                300: "#957301",
                400: "#f8bf02",
                500: "#f8bf02",
                600: "#f8bf02",
                700: "#f8bf02",
                800: "#f8bf02",
                900: "#f8bf02"  // admin color
            },
            redAccent: {
                100: "#fdf9ef",
                200: "#faf3df",
                300: "#f8eecf",
                400: "#f5e8bf",
                500: "#f3e2af",
                600: "#c2b58c",
                700: "#928869",
                800: "#615a46",
                900: "#312d23"
            },
            blueAccent: {
                100: "#fef2cc",
                200: "#fce59a",
                300: "#fbd967",
                400: "#fef2cc",
                500: "#f8bf02",
                600: "#fef2cc",
                700: "#fbd967",
                800: "#fef2cc",
                900: "#fef2cc"
            },
        }),
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.primary[500],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};