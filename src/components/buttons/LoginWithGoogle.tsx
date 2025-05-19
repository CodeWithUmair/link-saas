"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginWithGoogle() {
  return (
    <Button
      onClick={() => signIn("google")} // Correctly using the client-side signIn
    >
      <FcGoogle size={20} />
      <span>Sign In with Google</span>
    </Button>
  );
}
