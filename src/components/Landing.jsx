import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

const theme = createTheme();

export default function Landing() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <main>
        <Container
          maxWidth="sm"
          // bring all content to the center of the page
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "85vh",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            ConsoleView
          </Typography>
          <Typography align="center" color="text.secondary" paragraph>
            The ConsoleView platform delivers one dashboard for multiple AWS
            accounts to view all your AWS Resources Inventory i.e. EC2
            instances, VPC, S3 Buckets, Billing and many more. ConsoleView is
            the industry’s first Tool to operate multiple AWS Accounts from one
            single Dashboard.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Link style={{ textDecoration: "none" }} to="/signup">
              <Button variant="contained">Sign Up</Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/signin">
              <Button variant="outlined">Sign In</Button>
            </Link>
          </Stack>
        </Container>
      </main>
    </ThemeProvider>
  );
}
