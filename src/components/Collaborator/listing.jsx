import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CollaboratorList from "./collaboratorListing";

const ListingComponent = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch collaborators from the API when the component mounts
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        const filteredCollaborators = response.data.filter(
          (user) => user.role === "Collaborator"
        );
        setCollaborators(filteredCollaborators);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching collaborators:", error);
        setError("Failed to load collaborators");
        setLoading(false);
      });
  }, []);

  const handleRemoveCollaborator = (id) => {
    setCollaborators(collaborators.filter((user) => user.id !== id));
  };

  return (
    <div>
      
      {error && <div style={{ color: "red" }}>{error}</div>}
      <CollaboratorList
        collaborators={collaborators}
        handleRemoveCollaborator={handleRemoveCollaborator}
        loading={loading}
      />
    </div>
  );
};

export default ListingComponent;
