// src/auth/register/page.tsx
"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        localStorage.setItem("tempName", name);

        await signIn("email", {
            email,
            callbackUrl: `/dashboard/account?desiredUsername=${encodeURIComponent(name)}`,
            redirect: false, // Prevent redirect so we can show a message
        });

        setSubmitted(true);
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
                {submitted ? (
                    <p className="text-green-600">Magic link sent! Please check your email.</p>
                ) : (
                    <Button type="submit" className="bg-foreground text-background py-2 px-4 rounded">
                        Send Magic Link
                    </Button>
                )}
            </form>
        </div>
    );
}
