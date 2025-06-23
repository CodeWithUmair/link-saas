"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
    const params = useSearchParams();
    const preEmail = params.get("email") || "";
    const [name, setName] = useState("");
    const [email, setEmail] = useState(preEmail);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(() => { if (preEmail) setEmail(preEmail); }, [preEmail]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        console.log("🚀 ~ handleSubmit ~ data:", data);

        if (!res.ok) {
            setError(data.error);
            return;
        }

        const signInResponse = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (signInResponse?.ok && !signInResponse.error) {
            router.push("/"); // 👈 Redirect manually to home (or wherever)
        } else {
            setError("Something went wrong while signing in.");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <form onSubmit={handleSubmit} className="p-8 bg-white w-full max-w-md rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Get Started</h1>
                <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
                <Input type="email" value={email} disabled className="bg-gray-100" />
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}
