import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface ExpenseFormProps {
  open: boolean;
  handleClose: any;
  date: Dayjs;
  setDate: any;
  createExpense: any;
  groups: any;
  groupId?: string | null;
  setGroupId: any;
}

export default function ExpenseFormDialog(props: ExpenseFormProps) {
  return <Dialog
    open={props.open} 
    onClose={props.handleClose}
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
    <DialogContent style={{paddingTop: "5px"}}>
      {groups.length !== 0 &&
      <FormControl fullWidth>
        <InputLabel id="group-label">Group</InputLabel>
        <Select
          labelId="group-label"
          label="Group"
          value={props.groupId}
	  onChange={props.setGroupId}
        >
          {props.groups?.map((group) => <MenuItem value={group.id}>{group.name}</MenuItem>)}
        </Select>
      </FormControl>}
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
          value={props.date} 
          onChange={props.setDate} 
          className="w-full"/>
      </LocalizationProvider>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose}>Cancel</Button>
      <Button type="submit">Create</Button>
    </DialogActions>
  </Dialog>;
}
