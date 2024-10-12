// App.jsx
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import BookSections from "../components/Section";
import ProtectedRoute from "./protectedRoutes";
import SignUp from "../components/Signup";
import AddCollaborator from "../components/Collaborator";
import SectionListing from "../components/Section/sectionListing";

const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/add-collaborator"
        element={
          <ProtectedRoute>
            <AddCollaborator />
          </ProtectedRoute>
        }
      />

      <Route
        path="/section"
        element={
          <ProtectedRoute>
            <BookSections />
          </ProtectedRoute>
        }
      />
      <Route
        path="/section-listing"
        element={
          <ProtectedRoute>
            <SectionListing />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
