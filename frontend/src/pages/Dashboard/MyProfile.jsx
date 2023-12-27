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

const requestHeading = {
  marginTop: "0px",
};

const MyProfile = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

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
          name={data.first_name+" "+data.last_name}
          type="DONOR"
          phone={data.email}
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
