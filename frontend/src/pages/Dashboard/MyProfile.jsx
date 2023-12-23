import React from "react";
import { useEffect } from "react";
import Requests from "../../components/Requests";
import MyInfo from "../../components/MyInfo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import "./MyProfile.css";
import { jwtDecode } from "jwt-decode";
import useAxios from "../../utils/useAxios";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import toast from "react-hot-toast";

const requestHeading = {
  marginTop: "0px",
};

const MyProfile = () => {
  const api = useAxios();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [food, setFood] = React.useState("");
  const [user, setUser] = React.useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [userData, setUserData] = React.useState({});
  const baseURL = API_BASE_URL;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    // const response = await api.post("/donate/", {
    //   name: name,
    //   description: description,
    // });
    // if (response.status === 200) {
    //   console.log(response.data);
    //   toast.success ("Request Created Successfully")
    // }
    setOpen(false);
  };

  useEffect(() => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${authTokens?.access}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const fetchUserData = async () => {
      console.log(jwtDecode(localStorage.getItem("authTokens")));
      const id = jwtDecode(localStorage.getItem("authTokens")).user_id;
      const response = await axiosInstance.get("/users/" + id + "/");
      setUserData(response.data);
      console.log(response.data);
    };
    fetchUserData();
  }, []);

  return (
    <div className="myprofile-main">
      <div className="myprofile-about">
        <h1>MY PROFILE</h1>
        <p>DONOR</p>
        {/* {user.isDonor ? (
        <><p>DONOR</p></>
        ) : (
            <>
            <p>VOLUNTEER</p></>
        )} */}

        {/* <MyInfo name={ user.first_name + user.last_name} type= {user.isDonor ? "DONOR":"VOLUNTEER"} phone={user.contact} address={user.address} /> */}
        <MyInfo
          name="John Doe"
          type="DONOR"
          phone="1234567890"
          address="Delhi"
        />
      </div>
      <Divider
        variant="middle"
        sx={{ marginBottom: "20px", marginTop: "20px" }}
      />
      <div className="all-requestes-main">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2 sx={requestHeading}>ALL REQUESTS</h2>
          {/* {user.isDonor ? (
          <> <Button variant="outlined" onClick={handleClickOpen}>
          Create New
        </Button></>
          ): (<></>)} */}
          <Button variant="outlined" onClick={handleClickOpen}>
            Create New
          </Button>
        </Box>
        <Requests />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Food Donation Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the valid entry for the food donation form.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name of the Donor"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Phone Number"
            pattern="[1-9]{1}[0-9]{9}"
            type="contact"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Food Discription (Quantity, Type, etc.)"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyProfile;
