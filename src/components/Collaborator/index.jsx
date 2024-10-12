import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListingComponent from "./listing";

const AddCollaborator = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // You can add your logic here to save the collaborator
      console.log("Collaborator added:", { email, password });
      let obj = {
        role: "Collaborator",
        email,
        password,
      };
      await axios.post("http://localhost:5000/users", obj);
      navigate("/section"); // Redirect to login after successful registration
    } catch (error) {
      console.error("Registration failed", error);
    }

    // Optionally redirect back to the main page or a confirmation page
   // navigate("/book-sections");
  };

  return (
    <>
    <Box sx={{ padding: 4 }}>
    <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate(-1)} // Navigate to the previous page
        sx={{ marginBottom: 2 }}
      >
        Go Back
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Add Collaborator
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button variant="contained" type="submit">
          Add Collaborator
        </Button>
      </form>
    </Box>

    <ListingComponent/>
    </>
    
  );
};

export default AddCollaborator;
