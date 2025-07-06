"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function RegisterPageInner() {
    const params = useSearchParams();
    const preEmail = params.get("email") || "";

    const [form, setForm] = useState({
        name: "",
        email: preEmail,
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            email: preEmail,
            password: sessionStorage.getItem("psw") || "",
        }));
        sessionStorage.removeItem("psw");
    }, [preEmail]);

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            setFormLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Sign up failed.");
                return;
            }

            const signInResponse = await signIn("credentials", {
                redirect: false,
                email: form.email,
                password: form.password,
            });

            if (signInResponse?.ok && !signInResponse.error) {
                router.push("/");
            } else {
                setError("Something went wrong while signing in.");
            }
        } catch (err) {
            console.error("Sign up failed:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <form
                onSubmit={handleSubmit}
                className="p-8 bg-white w-full max-w-md rounded shadow-md space-y-4"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Get Started</h1>

                <Input
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Name"
                    required
                />
                <Input
                    type="email"
                    value={form.email}
                    disabled
                    className="bg-gray-100"
                    required
                />

                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange("password")}
                        placeholder="Password"
                        required
                    />
                    <Button
                        type="button"
                        variant='ghost'
                        size='icon'
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                </div>

                <div className="relative">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        placeholder="Confirm Password"
                        required
                    />
                    <Button
                        type="button"
                        variant='ghost'
                        size='icon'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-3 flex items-center"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <Button
                    type="submit"
                    className="w-full"
                    loading={formLoading}
                >
                    {formLoading ? "Signing Up..." : "Sign Up"}
                </Button>
            </form>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <RegisterPageInner />
        </Suspense>
    );
}
