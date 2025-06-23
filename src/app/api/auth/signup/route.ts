// api/auth/signup/route.ts

import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongoClient";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const client = await clientPromise;
    const users = client.db().collection("users");
    if (await users.findOne({ email })) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashed = await hash(password, 10);
    await users.insertOne({
        name,
        email,
        password: hashed,
        provider: "credentials",
    });
    console.log("🚀 ~ POST ~ users:", users)
    return NextResponse.json({ ok: true });
}
