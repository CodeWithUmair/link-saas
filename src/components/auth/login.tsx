"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
// import { BsApple } from "react-icons/bs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const providers = [
  { name: "Google", icon: <FcGoogle size={20} />, provider: "google" },
  // { name: "Apple", icon: <BsApple size={20} />, provider: "apple" },
];

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("🚀 ~ handleLogin ~ res:", res);

      if (res?.error === "EMAIL_NOT_FOUND") {
        sessionStorage.setItem("psw", password);
        window.location.href = `/auth/register?email=${encodeURIComponent(email)}`;
      } else if (res?.error === "PROVIDER_MISMATCH") {
        setError("This email is registered with a different login method. Please use Google Sign-In.");
      } else if (res?.error) {
        setError("Invalid credentials");
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "OAuthAccountNotLinked") {
      setError(
        "This email is already registered using a different sign-in method. Please use Email & Password to log in."
      );
    }
  }, [searchParams]);

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button
            type="button"
            variant='ghost'
            size='icon'
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full" loading={formLoading} >Log In</Button>
        <hr className="my-4" />
        <div className="space-y-2">
          {providers.map(({ name, icon, provider }) => (
            <Button
              key={provider}
              onClick={() => signIn(provider)}
              className="w-full flex items-center justify-center"
              disabled={formLoading}
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
