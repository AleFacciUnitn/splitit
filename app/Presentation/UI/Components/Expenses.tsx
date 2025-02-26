"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularLoading from "./CircularLoading";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ExpenseCard from "@ui/Components/ExpenseCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import dayjs, { Dayjs } from 'dayjs';
import ExpenseFormDialog from "@ui/Components/ExpenseFormDialog";
import { Expense } from "@domain/Models/Expense";

export default function Expenses({groups}) {
  const apiEndpoint: string = "/api/expense";
  const { data: session, state } = useSession();
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [groupId, setGroupId] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const fetchExpenses = () => {
    setRefreshing(true);
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
        setRefreshing(false);
      })
    .catch((e) => console.error(e));
  }
  
  const createExpense = (formJson: Object) => {
    const description: string = formJson.description;
    const category: string = formJson.category;
    const amount: number = parseFloat(formJson.amount);
    const newExpense = JSON.stringify({
      id: "1",
      userId: session.user.id,
      date: date.format(),
      description,
      category,
      amount,
      groupId
    });
    console.log(newExpense);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newExpense,
    };
    fetch(apiEndpoint,options)
      .then((response) => {
        if (!response.ok) throw response;
        fetchExpenses();
        handleClose();
      })
      .catch((e) => console.error(e));
  }

    console.log("ciao")
  useEffect(() => {
    if (expenses === null && session !== null && session) fetchExpenses();
    if (session === null) window.location.reload()
  }, [expenses, session])

  if (expenses === null) return <CircularLoading />;

  return (
    <Container className="relative self-center grow lg:h-full flex flex-col" sx={{marginBottom: "2rem", marginTop: "2rem"}}>
      <Container className="relative top-0 left-0">
        <IconButton color="primary" onClick={fetchExpenses} loading={refreshing}>
          <RefreshIcon/>
        </IconButton>
      </Container>
      <Container className="max-h-full grow overflow-y-auto">
        <List>
          {expenses?.map((expense, index) => <ListItem key={index}>
            <ExpenseCard expense={expense} />
          </ListItem>)}
        </List>
        <ExpenseFormDialog 
          open={open} 
          handleClose={handleClose}
          date={date}
          setDate={setDate}
          createExpense={createExpense}
	  groups={groups}
	  groupId={groupId}
	  setGroupId={setGroupId}
          />
      </Container>
      <Container className="flex absolute bottom-0 left-0 justify-end p-4">
        <Fab onClick={handleOpen}>
          <AddIcon/>
        </Fab>
      </Container>
    </Container>
  );
}
