import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { checkLogin, checkLoginGoogle } from "@/lib/firebase/service";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials) return null;
        const { email, password } = credentials as any;
        const user = await checkLogin({ email, password });
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && account.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      } else if (account && account.provider === "google") {
        const data = {
          name: user.name,
          email: user.email,
          type: "google",
        };
        const result = await checkLoginGoogle(data);
        if (result.status) {
          token.email = result.data.email;
          token.name = result.data.name;
          token.role = result.data.role;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token.email) session.email = token.email;
      if (token.name) session.name = token.name;
      if (token.role) session.role = token.role;
      return session;
    },
  },
};
