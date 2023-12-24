import toast from "react-hot-toast";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box } from "@mui/material";
import React from "react";

const BeggerArea = ({ area }) => {
  const [upvoteDisabled, setUpvoteDisabled] = React.useState(false);
  const handleUpvote = () => {
    setUpvoteDisabled(true);
    toast.success("Upvoted Successfully")
  };

  const areas = [
    {
      address: "Kathmandu",
      pincode: "44600",
      peoples: 10,
    },
    {
      address: "Lalitpur",
      pincode: "44600",
      peoples: 10,
    },
    {
      address: "Bhaktapur",
      pincode: "44600",
      peoples: 10,
    },
  ];
  return (
    <div
      sx={{
        margin: "0px",
        padding: "0px",
      }}
    >
      <h1>AREAS</h1>
      {areas.map((area) => (
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
                  key="accept"
                  sx={{ color: "green" }}
                  onClick={handleUpvote}
                  disabled={upvoteDisabled}
                >
                  <TrendingUpIcon />
                </Button>
              </Box>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <GroupsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${area.address} (Pin Code: ${area.pincode})`}
              secondary={area.peoples}
            />
          </ListItem>
        </Card>
      ))}
    </div>
  );
};

export default BeggerArea;
