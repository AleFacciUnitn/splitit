import Link from "next/link";
import { providerMap } from "@/auth.config";
import { signIn } from "@/auth";
import { AuthError } from 'next-auth';

export default async function SignInPage() {
  return (
    <div className="flex overflow-hidden relative w-full h-full select-none">
      <img
        src="/login_pattern.svg"
        alt="Pattern Background"
        className="object-cover fixed top-0 left-0 w-screen h-screen bg-white -z-10"
      />
      <div
        aria-label="Slate cover background"
        className="absolute left-0 top-0 z-10 flex h-[275%] w-[150%] translate-x-[-70%] translate-y-[-28%] rotate-[22deg] items-center bg-zinc-900 md:translate-y-[-15%] md:rotate-[11deg]"
      ></div>
      <div className="h-dvh z-20 flex w-full items-center justify-center md:ml-[15%] md:w-[22rem]">
        <div className="flex flex-col justify-center items-center w-80 text-xl">
          <h2 className="flex items-center mb-4 space-x-2 text-3xl font-light text-zinc-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="p-2 text-white rounded-full size-12 bg-zinc-800"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="text-4xl font-medium text-white">Pied Piper</span>
          </h2>
          <div className="flex flex-col gap-2 p-6 m-8 w-full bg-white rounded shadow-lg">
            {Object.values(providerMap).map((provider) => (
              <form
                className="[&>div]:last-of-type:hidden"
                key={provider.id}
                action={async (formData) => {
                  "use server";
		  try {
		    if (provider.id === "credentials") {
                      await signIn(provider.id, {
                        redirectTo: "/dashboard",
		        password: formData.get("password"),
		        email: formData.get("email")
                      });
		      window.location.reload();
                    } else {
                      await signIn(provider.id, { redirectTo: "/dashboard" });
                    }
		  } catch (error) {
                    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
                      throw error;
                    }
                    if (error instanceof AuthError) {
                      return {
                        error:
                          error.type === 'CredentialsSignin'
                          ? 'Invalid credentials.'
                          : 'An error with Auth.js occurred.',
                        type: error.type,
                      };
                    }
                    return {
                      error: 'Something went wrong.',
                      type: 'UnknownError',
                    };
                  }
                }}
              >
                {provider.id === "credentials" && (
                  <>
                    <label className="text-base font-light text-neutral-800">
                      Email
                      <input
                        className="block flex-1 p-3 w-full font-normal rounded-md border border-gray-200 transition sm:text-sm placeholder:font-light placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500"
                        required
                        data-1p-ignore
                        placeholder="email@example.com"
                        name="email"
                        type="email"
                      />
                    </label>
                    <label className="text-base font-light text-neutral-800">
                      Password
                      <input
                        className="block flex-1 p-3 w-full font-normal rounded-md border border-gray-200 transition sm:text-sm placeholder:font-light placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500"
                        required
                        data-1p-ignore
                        placeholder="password"
                        name="password"
                        type="password"
                      />
                    </label>
                  </>
                )}
                <button
                  type="submit"
                  className="flex justify-center items-center px-4 mt-2 space-x-2 w-full h-12 text-base font-light text-white rounded transition focus:ring-2 focus:ring-offset-2 focus:outline-none bg-zinc-800 hover:bg-zinc-900 focus:ring-zinc-800"
                >
                  <span>Sign in with {provider.name}</span>
                </button>
                <div className="flex gap-2 items-center my-4">
                  <div className="flex-1 bg-neutral-300 h-[1px]" />
                  <span className="text-xs leading-4 uppercase text-neutral-500">
                    or
                  </span>
                  <div className="flex-1 bg-neutral-300 h-[1px]" />
                </div>
              </form>
            ))}
	    <p className="text-sm text-black text-center">Don't have an account? <Link href="/signup" className="cursor-pointer font-bold">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
