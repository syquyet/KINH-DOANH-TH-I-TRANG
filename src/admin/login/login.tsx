import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { navigation } from "../until/navigation";
import AuthService from "../../service/auth.service";
import { useEffect, useState } from "react";
import ProductService from "../../service/product.service";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

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

export default function Login() {
  const authService = new AuthService();
  const [error, setError] = useState<any>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const datLogin = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const error = authService.checkErrorLogin(datLogin);
    if (error.isError) {
      setError(error);
      return;
    }
    setError({});
    try {
      const response = await authService.login(datLogin);
      if (response?.status === true) {
        // alert(response.message);
        // navigation("/");
        toast.success(response.message, {
          position: "top-right",
          autoClose: 2000, // Đóng sau 2 giây
        });

        setTimeout(() => {
          navigation("/");
        }, 3000);
      } else {
        // alert(response?.message);
        toast.error(response?.message, {
          position: "top-right",
          autoClose: 2000, // Đóng sau 2 giây
        });
      }
    } catch (err) {
      // alert("Đăng nhập thất bại");
      toast.error("Email hoặc mật khẩu sai!!!", {
        position: "top-right",
        autoClose: 2000, // Đóng sau 2 giây
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />

      <Grid
        container
        component="main"
        sx={{
          height: 500,
          width: 900,
          boxShadow: "1px 2px 3px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: 2,
          marginInline: 30,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?messi)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                // margin="nomal"
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
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography style={{ color: "red" }}>
                {error.msgPassword}
              </Typography>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Nhớ mật khẩu"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid>

                <Grid item>
                  <Link href="#" variant="body2">
                    {"Bạn chưa có tài khoản? Đăng kí"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
