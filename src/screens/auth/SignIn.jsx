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
import Logo from "../../assets/logo.png";

import UserPool from "../../utils/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { Container } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#ba5937',
    }
  },
});

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          localStorage.setItem("access-token", data.getAccessToken().getJwtToken());
          localStorage.setItem("name", data.idToken.payload.name);
          localStorage.setItem("email", data.idToken.payload.email);
          localStorage.setItem(
            "company",
            data.idToken.payload["custom:CompanyName"]
          );
          localStorage.setItem(
            "country",
            data.idToken.payload["custom:Country"]
          );
          localStorage.setItem(
            "designation",
            data.idToken.payload["custom:Designation"]
          );
          navigate("/instances");
        },
        onFailure: (err) => {
          console.error("onFailure:", err);
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Navbar /> */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1546912/pexels-photo-1546912.jpeg?auto=compress&cs=tinysrgb&w=800)",
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
            <Container style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "-10px",
            }}>
              <img src={Logo} alt="logo" width="200" />
            </Container>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>{" "}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Link to="/signup" variant="body2" style={{color: "#ba5937"}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
