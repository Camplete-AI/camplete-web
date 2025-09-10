import {
    useLayoutEffect
} from "react";
import { useThemeStore } from "@/stores/use-theme-store";

export function ThemeHydrate() {
    const setTheme = useThemeStore((s) => s.setTheme);


    useLayoutEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
    }, [setTheme]);

    return null;
}
