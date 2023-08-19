import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { varifyPassword, getByEmail } from "../../../services/users";
export const authOptions = {
  // Configure one or more authentication providers
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize({ email, password }, req) {
        const user = getByEmail(email);
        if (!user) {
          throw new Error("the user not found");
        }
        const varify = await varifyPassword(user.password, password);
        if (!varify) {
          throw new Error("incorrect password");
        }
        return { email };
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
