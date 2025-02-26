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

export default function ExpenseFormDialog({
	open, 
	handleClose, 
	createGroup, 
}: {open: boolean, handleClose: any, createGroup: any}) {
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
	  console.log(formJson);
          createGroup(formJson);
        },
      },
    }}>
    <DialogTitle>New Group</DialogTitle>
    <DialogContent style={{paddingTop: "5px"}}>
      <TextField
        required
        margin="dense"
        id="name"
        name="name"
        label="Name"
        type="text"
        fullWidth
        variant="outlined"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit">Create</Button>
    </DialogActions>
  </Dialog>;
}
