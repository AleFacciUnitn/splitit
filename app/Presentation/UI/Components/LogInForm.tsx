"use client";
import { useState } from "react";
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

export default function LogInForm() {
  const router = useRouter();
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

  const logIn = () => {
    const rawBody: string = JSON.stringify({email: email,password: password,action: action});
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: rawBody,
    };
    fetch(apiEndpoint,options)
      .then((response) => {
        if (!response.ok) throw response;
	router.push("/");
      })
      .catch((e) => console.error(e));
  }

  return <div className="flex justify-center flex-col bg-white h-1/2 w-1/2 px-10 gap-6">
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
    <Button className="w-max self-center px-4" onClick={logIn}>LogIn</Button>
  </div>;
}
