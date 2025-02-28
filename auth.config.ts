import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { UserRepositoryNextAuthImpl } from "@data/Repositories/UserRepositoryNextAuthImpl";
import { LogInUseCaseNextAuth, LogInParams } from "@domain/UseCases/LoginUseCase";
import { User } from "@domain/Models/User";

const repository = UserRepositoryNextAuthImpl.getInstance();

const providers: Provider[] = [
  CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email"},
        password: { label: "password", type: "password"}
      },
      async authorize(credentials) {
	const useCase = new LogInUseCaseNextAuth(repository);
	console.log(credentials);
	const { email, password } = credentials;
	const user: User = await useCase.execute(new LogInParams(email,password));
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
      return url;
    },
    async session({ session, token }) {
      session.user = token.user as any;
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

      const isOnProtected = (nextUrl.pathname.startsWith("/dashboard"));

      if (isOnProtected) return isLoggedIn;
      if (isLoggedIn) return Response.redirect(new URL("/dashboard",nextUrl));
      return true;
    }
  }
} satisfies NextAuthConfig;
