"use server";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function authenticate(prevState: string | undefined, formData: FormData) {
  console.log("=====================AUTHENTICATE LOG=======================\n\n");
  console.log(formData);
  await signIn("credentials", formData);
  console.log("\n\n============================================================");
}

export async function logOut() {
  await signOut();
}
