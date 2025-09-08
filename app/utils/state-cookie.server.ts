// utils/state-cookie.server.ts
import { createCookie } from "@remix-run/node";

export const stateCookie = createCookie("oauth_state", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutos de validade
});
