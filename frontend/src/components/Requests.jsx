import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Card from "@mui/material/Card";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import useAxios from "../utils/useAxios";

const Requests = () => {
  const [acceptedRequests, setAcceptedRequests] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const api = useAxios();
 
  useEffect(() => {
    const fetchOpenPickups = async () => {
      const response = await api.get("/open-pickups/");
      if (response.status === 200) {
        setRequests(response.data["Requests"]);
      }
      console.log(response.data);
    };
    fetchOpenPickups();
  }, [acceptedRequests]);

  useEffect(() => {
    const fetchAcceptedPickups = async () => {
      const response = await api.get("/accept-pickup/");
      if (response.status === 200) {
        setAcceptedRequests(response.data["Accepted-Requests"]);
      }
      console.log(response.data);
    };
    fetchAcceptedPickups();
  }, []);

  const handleAccept = async (e) => {
    const response = await api.post("/pickup-accept/", {
      id: e.id,
    });
    if (response.status === 200) {
      toast.success("Request accepted");
      console.log(e);

      setAcceptedRequests([...acceptedRequests, e]);
      setRequests(
        requests.filter((request) => request.request_id !== e.request_id)
      );
    }
  }

  function handleRequest(e, status) {
    if (status) {
      handleAccept(e);
      toast.success("Request accepted");
      console.log(e);

      setAcceptedRequests([...acceptedRequests, e]);
      setRequests(
        requests.filter((request) => request.request_id !== e.request_id)
      );
    } else {
      toast.error("Request rejected");
      setRequests(
        requests.filter((request) => request.request_id !== e.request_id)
      );
    }
  }

  return (
    <div>
      <List
        sx={{
          width: "600px",
          maxWidth: 600,
          // bgcolor: "background.paper",
        }}
      >
        {requests.map((request) => (
          <Card
            sx={{
              width: "600px",
              maxWidth: 600,
              bgcolor: "background.paper",
              marginBottom: "10px",
            }}
          >
            <ListItem
              secondaryAction={
                <Box>
                  <Button
                    onClick={() => handleRequest(request, true)}
                    key="accept"
                    sx={{ color: "green" }}
                  >
                    accept
                  </Button>
                  <Button
                    onClick={() => handleRequest(request, false)}
                    key="reject"
                    sx={{ color: "red" }}
                  >
                    reject
                  </Button>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={request.donor_name} secondary={request.pickup_address} />
            </ListItem>
          </Card>
        ))}
        <h2>Accepted Requests</h2>
        {acceptedRequests.map((request) => (
          <Card
            sx={{
              width: "600px",
              maxWidth: 600,
              bgcolor: "background.paper",
              marginBottom: "10px",
            }}
          >
            <ListItem
              secondaryAction={
                <Box>
                  <Button sx={{ color: "green" }}>accepted</Button>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={request.type}
                secondary={request.pickup_address}
              />
            </ListItem>
          </Card>
        ))}
      </List>
    </div>
  );
};

export default Requests;
