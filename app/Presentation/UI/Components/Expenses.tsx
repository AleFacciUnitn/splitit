"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { VariableSizeList } from "react-window";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularLoading from "./CircularLoading";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ExpenseCard from "@ui/Components/ExpenseCard";
import ListItem from "@mui/material/ListItem";
import dayjs, { Dayjs } from 'dayjs';
import ExpenseFormDialog from "@ui/Components/ExpenseFormDialog";
import List from "@ui/Components/List";
import { Expense } from "@domain/Models/Expense";

export const revalidate = 60;

export default function Expenses({groups}) {
  const apiEndpoint: string = "/api/expense";
  const { data: session, state } = useSession();
  const [expenses, setExpenses] = useState<Expense[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [groupId, setGroupId] = useState<string>("");
  const [divHeight, setDivHeight] = useState(0);
  const rootRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const fetchExpenses = () => {
    setRefreshing(true);
    console.log(session);
    const options = {
      method: "GET",
      headers: {
        "userId": session.user.id,
      },
      cache: "force-cache",
    };
    fetch(apiEndpoint,options)
    .then((response) => {
      if(!response.ok) throw response;
      return response.json();
    })
    .then((result) => {
        setExpenses(result === null ? [] : result);
        setRefreshing(false);
      })
    .catch((e) => console.error(e));
  }

  useEffect(() => {
    if(rootRef.current) setDivHeight(rootRef.current.clientHeight);
    if (!expenses && session) fetchExpenses();
  }, [expenses, session])

  if (refreshing) return <CircularLoading />;

  const Row = ({index, style}) => {
    console.log(index);
    return <ExpenseCard expense={expenses[index]}/>
  }

  return (
    <Container className="relative self-center grow lg:h-full flex flex-col" sx={{marginBottom: "2rem", marginTop: "2rem"}}>
      <Container className="relative top-0 left-0">
        <IconButton color="primary" onClick={fetchExpenses} loading={refreshing}>
          <RefreshIcon/>
        </IconButton>
      </Container>
      <Container ref={rootRef} className="max-h-full grow overflow-y-auto">
        <List
	  height={divHeight}
	  items={expenses}
	  Row={Row}/>
        <ExpenseFormDialog 
          open={open} 
          handleClose={handleClose}
          date={date}
          setDate={setDate}
	  groups={groups}
	  groupId={groupId}
	  setGroupId={setGroupId}
	  session={session}
	  apiEndpoint={apiEndpoint}
	  refresh={fetchExpenses}
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
