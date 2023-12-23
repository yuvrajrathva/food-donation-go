import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import InterestsIcon from "@mui/icons-material/Interests";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import MyProfile from "./Dashboard/MyProfile";
import AboutUs from "./Dashboard/AboutUs";
import BeggerArea from "./Dashboard/BeggerArea";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../config";
import useAxios from "../utils/useAxios";

const drawerWidth = 240;
const dark = {
  palette: {
    mode: "dark",
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Dashboard = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tab, setTab] = useState(0);

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  // console.log(jwtDecode(localStorage.getItem("authTokens")));

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const { window } = props;

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const Items = [
    {
      text: "My Profile",
      icon: <InterestsIcon className="text-[#A0A0A0]" />,
      component: <MyProfile />,
    },
    {
      text: "About Us",
      icon: <InfoIcon className="text-[#A0A0A0]" />,
      component: <AboutUs />,
    },
    {
      text: "Beggar Area",
      icon: <LocationOnIcon className="text-[#A0A0A0]" />,
      component: <BeggerArea />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List className="text-end">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tab}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {Items.map((item, index) => (
            <>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  // give visible box shadow to selected tab

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  margin: "auto",
                  width: "100%",
                  paddingLeft: "30px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                onClick={() => setTab(index)}
              >
                <IconButton key={item.text} className="gap-2">
                  {item.icon}
                </IconButton>
                <Tab
                  key={item.text}
                  label={item.text}
                  {...a11yProps(index)}
                  className="p-0"
                ></Tab>
              </Box>
            </>
          ))}
        </Tabs>
      </List>
      <List>
        <ListItem disablePadding className="text-red-600">
          <ListItemButton
            onClick={logout}
            sx={{
              bgcolor: "background.paper",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              margin: "auto",
              width: "100%",
              paddingLeft: "30px",
            }}
          >
            <IconButton>
              <LogoutIcon />
            </IconButton>
            <ListItemText primary="Logout" className="p-0" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={createTheme(dark)}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          //   sx={{
          //     width: "100%",
          //   }}
        >
          {/* <Toolbar /> */}
          {Items.map((item, index) => (
            <TabPanel
              value={tab}
              index={index}
              //   sx={{
              //     width: "100%",
              //   }}
            >
              {item.component}
            </TabPanel>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
