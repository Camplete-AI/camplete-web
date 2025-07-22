// app/routes/auth.google.disconnect.ts
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "prisma-backend/app/lib/prisma";

export async function action(args: ActionFunctionArgs) {
    const { userId } = await getAuth(args);
    if (!userId) throw redirect("/login");

    await prisma.user.update({
        where: { id: userId },
        data: {
            googleAccessToken: null,
            googleRefreshToken: null,
            googleCustomerId: null,
        },
    });

    return redirect("/dashboard");
}
