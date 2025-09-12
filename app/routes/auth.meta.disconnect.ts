import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "prisma-backend/app/lib/prisma";

export async function action(args: ActionFunctionArgs) {
    const { userId } = await getAuth(args);
    if (!userId) return redirect("/sign-in");

    await prisma.user.update({
        where: { id: userId },
        data: {
            metaAccessToken: null,
            metaRefreshToken: null,
            metaAdAccountId: null,
            metaBusinessId: null,
            metaPageId: null,
        },
    });

    return redirect("/dashboard?meta=disconnected");
}
