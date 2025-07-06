"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface HeroFormProps {
  user: Session | null;
}

const HeroForm: React.FC<HeroFormProps> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/dashboard/account?desiredUsername=" + username);
    }
  }, []);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const form = ev.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement;
    const username = input.value;

    if (username.length > 0) {
      if (user) {
        router.push(`/dashboard/account?desiredUsername=${username}`);
      } else {
        window.localStorage.setItem('desiredUsername', username);
        await signIn('google');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center border rounded-xl px-3 bg-background shadow shadow-gray-500/20 py-2"
    >
      <span className="bg-background whitespace-nowrap">um-saas.to/</span>
      <Input
        type="text"
        style={{ backgroundColor: "white", marginBottom: 0, paddingLeft: 10 }}
        placeholder="username"
      />
      <Button
        type="submit"
        className="ml-2"
      >
        Join for Free
      </Button>
    </form>
  );
}

export default HeroForm;