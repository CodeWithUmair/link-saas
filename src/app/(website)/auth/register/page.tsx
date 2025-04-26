// src/auth/register/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

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
            callbackUrl: "/dashboard", // or wherever you want after they confirm email
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Complete your signup</h1>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="bg-black text-white py-2 px-4 rounded">
                    Send Magic Link
                </button>
            </form>
        </div>
    );
}
