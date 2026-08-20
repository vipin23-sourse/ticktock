import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "name@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // --- DUMMY AUTHENTICATION LOGIC ---
        // We are hardcoding the success condition based on your guidelines
        if (
          credentials?.email === "john@example.com" &&
          credentials?.password === "password123"
        ) {
          // Returning this object creates a secure session token automatically
          return { 
            id: "1", 
            name: "John Doe", 
            email: "john@example.com" 
          };
        }
        
        // Returning null tells NextAuth to throw an error (triggering your UI error state)
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login", // Tells NextAuth to use your custom UI, not their default page
  },
  session: {
    strategy: "jwt", // Stores the token securely via encrypted cookies
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
});

export { handler as GET, handler as POST };