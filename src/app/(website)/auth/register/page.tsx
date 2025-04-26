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

        if (!name || !email) return;

        localStorage.setItem("tempName", name);

        const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.NEXTAUTH_URL;

        const callbackUrl = `${baseUrl}/dashboard/account?desiredUsername=${encodeURIComponent(name)}`;

        console.log("Callback URL:", callbackUrl); // ADD THIS LINE

        const res = await signIn("email", {
            email,
            callbackUrl,
            redirect: false,
        });
        console.log("🚀 ~ handleSubmit ~ res:", res)

        if (res?.ok) {
            setSubmitted(true);
        } else {
            alert("Failed to send magic link. Please try again.");
        }
    };


    useEffect(() => {
        const savedEmail = sessionStorage.getItem("tempEmail") || localStorage.getItem("tempEmail");
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 bg-background p-6 rounded-xl shadow-lg w-full max-w-md"
            >
                <h1 className="text-2xl font-bold text-center">Complete your signup</h1>

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
                    disabled
                    required
                    className="bg-gray-200 cursor-not-allowed"
                />

                {submitted ? (
                    <p className="text-green-600 text-sm text-center">
                        ✅ Magic link sent! Check your inbox.
                    </p>
                ) : (
                    <Button
                        type="submit"
                        className="bg-foreground text-background py-2 px-4 rounded"
                        disabled={!name || !email}
                    >
                        Send Magic Link
                    </Button>
                )}
            </form>
        </div>
    );
}
