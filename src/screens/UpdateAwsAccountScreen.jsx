import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  mainListItems,
  secondaryListItems,
} from "../components/Dashboard/ListItems";
import Copyright from "../components/Dashboard/Copyright";
import { Button, Container, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { AxiosInstance } from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function UpdateAwsAccountContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [accountName, setAccountName] = useState("");
  const [accountDescription, setAccountDescription] = useState("");
  const [roleArn, setRoleArn] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await AxiosInstance.post(
        `/account/update/${id}`,
        {
          account_name: accountName,
          description: accountDescription,
          role_arn: roleArn,
          account_type: "aws",
          role_id: "1",
        },
        {
          headers: {
            "access-token": `${localStorage.getItem("access-token")}`,
          },
        }
      );
      console.log(response.data);
      console.log("Account updated ✅");
      navigate("/aws-accounts");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await AxiosInstance.get(`/account/getAccountById/${id}`, {
          headers: {
            "access-token": `${localStorage.getItem("access-token")}`,
          },
        });
        console.log(response.data.data[0]);
        setAccountName(response.data.data[0].account_name);
        setAccountDescription(response.data.data[0].description);
        setRoleArn(response.data.data[0].role_arn);
      } catch (error) {
        console.log(error);
      }
    };
    getAccount();
  }, [id]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Update Account
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Paper style={{ padding: 20 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary"
                  style={{ padding: 17 }}
                >
                  Update Account
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      onSubmit={handleSubmit}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Account Name"
                        variant="outlined"
                        style={{ width: "95%" }}
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Account Description"
                        variant="outlined"
                        style={{ width: "95%" }}
                        value={accountDescription}
                        onChange={(e) => setAccountDescription(e.target.value)}
                      />
                      <Typography
                        variant="body"
                        component="div"
                        gutterBottom
                        style={{ marginLeft: 15 }}
                      >
                        <strong>Specify Cross Acount ARN</strong>
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        style={{ marginLeft: 15, width: "95%", marginTop: -4 }}
                      >
                        Follow steps on the right to create a IAM role in AWS
                        that will give us cross account access to your AWS
                        resources, then enter the role ARN below. <br />
                        <em>
                          Note: You'll need our AWS account ID and external ID
                          to complete the steps.
                        </em>
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        label="Account ID"
                        variant="outlined"
                        style={{ width: "95%" }}
                        disabled
                        value={"01009746100"}
                      />
                      <TextField
                        id="outlined-basic"
                        label="External ID"
                        variant="outlined"
                        style={{ width: "95%" }}
                        disabled
                        value={"Redinasys"}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Role ARN"
                        variant="outlined"
                        style={{ width: "95%" }}
                        value={roleArn}
                        onChange={(e) => setRoleArn(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        style={{ width: "95%" }}
                        type="submit"
                      >
                        Update Account
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body" gutterBottom>
                      <strong>Follow the below steps:</strong>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      1. Login to your AWS console. <br />
                      2. Go to IAM service. <br />
                      3. Go to roles and create role. <br />
                      4. Under "Select type of trusted entity", choose another
                      AWS account. Then, paste in Redinasys AWS Account ID (from
                      connector details) <br />
                      5. Select require external ID and paste in the external ID
                      (from connector details) <br />
                      6. Select the following policies: Find the policy titled
                      "AmazonEC2ReadOnlyAccess" and select the checkboxes next
                      to it. <br />
                      7. Click next: Tags <br />
                      8. Click next: Review <br />
                      9. Enter a role name (eg: RedinasysViewRole) and click
                      create role. <br />
                      10. Click on the role you just created to view details.
                      Copy the Role ARN and paste it into the Redinasys account
                      page. <br />
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function UpdateAwsAccountScreen() {
  return <UpdateAwsAccountContent />;
}
