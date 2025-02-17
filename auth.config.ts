import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { UserRepositoryNextAuthImpl } from "./app/Data/Repositories/UserRepositoryNextAuthImpl";
import { CreateUserUseCase, CreateUserParams } from "./app/Domain/UseCases/CreateUserUseCase";
import { User } from "./app/Domain/Models/User";

const repository = UserRepositoryNextAuthImpl.getInstance();

const providers: Provider[] = [
  CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email"},
        password: { label: "Password", type: "password"}
      },
      async authorize(credentials) {
	const repository = UserRepositoryNextAuthImpl.getInstance();
	const useCase = new CreateUserUseCase(repository);
	const { email, password } = credentials;
	const user: User = await useCase.execute(new CreateUserParams(new User("",email,password)));
	console.log("=========================AUTHORIZE LOG===========================\n\n");
	console.log(`email: ${email}`);
	console.log(`password: ${password}`);
	console.log(`user: ${user}`);
	console.log("\n\n=================================================================");
	return user;
      }
    })
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export default {
  providers,
  secret: "SECRET_KEY",
  callbacks: {
    async redirect({ url, baseUrl }){
      return baseUrl;
    },
    async session({ session, token, user }) {
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (!user) return token;
      token.user = user;
      return token;
    },
    async authorized({ auth, request: { nextUrl }}) {
      console.log("=========================AUTHORIZED LOG==========================\n\n");
      console.log(`auth:\t${auth}`);
      console.log(`user:\t${auth?.user}`);
      console.log(`request:\t${nextUrl}`);
      console.log("\n\n=================================================================");
      const isLoggedIn = !!auth?.user;

      const isOnProtected = !(nextUrl.pathname.startsWith("/login"));

      if (isOnProtected) return isLoggedIn;
      if (isLoggedIn) return Response.redirect(new URL("/",nextUrl));
      return true;
    }
  }
} satisfies NextAuthConfig;
