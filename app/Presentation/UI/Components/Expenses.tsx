"use client";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ExpenseCard from "../Components/ExpenseCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import dayjs, { Dayjs } from 'dayjs';
import ExpenseFormDialog from "../Components/ExpenseFormDialog";
import { Expense } from "../../../Domain/Models/Expense";

export default function Expenses() {
  const apiEndpoint: string = "/api/expense";
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const fetchExpenses = () => {
    setRefreshing(true);
    fetch(apiEndpoint)
    .then((response) => {
      if(!response.ok) throw response;
      return response.json()
    })
    .then((result) => {
        setExpenses(result);
        setRefreshing(false);
      })
    .catch((e) => console.error(e));
  }

  useEffect(() => {
    if (expenses === null) fetchExpenses();
  }, [expenses])

  if (expenses === null) {
    return <Container className="flex justify-center align-center">
      <CircularProgress/>
    </Container>;
  }
  
  const createExpense = (formJson: Object) => {
    const description: string = formJson.description;
    const category: string = formJson.category;
    const amount: number = parseFloat(formJson.amount);
    const newExpense: string = {
      id: "1",
      date: date.format("YYYY-MM-DD"),
      description: description,
      category: category,
      amount: amount
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    };
    fetch(apiEndpoint,options)
      .then((response) => {
        if (!response.ok) throw response;
        fetchExpenses();
        handleClose();
      })
      .catch((e) => console.error(e));
  }

  return (
    <Container className="relative flex flex-col">
      <Container className="sticky top-0 left-0">
        <IconButton color="primary" onClick={fetchExpenses} loading={refreshing}>
          <RefreshIcon/>
        </IconButton>
      </Container>
      <Container>
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
          />
      </Container>
      <Container className="flex sticky bottom-0 left-0 justify-end p-4">
        <Fab onClick={handleOpen}>
          <AddIcon/>
        </Fab>
      </Container>
    </Container>
  );
}
