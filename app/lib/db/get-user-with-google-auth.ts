import { prisma } from "prisma-backend/app/lib/prisma";

export async function getUserWithGoogleAuth(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            googleAccessToken: true,
            googleCustomerId: true,
        },
    });

    if (!user?.googleAccessToken || !user.googleCustomerId) {
        throw new Error("Usuário não conectado ao Google Ads.");
    }

    return {
        accessToken: user.googleAccessToken,
        customerId: user.googleCustomerId,
    };
}
