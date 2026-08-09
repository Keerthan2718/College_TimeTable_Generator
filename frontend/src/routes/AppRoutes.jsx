import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import CreateTimetable from "../pages/CreateTimetable";
import ViewTimetable from "../pages/ViewTimetable";
import GeneratedTimetable from "../pages/GeneratedTimetable";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";

function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

        <Route
        path="/"
        element={<Home />}
          
        
      />


      {/* =========================
          PROTECTED ROUTES
      ========================= */}



      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateTimetable />
          </ProtectedRoute>
        }
      />

      <Route
        path="/view"
        element={
          <ProtectedRoute>
            <ViewTimetable />
          </ProtectedRoute>
        }
      />

      <Route
        path="/generated"
        element={
          <ProtectedRoute>
            <GeneratedTimetable />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;