import { Expense } from "../../../Domain/Models/Expense.ts";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from '@mui/material';

export default function ExpenseCard({ expense }) {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
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
    </Card>
  );
};
