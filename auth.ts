import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createHash, timingSafeEqual } from "node:crypto";

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD?.trim();
const adminPasswordHash =
  process.env.ADMIN_PASSWORD_SHA256?.trim().toLowerCase();

function hashPassword(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function matchesAdminPassword(password: string) {
  // if (adminPasswordHash) {
  //   const computed = hashPassword(password);
  //   const left = Buffer.from(computed, "hex");
  //   const right = Buffer.from(adminPasswordHash, "hex");
  //   return left.length === right.length && timingSafeEqual(left, right);
  // }

  return Boolean(adminPassword && password === adminPassword);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password || "");

        if (!email || !password || !adminEmail) return null;
        if (email !== adminEmail || !matchesAdminPassword(password))
          return null;

        return {
          id: "admin",
          name: process.env.ADMIN_NAME?.trim() || "Admin",
          email: adminEmail,
          role: "admin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
        token.email = user.email;
        token.name = user.name;
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role =
          (token.role as "admin" | "guest" | undefined) ?? "guest";
        session.user.id = token.sub ?? session.user.id;
        session.user.email = token.email ?? session.user.email;
        session.user.name = token.name ?? session.user.name;
      }

      return session;
    },
  },
});
