"use client";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Expenses from "../Components/Expenses";
import { useSession } from "next-auth/react";
import { logOut } from "../../../Services/LogIn";
import { signOut } from "../../../../auth.ts";

export default function HomePage() {
  const { data: session, status} = useSession();

  return (
    <Container className="flex flex-col">
      <Container className="flex w-full">
        <IconButton className="self-end" color="primary" onClick={async () => {
	  await logOut();
        }}><LogoutIcon/></IconButton>
      </Container>
      <Expenses/>
    </Container>
  );
}
