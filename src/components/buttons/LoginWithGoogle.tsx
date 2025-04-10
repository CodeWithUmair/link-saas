"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function LoginWithGoogle() {
  return (
    <button
      onClick={() => signIn("google")} // Correctly using the client-side signIn
      className="bg-white shadow text-center w-full py-4 flex gap-3 items-center justify-center"
    >
      <FcGoogle size={20} />
      <span>Sign In with Google</span>
    </button>
  );
}
