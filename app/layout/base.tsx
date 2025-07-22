import { ReactNode, useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/remix";
import { Button } from "@/components/ui/button";

interface BaseLayoutProps {
  readonly children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
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
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Button>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="w-full px-6 py-4 border-t border-border text-sm text-muted-foreground text-center">
        Made with ❤️ by OneClickAds ·{" "}
      </footer>
    </div>
  );
}
