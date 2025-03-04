"use client";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Expenses from "@ui/Components/Expenses";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const revalidate = 60;

export default function HomePage() {
  const { data: session, status} = useSession();
  const [groups, setGroups] = useState();

  const fetchGroups = () => {
    const options = {
      method: "GET",
      headers: {
        "userId": session.user.id,
      },
      cache: "force-cache",
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

  if (!groups) return "Loading...";

  return (
    <Container className="flex flex-col lg:flex-row h-full overflow-hidden">
      <Expenses groups={groups}/>
    </Container>
  );
}
