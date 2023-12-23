import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MyInfo = ({name, type, phone, address}) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
        alt="profile-img"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
             {type}
          </Typography>
          <Typography variant="body2" component="div">
            Phone: {phone}
          </Typography>
          <Typography variant="body2" component="div">
            Address: {address}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MyInfo;
