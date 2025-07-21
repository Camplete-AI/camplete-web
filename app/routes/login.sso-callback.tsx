import { AuthenticateWithRedirectCallback } from "@clerk/remix";

export default function SSOCallbackRoute() {
  return (
    <AuthenticateWithRedirectCallback signInFallbackRedirectUrl="/dashboard" />
  );
}
