import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Copyleft } from "../Copyleft";
import {
  account,
  selectAccount,
  selectThemeMode,
  useAppDispatch,
} from "~/redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useSelector(selectAccount);
  const dispatch = useAppDispatch();
  const themeMode = useSelector(selectThemeMode);

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    if (email && password) {
      dispatch(account.loginWithEmail({ email, password }));
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, height: "100%", display: "flex", flexDirection: "column" }}
      >
        <GoogleButton
          type={themeMode}
          onClick={() => dispatch(account.loginWithGoogle())}
        />
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
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container spacing={4}>
          <Grid item xs>
            <Link href="#" variant="body2" fontStyle="strikethrough">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" fontStyle="strikethrough">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyleft />
      </Box>
    </Box>
  );
};
