// pages/api/auth/[...nextauth].ts

import clientPromise from "@/libs/mongoClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";
import NextAuth from "next-auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        try {
          await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: identifier,
            subject: "Your Magic Sign-in Link",
            html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
          });
        } catch (error) {
          console.error("Error sending magic link:", error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const db = (await clientPromise).db();
      const existingUser = await db
        .collection("users")
        .findOne({ email: user.email });

      if (!existingUser) {
        return "/auth/register"; // new user
      }

      if (!existingUser.username) {
        return "/auth/register"; // user exists but hasn't completed setup
      }

      return true; // allow sign-in
    },
  },
};

export default NextAuth(authOptions);
