"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

const providers = [
    {
        name: "Google",
        icon: <FcGoogle size={20} />,
        provider: "google",
    },
    {
        name: "Apple",
        icon: <BsApple size={20} />,
        provider: "apple",
    },
];

export default function LoginProviders() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        sessionStorage.setItem("tempEmail", email);
        await signIn("email", { email });
    };

    return (
        <>
            <Input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <Button
                className="w-full py-3 bg-foreground text-background rounded-md font-semibold mb-4"
                onClick={handleLogin}
            >
                Continue
            </Button>

            <div className="flex items-center mb-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="space-y-2">

                {providers.map(({ name, icon, provider }) => (
                    <Button
                        key={provider}
                        onClick={() => signIn(provider)}
                        className="w-full"
                    >
                        {icon}
                        <span className="text-sm font-medium">Continue with {name}</span>
                    </Button>
                ))}
            </div>
        </>
    );
}
