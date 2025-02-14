import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ExpenseFormDialog({open, handleClose, date, setDate, createExpense}: {open: boolean, handleClose: any, date: Dayjs, setDate: any, createExpense: any}) {

  return <Dialog
    open={open} 
    onClose={handleClose}
    slotProps={{
      paper: {
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          createExpense(formJson);
        },
      },
    }}>
    <DialogTitle>New Expense</DialogTitle>
    <DialogContent>
      <TextField
        required
        margin="dense"
        id="description"
        name="description"
        label="Description"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        required
        margin="dense"
        id="category"
        name="category"
        label="Category"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        required
        margin="dense"
        id="amount"
        name="amount"
        label="Amount"
        type="number"
        inputProps={{ step: '0.000001' }}
        fullWidth
        variant="outlined"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          maxDate={dayjs()}
          value={date} 
          onChange={setDate} 
          className="w-full"/>
      </LocalizationProvider>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit">Create</Button>
    </DialogActions>
  </Dialog>;
}
