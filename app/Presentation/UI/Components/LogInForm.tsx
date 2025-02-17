"use client";
import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import authenticate from "../../../Services/LogIn";

export default function LogInForm() {
  const router = useRouter();
  const [errorMsg, dispatch] = useActionState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(false);
  const [password, setPassword] = useState<string>(false);
  const apiEndpoint: string = "/api/auth";
  const action: string = "login";

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return <form action={dispatch} className="flex justify-center flex-col bg-white h-1/2 w-1/2 px-10 gap-6">
    <TextField
      onChange={(e) => setEmail(e.target.value)}
      required
      id="email"
      name="email"
      label="Email"
      type="email"
    />
    <FormControl required variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
	onChange={(e) => setPassword(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? 'hide the password' : 'display the password'
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
          </InputAdornment>
        }
        label="Password"/>
    </FormControl>
    <p>{errorMsg}</p>
    <Button className="w-max self-center px-4" type="submit">LogIn</Button>
  </form>;
}
