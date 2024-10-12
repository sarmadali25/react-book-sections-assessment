import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

const Section = ({ section, level = 0, updateSection }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(section.title || "");
  
    const handleUpdate = () => {
      if (newTitle.trim()) {
        updateSection(section.id, newTitle); // Call update function
        setIsEditing(false);
      }
    };
  
    return (
      <Box sx={{ marginLeft: level * 2 }}>
        <ListItem>
          {isEditing ? (
            <TextField
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleUpdate} // Update on blur
              onKeyPress={(e) => {
                if (e.key === "Enter") handleUpdate(); // Update on Enter key
              }}
              variant="outlined"
              size="small"
              autoFocus
            />
          ) : (
            <>
              <ListItemText primary={newTitle || "Untitled Section"} />
              <IconButton onClick={() => setIsEditing(true)} size="small">
                <EditIcon />
              </IconButton>
            </>
          )}
        </ListItem>
        <Divider />
        {section.subsections && section.subsections.length > 0 && (
          <List>
            {section.subsections.map((subsection, index) => (
              <Section
                key={index}
                section={subsection}
                level={level + 1}
                updateSection={updateSection}
              />
            ))}
          </List>
        )}
      </Box>
    );
  };

const SectionListing = ({ canEdit, deleteSection }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sections data from the API
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sections");
        console.log("response", response);
        setSections(response.data); // Assuming the API returns an object with a "sections" key
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sections:", err);
        setError("Failed to load sections.");
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const updateSection = async (id, newTitle) => {
    try {
      
      //  const response = await axios.patch(`http://localhost:5000/sections/${id}`, { title: newTitle });
      // Update the section locally after successful API call
      setSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id === id) {
            return { ...section, title: newTitle }; // Update the title
          }
          return section;
        })
      );

    //   const updatedResponse = await axios.post("http://localhost:5000/sections", {
    //     sections, // The sections data to be sent
    //   });
    //   console.log("Section updated successfully", updatedResponse.data);
    } catch (error) {
      console.error("Error updating section:", error);
      // Optionally show an error message to the user
    }
  };
  console.log("sections", sections);

  // Loading or error handling
  if (loading) return <Typography>Loading sections...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Sections List
      </Typography>
      <List>
        {sections.map((item) =>
          item.sections ? (
            item.sections.map((section, index) => (
              <>
                <h4>Section Title</h4>
                <Section key={index} section={section} updateSection={updateSection} />
              </>
            ))
          ) : (
            <Section key={item.id} section={item} updateSection={updateSection} />
          ) // Handle non-sections structure
        )}
      </List>
    </Box>
  );
};

export default SectionListing;
