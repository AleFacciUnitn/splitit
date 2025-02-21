"use client";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Expenses from "@ui/Components/Expenses";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { logOut } from "@services/LogIn";
import { signOut } from "@/auth.ts";

export default function HomePage() {
  const { data: session, status} = useSession({ required: true });
  const [groups, setGroups] = useState();

  const fetchGroups = () => {
    const options = {
      method: "GET",
      headers: {
        "userId": session.user.id,
      },
    };
    fetch("/api/group",options)
    .then((response) => {
      if(!response.ok) throw response;
      return response.json()
    })
    .then((result) => {
        setGroups(result === null ? [] : result);
      })
    .catch((e) => console.error(e));
  }

  useEffect(() => {
    if(!groups && session) fetchGroups();
    console.log(groups);
  }, [groups, session]);

  return (
    <Container className="flex flex-col h-screen overflow-hidden">
      <Container className="flex w-full flex-none">
        <IconButton className="self-end" color="primary" onClick={async () => {
	  await logOut();
        }}><LogoutIcon/></IconButton>
      </Container>
      <Expenses groups={groups}/>
    </Container>
  );
}
