import {
    useEffect
} from "react";
import { useThemeStore } from "@/stores/use-theme-store";

export function ThemeHydrate() {
    const setTheme = useThemeStore((s) => s.setTheme);


    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
    }, [setTheme]);

    return null;
}
