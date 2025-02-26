"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import GroupFormDialog from "@ui/Components/GroupFormDialog";

export default function Home(){
  const apiEndpoint: string = "/api/group";
  const [open, setOpen] = useState<boolean>(false);
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
    };
    fetch(apiEndpoint,options)
    .then((response) => {
      if(!response.ok) throw response;
      return response.json()
    })
    .then((result) => {
        setExpenses(result === null ? [] : result);
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

  return (
    <Container>
      <Container className="flex grow justify-between my-4">
        <Typography variant="h3">Group</Typography>
	<IconButton onClick={handleOpen}><AddIcon color="primary"/></IconButton>
      </Container>
      <GroupFormDialog open={open} handleClose={handleClose} createGroup={createGroup}/>
    </Container>
  );
}
