// src/auth/register/page.tsx
"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Save name & email somewhere temporarily if needed
        localStorage.setItem("tempName", name);

        // Trigger magic link sign-in
        await signIn("email", {
            email,
            callbackUrl: `/dashboard/account?desiredUsername=${encodeURIComponent(name)}`,
        });
    };

    useEffect(() => {
        const savedEmail = sessionStorage.getItem("tempEmail");
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);


    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Complete your signup</h1>
                <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    required
                    disabled
                    className="bg-gray-200 cursor-not-allowed"
                />
                <Button type="submit" className="bg-black text-white py-2 px-4 rounded">
                    Send Magic Link
                </Button>
            </form>
        </div>
    );
}
