// app/routes/dashboard/route.tsx
import { Outlet } from "@remix-run/react";
import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import MainLayout from "@/layout/main";

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/login");
  }
  return null;
}

export default function DashboardLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
