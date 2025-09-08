import { SignIn } from "@clerk/remix";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);
  if (userId) {
    return redirect("/dashboard");
  }
  return null;
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
        <div className="max-w-md w-full space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome to Camplete AI
            </h1>
            <p className="text-muted-foreground">
              Launch stunning ad campaigns in seconds. No setup, no experience —
              just results.
            </p>
          </div>

          <SignIn
            path="/login"
            routing="path"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/dashboard"
          />

          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <a href="/sign-up" className="text-primary underline">
              Create an account
            </a>
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="/marketing-automation.png"
          alt="AI marketing automation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-8">
          <h2 className="text-white text-3xl font-semibold text-center leading-tight">
            Automate your marketing. <br />
            Focus on growth. Let AI handle the ads.
          </h2>
        </div>
      </div>
    </div>
  );
}
