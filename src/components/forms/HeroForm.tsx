"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
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
      className="inline-flex items-center shadow-lg bg-background shadow-gray-500/20"
    >
      <span className="bg-background py-4 pl-4 whitespace-nowrap">um-saas.to/</span>
      <input
        type="text"
        className="focus-visible:border-0 focus:border-0"
        style={{ backgroundColor: "white", marginBottom: 0, paddingLeft: 0 }}
        placeholder="username"
      />
      <button
        type="submit"
        className="bg-primary text-background py-4 px-6 whitespace-nowrap"
      >
        Join for Free
      </button>
    </form>
  );
}

export default HeroForm;