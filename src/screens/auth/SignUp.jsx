import * as React from "react";
import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../../utils/UserPool";

const theme = createTheme();

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [designation, setDesignation] = useState("");
  const [errors, setErrors] = useState([]);


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const attributeList = [];
      const dataName = new CognitoUserAttribute({
        Name: "name",
        Value: name,
      });
      const dataCompanyName = new CognitoUserAttribute({
        Name: "custom:CompanyName",
        Value: company,
      });
      const dataCountry = new CognitoUserAttribute({
        Name: "custom:Country",
        Value: country,
      });
      const dataDesignation = new CognitoUserAttribute({
        Name: "custom:Designation",
        Value: designation,
      });
      attributeList.push(dataName);
      attributeList.push(dataCompanyName);
      attributeList.push(dataCountry);
      attributeList.push(dataDesignation);
      UserPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setErrors([error.response.data]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                // error={errors[0] !== undefined ? errors[0].name : ""}
                // helperText={errors[0] !== undefined ? errors[0].name : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                // error={errors[0] !== undefined ? errors[0].email : ""}
                // helperText={errors[0] !== undefined ? errors[0].email : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                // error={errors[0] !== undefined ? errors[0].password : ""}
                // helperText={errors[0] !== undefined ? errors[0].password : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="company"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                // error={errors[0] !== undefined ? errors[0].name : ""}
                // helperText={errors[0] !== undefined ? errors[0].name : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="designation"
                label="Designation"
                name="designation"
                autoComplete="designation"
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
                // error={errors[0] !== undefined ? errors[0].name : ""}
                // helperText={errors[0] !== undefined ? errors[0].name : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                // error={errors[0] !== undefined ? errors[0].name : ""}
                // helperText={errors[0] !== undefined ? errors[0].name : ""}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Link to="/signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;
