"use client";
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    // Outer container uses flex and minHeight to fill the viewport
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar with navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SplitIt
          </Typography>
          <Button color="inherit" onClick={() => router.push("/login")}>Login</Button>
          <Button color="inherit" onClick={() => router.push("/signup")}>Sign Up</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {/* Hero Section */}
          <Box textAlign="center" py={5}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to SplitIt
            </Typography>
            <Typography variant="h5" color="textSecondary" paragraph>
              Track your expenses easily and effectively.
            </Typography>
            <Button variant="contained" color="primary" size="large" onClick={() => router.push("/dashboard")}>
              Get Started
            </Button>
          </Box>

          {/* Features Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Simple & Intuitive
                </Typography>
                <Typography variant="body1">
                  Easily add and categorize your expenses with our intuitive interface.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Real-Time Tracking
                </Typography>
                <Typography variant="body1">
                  Monitor your spending in real-time and stay on top of your budget.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Detailed Reports
                </Typography>
                <Typography variant="body1">
                  Get detailed reports of your expenses to make informed financial decisions.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer - will stick to the bottom due to flexGrow on main content */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Container maxWidth="lg">
          <Typography variant="body1">
            © {new Date().getFullYear()} SplitIt. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
