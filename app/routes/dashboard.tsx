// app/routes/dashboard/route.tsx
import { Outlet } from "@remix-run/react";
import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "prisma-backend/app/lib/prisma";
import { clerkClient } from "@/services/clerk";
import MainLayout from "@/layout/main";

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) throw redirect("/login");

  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (!existing) {
    const user = await clerkClient.users.getUser(userId);
    await prisma.user.create({
      data: {
        id: userId,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      },
    });
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
