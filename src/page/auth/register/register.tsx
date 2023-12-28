import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { navigation } from "../../../utils/Navigation";
import AuthService from "../../../service/auth.service";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#4d4d4d",
    },
    secondary: {
      main: "#808080",
    },
  },
});

export default function Register() {
  const authService = new AuthService();
  const [error, setError] = useState<any>({});
  // ====================handled submit =================
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser = {
      user_name: data.get("user_name"),
      email: data.get("email"),
      password: data.get("password"),
      reapeatPassword: data.get("reapeatPassword"),
      address: data.get("address"),
      phone: data.get("phone"),
    };
    const error = authService.checkErrorRegister(newUser);
    if (error.isError) {
      setError(error);
      return;
    }
    setError({});
    try {
      const response = await authService.register(newUser);
     
      
      if (response.status === true) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigation("/auth/login");
        }, 3000);
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error("Đăng ký thất bại!!!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "1px 2px 3px 4px rgba(0, 0, 0, 0.2)",
              padding: 5,
              borderRadius: 1,
              width: 500,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Đăng ký thành viên
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                style={{ width: "400px" }}
                id="user_name"
                label="userName"
                name="user_name"
                autoComplete="userName"
                autoFocus
              />
              <Typography style={{ color: "red" }}>{error.msgName}</Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Typography style={{ color: "red" }}>{error.msgEmail}</Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Number Phone"
                name="phone"
                autoComplete="phone"
                autoFocus
              />
              <Typography style={{ color: "red" }}>{error.msgPhone}</Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Địa chỉ"
                name="address"
                autoComplete="address"
                autoFocus
              />
              <Typography style={{ color: "red" }}>
                {error.msgAddress}
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography style={{ color: "red" }}>
                {error.msgPassword}
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                name="reapeatPassword"
                label="reapeatPassword"
                type="password"
                id="reapeatPassword"
                autoComplete="reapeatPassword"
              />
              <Typography style={{ color: "red" }}>
                {error.msgRepeatPassword}
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
