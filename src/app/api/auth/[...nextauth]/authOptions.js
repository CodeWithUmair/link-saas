// pages/api/auth/[...nextauth].ts

import clientPromise from "@/libs/mongoClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
// import { Resend } from "resend";
import NextAuth from "next-auth";

// const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions = {
  debug: true,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // EmailProvider({
    //   async sendVerificationRequest({ identifier, url }) {
    //     try {
    //       await resend.emails.send({
    //         from: process.env.EMAIL_FROM,
    //         to: identifier,
    //         subject: "Your Magic Sign-in Link",
    //         html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
    //       });
    //     } catch (error) {
    //       console.error("Error sending magic link:", error);
    //     }
    //   },
    // }),
  ],
  // callbacks: {
  //   async signIn({ user }) {
  //     try {
  //       // 1. Explicit database connection check
  //       const client = await clientPromise;
  //       if (!client) throw new Error("Database connection failed");

  //       const db = client.db();

  //       // 2. Add debug logging
  //       console.log("[NextAuth] Checking user:", user.email);

  //       // 3. Case-insensitive email search
  //       const existingUser = await db.collection("users").findOne({
  //         email: { $regex: new RegExp(`^${user.email}$`, "i") },
  //       });

  //       if (!existingUser) {
  //         console.log("[NextAuth] New user detected, redirecting to register");
  //         return "/auth/register"; // Keep relative URL - NextAuth handles base URL
  //       }

  //       if (!existingUser.username) {
  //         console.log("[NextAuth] User exists but missing username");
  //         return "/auth/register";
  //       }

  //       return true;
  //     } catch (error) {
  //       console.error("[NextAuth] signIn callback error:", error);
  //       // Fail closed - don't allow sign-in if we can't verify
  //       return false;
  //     }
  //   },
  // },
};

export default NextAuth(authOptions);
