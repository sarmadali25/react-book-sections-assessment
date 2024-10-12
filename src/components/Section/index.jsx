import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SectionListing from "./sectionListing";

const Section = ({
  section,
  updateSection,
  deleteSection,
  parentIndex = [],
  canEdit,
}) => {
  const handleAddSubsection = () => {
    const newSection = { title: "", subsections: [] };
    const newSections = [...section.subsections, newSection];
    updateSection(parentIndex, newSections);
  };

  const handleDeleteSection = () => {
    deleteSection(parentIndex);
  };

  const handleChange = (e) => {
    const updatedTitle = e.target.value;
    updateSection(parentIndex, updatedTitle, true);
  };

  return (
    <Box sx={{ border: "1px solid #ddd", padding: 2, marginTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Section Title"
          value={section.title}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        {canEdit && (
          <>
            <IconButton onClick={handleAddSubsection}>
              <AddIcon />
            </IconButton>
            {parentIndex.length > 0 && (
              <IconButton onClick={handleDeleteSection}>
                <DeleteIcon />
              </IconButton>
            )}
          </>
        )}
      </Box>

      {/* Recursively render subsections */}
      {section.subsections.length > 0 && (
        <Box sx={{ paddingLeft: 4 }}>
          {section.subsections.map((subsection, index) => (
            <Section
              key={index}
              section={subsection}
              parentIndex={[...parentIndex, index]}
              updateSection={updateSection}
              deleteSection={deleteSection}
              canEdit={canEdit}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

const BookSections = () => {
  const [sections, setSections] = useState([]);
  const [userRole, setUserRole] = useState("Author"); // Change this to 'Author' for testing
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  // Fetch user role from local storage when component mounts
  useEffect(() => {
    const role = localStorage.getItem("role"); // Assuming the role is stored under 'userRole'
    if (role) {
      setUserRole(role); // Set the user role
    } else {
      setUserRole("Guest"); // Default role if none found
    }
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const addSection = () => {
    setSections([...sections, { title: "", subsections: [] }]);
  };

  const updateSection = (indexes, value, isTitleUpdate = false) => {
    const updateSections = (sections, indexes, value, isTitleUpdate) => {
      if (indexes.length === 0) return sections;

      const [firstIndex, ...remainingIndexes] = indexes;

      if (remainingIndexes.length === 0) {
        if (isTitleUpdate) {
          // Update section title
          sections[firstIndex].title = value;
        } else {
          // Update subsections
          sections[firstIndex].subsections = value;
        }
      } else {
        sections[firstIndex].subsections = updateSections(
          [...sections[firstIndex].subsections],
          remainingIndexes,
          value,
          isTitleUpdate
        );
      }

      return sections;
    };

    setSections((prevSections) =>
      updateSections([...prevSections], indexes, value, isTitleUpdate)
    );
  };

  const deleteSection = (indexes) => {
    const removeSection = (sections, indexes) => {
      if (indexes.length === 1) {
        sections.splice(indexes[0], 1);
      } else {
        const [firstIndex, ...remainingIndexes] = indexes;
        sections[firstIndex].subsections = removeSection(
          [...sections[firstIndex].subsections],
          remainingIndexes
        );
      }

      return sections;
    };

    setSections((prevSections) => removeSection([...prevSections], indexes));
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/"); // Redirect to the login page
  };

  const handleAddCollaborator = () => {
    navigate("/add-collaborator"); // Redirect to the add collaborator page
  };

  //

  const handleSectionsLisitng = () => {
    navigate("/section-listing"); // Redirect to the add collaborator page
  };
  const handleSubmitSections = async () => {
    try {
      const response = await axios.post("http://localhost:5000/sections", {
        sections, // The sections data to be sent
      });

      // Handle success
      console.log("Sections submitted successfully:", response.data);

      // Show success toaster
      setSnackbar({
        open: true,
        message: "Sections submitted successfully!",
        severity: "success",
      });
      // You can show a success message here
    } catch (error) {
      // Handle error
      console.error("Error submitting sections:", error);
      // You can show an error message here
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Display user role */}
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Logged in as: {userRole || "Guest"}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Book Sections
      </Typography>

      {userRole === "Author" && (
        <>
          <Button
            variant="contained"
            onClick={addSection}
            startIcon={<AddIcon />}
          >
            Add Section
          </Button>
          <Button
            variant="contained"
            onClick={handleAddCollaborator}
            startIcon={<AddIcon />}
            sx={{ marginLeft: 2 }} // Adds space between buttons
          >
            Add Collaborator
          </Button>
        </>
      )}

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleLogout}
        sx={{ marginLeft: 2 }}
      >
        Logout
      </Button>

      <Box sx={{ marginTop: 4 }}>
        {sections.map((section, index) => (
          <Section
            key={index}
            section={section}
            parentIndex={[index]}
            updateSection={updateSection}
            deleteSection={deleteSection}
            canEdit={userRole === "Author" || userRole === "Collaborator"} // Both roles can edit
          />
        ))}
      </Box>

      {userRole === "Author" && (
        <Button
          variant="contained"
          onClick={handleSubmitSections}
          sx={{ marginTop: 4, marginRight: 2  }}
          
        >
          Submit All Sections
        </Button>
      )}

      {
        <Button
          variant="contained"
          marginLeft="4"
          onClick={handleSectionsLisitng}
          sx={{ marginTop: 4 }}
        >
          Show Section List
        </Button>
      }

      {/* Section Listing Component */}
      {/* <SectionListing
        canEdit={userRole === "Author" || userRole === "Collaborator"} // Both roles can edit
        updateSection={() => {}} // Pass functions if needed
        deleteSection={() => {}} // Pass functions if needed
      /> */}

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookSections;
