import { ReactNode, useEffect } from "react";
import { useUser, UserButton } from "@clerk/remix";
import { Button } from "@/components/ui/button";

interface BaseLayoutProps {
  readonly children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors">
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-border">
        <div className="flex items-center gap-3">
          {isSignedIn && user && (
            <>
              <UserButton />
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  Hi, {user.fullName ?? user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </>
          )}
        </div>

        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </header>

      <main className="flex-1 bg-muted/30">{children}</main>

      <footer className="w-full px-6 py-4 border-t border-border text-sm text-muted-foreground text-center">
        Made with ❤️ by Camplete AI ·{" "}
      </footer>
    </div>
  );
}
