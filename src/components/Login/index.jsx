import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const response = await axios.get(`http://localhost:5000/users`);
      console.log('response', response);
      if (response?.data) {
        const foundUser = response?.data.find(
          (user) => user.email === data.email
        );

        if (foundUser) {
          console.log("User found:", foundUser);
          localStorage.setItem("token", foundUser.password);
          
          localStorage.setItem("role", foundUser.role);

          navigate("/section");
        } else {
          setSnackbarMessage("User not found. Please check your credentials.");
          setOpenSnackbar(true);
        }
      }
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  const handleSignUpRedirect = (event) => {
    event.preventDefault();
    navigate("/signup"); // Redirect to the "/signup" route
  };

  return (
    <Container maxWidth="sm">
      {/* Snackbar for user not found */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ minWidth: 400, boxShadow: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Login
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />

                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </form>

              {/* Sign Up Option */}
              <Typography variant="body2" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleSignUpRedirect}
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
