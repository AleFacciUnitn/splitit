"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import GroupFormDialog from "@ui/Components/GroupFormDialog";

export default function Home(){
  const apiEndpoint: string = "/api/group";
  const [open, setOpen] = useState<boolean>(false);
  const [groups, setGroups] = useState();
  const {data: session, state} = useSession();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
 
  const fetchGroups = () => {
    const options = {
      method: "GET",
      headers: {
        "userId": session.user.id,
      },
      cache: "force-cache"
    };
    fetch(apiEndpoint,options)
    .then((response) => {
      if(!response.ok) throw response;
      return response.json()
    })
    .then((result) => {
	console.log(result);
        setGroups(result === null ? [] : result);
      })
    .catch((e) => console.error(e));
  }
  
  const createGroup = (formJson: Object) => {
    const name: string = formJson.name;
    const newGroup = JSON.stringify({
      id: "1",
      name,
      userId: session.user.id
    });
    console.log(newGroup);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newGroup,
    };
    fetch(apiEndpoint,options)
      .then((response) => {
        if (!response.ok) throw response;
        fetchGroups();
        handleClose();
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    if(!groups && session) fetchGroups();
  },[groups,session]);

  return (
    <Container>
      <Container className="flex grow justify-between my-4">
        <Typography variant="h3">Group</Typography>
	<IconButton onClick={handleOpen}><AddIcon color="primary"/></IconButton>
      </Container>
      <List>
        {groups?.map((group) => group.name)}
      </List>
      <GroupFormDialog open={open} handleClose={handleClose} createGroup={createGroup}/>
    </Container>
  );
}
