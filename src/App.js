import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";

import Landing from "./components/Landing";

import SignUp from "./screens/auth/SignUp";
import SignIn from "./screens/auth/SignIn";
import Dashboard from "./screens/Dashboard";

import PrivateRoutes from "./utils/PrivateRoute";
import InstanceScreen from "./screens/InstanceScreen";
import AwsAccountsScreen from "./screens/AwsAccountsScreen";
import AddAwsAccountScreen from "./screens/AddAwsAccountScreen";
import UpdateAwsAccountScreen from "./screens/UpdateAwsAccountScreen";

const App = () => {
  return (
    <Box>
        <Routes>
          <Route element={<PrivateRoutes />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/instances" element={<InstanceScreen />} />
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />


            <Route path="/aws-accounts" element={<AwsAccountsScreen />} />
            <Route path="/add-aws-account" element={<AddAwsAccountScreen />} />
            <Route
              path="/aws-accounts/:id"
              element={<UpdateAwsAccountScreen />}
            />
          </Route>
        </Routes>
    </Box>
  );
};

export default App;
