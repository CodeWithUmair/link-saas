// pages/api/auth/[...nextauth]/authoptions.js

import clientPromise from "@/libs/mongoClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const user = await client
          .db()
          .collection("users")
          .findOne({ email: credentials!.email });
        if (!user) throw new Error("EMAIL_NOT_FOUND");
        const pwMatch = await compare(credentials!.password, user.password);
        if (!pwMatch) throw new Error("INVALID_PASSWORD");
        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  pages: { signIn: "/auth/login", error: "/auth/login" },
};

export default NextAuth(authOptions);
