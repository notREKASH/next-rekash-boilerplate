import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@lib/prisma";
import { resendSendRequest } from "@lib/resend";

// This resend config is for testing purposes only
// You need to use your own resend account to send emails
// And add your domain to the allowed domains in your resend account
// https://authjs.dev/getting-started/authentication/email

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Resend({
      server: process.env.AUTH_RESEND_SERVER!,
      apiKey: process.env.AUTH_RESEND_KEY!,
      from: process.env.FROM_EMAIL!,
      sendVerificationRequest: async ({
      identifier: email,
      url,
      provider: { from },
      }) => {
        await resendSendRequest({
          apiKey: process.env.AUTH_RESEND_KEY as string,
          from: from as string,
          to: email,
          url,
      });
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in/error",
    verifyRequest: "/sign-in/verify-request",
    signOut: "/",
  },
});
