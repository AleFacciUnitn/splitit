import { useState } from "react";
import { Expense } from "@domain/Models/Expense";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from '@mui/material';

export default function ExpenseCard({ expense }) {
  const [visibility, setVisibility] = useState<string>("hidden");
  const [mousePosition, setMousePosition] = useState([0,0]);
  const handleClick = (e) => {
    e.preventDefault();
    if(e.type === "contextmenu") rightClick(e);
    else setVisibility("hidden");
  }

  const rightClick = (e) => {
    setMousePosition([e.clientX, e.clientY]);
    setVisibility(visibility === "hidden" ? "visible" : "hidden");
  }

  return (
    <Card sx={{ m: 1 }} className="grow relative" onClick={handleClick} onContextMenu={handleClick}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ wordBreak: 'break-word', flex: 1 }}>
            {expense.description}
          </Typography>
          <Chip 
            label={expense.category}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography color="text.secondary">
            {new Date(expense.date).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" color="primary">
            ${expense.amount.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
      <span className="absolute top-0 right-1 hover:text-red-700">&times;</span>
      <Card className={`absolute ${visibility}`}
        style={{top: mousePosition[1]-50, left: mousePosition[0]-240}}>ciao</Card>
    </Card>
  );
};
