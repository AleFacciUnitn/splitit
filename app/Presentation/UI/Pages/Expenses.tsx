"use client";
import { useEffect, useState } from "react";
import ExpenseCard from "../Components/ExpenseCard.tsx";
import { MdRefresh } from "react-icons/md";

export default function Expenses() {
  const [expenses, setExpenses] = useState(null);

  const fetchExpenses = () => fetch("/api/expense")
    .then((response) => {
      if(!response.ok) throw response;
      return response.json()
    })
    .then((result) => setExpenses(result))
    .catch((e) => console.error(e));

  useEffect(() => {
    if (expenses === null) fetchExpenses();
  }, [expenses])
  

  return (
    <div>
      <MdRefresh onClick={fetchExpenses}/>
      <ul>
        {expenses?.map((expense, index) => <ExpenseCard key={index} expense={expense} />)}
      </ul>
    </div>
  );
}
