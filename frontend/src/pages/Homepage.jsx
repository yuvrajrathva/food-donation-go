import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const dark = {
  palette: {
    mode: "dark",
  },
};
const Homepage = () => {
  return (
    <ThemeProvider theme={createTheme(dark)}>
      <h1>Homepage</h1>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        justifyContent="space-between"
        useFlexGap
        flexWrap="wrap"
      >
        <Link to="/login">
          <Button variant="contained">Log In</Button>
        </Link>
        <Link to="/signup">
          <Button variant="outlined">Sign Up</Button>
        </Link>
      </Stack>
    </ThemeProvider>
  );
};

export default Homepage;
