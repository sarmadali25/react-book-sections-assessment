import React from "react";
import { Typography, Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CollaboratorList = ({ collaborators, handleRemoveCollaborator }) => {
  // Filter the users to get only Collaborators
    console.log(collaborators)
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Collaborator List
      </Typography>

      {collaborators.length > 0 ? (
        <List>
          {collaborators.map((collaborator) => (
            <ListItem
              key={collaborator.id}
              sx={{
                borderBottom: "1px solid #ddd",
                marginBottom: 2,
              }}
            >
              <ListItemText
                primary={collaborator.email}
                secondary={`Role: ${collaborator.role}`}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveCollaborator(collaborator.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No collaborators found.</Typography>
      )}
    </Box>
  );
};

export default CollaboratorList;
