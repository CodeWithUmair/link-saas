// app/login/page.tsx
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import LoginComponent from "@/components/auth/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Log in to your account
        </p>

        {/* client-side auth buttons */}
        <LoginComponent />
      </div>
    </div>
  );
}
