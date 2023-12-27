import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthContext from "../contexts/AuthContext";
import toast from "react-hot-toast";

const dark = {
  palette: {
    mode: "dark",
  },
};
export default function SignUp() {
  const [password, setPassword] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const first_name = e.target.firstName.value;
    const last_name = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const myPromise = new Promise((resolve, reject) => {
      registerUser(first_name, last_name, email, password)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    toast.promise(myPromise, {
      loading: "Creating your account...",
    });
  };

  const handleConfirmPassword = () => {
    let confPassEle = document.getElementById("password_again");
    let confPassWarningEle = document.getElementById("compare-password-warn");
    if (confPassEle.value != "") {
      if (password == confPassEle.value) {
        confPassEle.style.color = "green";
        confPassWarningEle.style.visibility = "hidden";
      } else {
        confPassEle.style.color = "red";
        confPassWarningEle.style.visibility = "visible";
      }
    } else {
      confPassEle.style.color = "black";
      confPassWarningEle.style.visibility = "hidden";
    }
  };

  return (
    <ThemeProvider theme={createTheme(dark)}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  type="text"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_again"
                  label="Confirm Password"
                  type="password"
                  id="password_again"
                  autoComplete="new-password"
                  onChange={handleConfirmPassword}
                />
                <p
                  id="compare-password-warn"
                  style={{ color: "red", visibility: "hidden" }}
                >
                  password is not matching
                </p>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid item>Already have an account?</Grid>
            <Link to="/login">Log in</Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
