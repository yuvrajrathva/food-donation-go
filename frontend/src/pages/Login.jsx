import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material";

const dark = {
  palette: {
    mode: "dark",
  },
};
export default function Login() {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const myPromise = new Promise((resolve, reject) => {
      loginUser(email, password)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(myPromise, {
      loading: "Logging you in...",
    });
  };

  return (
    <ThemeProvider theme={createTheme(dark)}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid item>Don't have an account?</Grid>
            <Link to="/signup">Sign Up</Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
