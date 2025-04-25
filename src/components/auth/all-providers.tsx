"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
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
    // Add more here if needed
];

export default function LoginProviders() {
    const [email, setEmail] = useState("");

    return (
        <>
            <input
                type="email"
                placeholder="Email or username"
                className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="w-full py-3 bg-black text-white rounded-md font-semibold mb-4"
                onClick={() => signIn("email", { email })}
            >
                Continue
            </button>

            <div className="flex items-center mb-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {providers.map(({ name, icon, provider }) => (
                <button
                    key={provider}
                    onClick={() => signIn(provider)}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition mb-3"
                >
                    {icon}
                    <span className="text-sm font-medium">Continue with {name}</span>
                </button>
            ))}
        </>
    );
}
