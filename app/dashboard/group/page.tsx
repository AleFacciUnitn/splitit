"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import GroupFormDialog from "@ui/Components/GroupFormDialog";
import { Group } from "@domain/Models/Group";
import List from "@ui/Components/List";

export default function Home(){
  const apiEndpoint: string = "/api/group";
  const rootRef = useRef();
  const [open, setOpen] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group>();
  const [divHeight, setDivHeight] = useState<number>(0);
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
    if(rootRef.current) setDivHeight(rootRef.current.clientHeight);
    if(!groups && session) fetchGroups();
  },[groups,session]);

  const Row = ({index, style}) => {
    return <Card className="my-4 w-full">{groups[index].name}</Card>
  }

  return (
    <Container className="flex flex-col">
      <Container className="flex flex-none justify-between my-4">
        <Typography variant="h3">Group</Typography>
	<IconButton onClick={handleOpen}><AddIcon color="primary"/></IconButton>
      </Container>
      <Container className="w-full grow" ref={rootRef}>
        <List
	  height={divHeight}
	  items={groups}
	  Row={Row}/>
        <GroupFormDialog open={open} handleClose={handleClose} createGroup={createGroup}/>
      </Container>
    </Container>
  );
}
