import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import AwsAccountNames from "./AwsAccountNames";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// export const mainListItems = (
//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <Link
//         to="/dashboard"
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         <ListItemText primary="Dashboard" />
//       </Link>
//     </ListItemButton>
//   </React.Fragment>
// );

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div">Services</ListSubheader>
    <ListItemButton>
      <ListItemIcon>
      <StorageIcon />
      </ListItemIcon>
      <Link to="/instances" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemText primary="EC2" />
      </Link>
    </ListItemButton>

    <ListSubheader component="div">Filter</ListSubheader>
    <AwsAccountNames />

    <ListSubheader component="div">Manage AWS Accounts</ListSubheader>
    <ListItemButton>
      <ListItemIcon>
      <ManageAccountsIcon />
      </ListItemIcon>
      <Link to="/aws-accounts" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemText primary="Accounts" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <PersonAddIcon />
      </ListItemIcon>
      <Link to="/add-aws-account" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemText primary="Add Account" />
      </Link>
    </ListItemButton>

    <ListSubheader component="div">Settings</ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemText primary="Profile" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <Link
        to="/signin"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => {
          localStorage.clear();
          let navigate = useNavigate();
          navigate("/signin");
        }}
      >
        <ListItemText primary="Logout" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);
