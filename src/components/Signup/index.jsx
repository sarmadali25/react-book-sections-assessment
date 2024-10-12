import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Box, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        console.log('onSubmit', data);
        let obj={
          role: 'Author',
          ...data
        }
      await axios.post('http://localhost:5000/users', obj);
      navigate('/'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const handleLoginRedirect = (event) => {
    event.preventDefault();
    navigate("/"); // Redirect to the "/login" route
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ minWidth: 400, boxShadow: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Sign Up
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register('email', { required: 'Email is required' })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />

                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register('password', { required: 'Password is required' })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </form>
               {/* Link to go to the login page */}
               <Typography variant="body2" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={ handleLoginRedirect}
                  sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SignUp;
