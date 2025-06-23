"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, FormEvent } from "react";

const providers = [
  { name: "Google", icon: <FcGoogle size={20} />, provider: "google" },
  { name: "Apple", icon: <BsApple size={20} />, provider: "apple" },
];

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const isValidEmail = (e: string) =>
  //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("🚀 ~ handleLogin ~ res:", res)
    if (res?.error === "EMAIL_NOT_FOUND") {
      window.location.href = `/auth/register?email=${encodeURIComponent(email)}`;
    } else if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Log In</Button>
        <hr className="my-4" />
        <div className="space-y-2">
          {providers.map(({ name, icon, provider }) => (
            <Button
              key={provider}
              onClick={() => signIn(provider)}
              className="w-full flex items-center justify-center"
            >
              {icon}
              <span className="ml-2">Continue with {name}</span>
            </Button>
          ))}
        </div>
      </form>
    </>
  );
}
