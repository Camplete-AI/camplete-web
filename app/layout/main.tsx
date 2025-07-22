import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import BaseLayout from "./base";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <BaseLayout>
            <div className="p-4">
              <SidebarTrigger />
              <div className="flex-1 p-4">{children}</div>
            </div>
          </BaseLayout>
        </div>
      </div>
    </SidebarProvider>
  );
}
