import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
const Login = lazy(() => import("./pages/Login"));
const LoginSuccess = lazy(() => import("./pages/LoginSuccess"));

// Admin Pages

/* ---------------- ADMIN PAGES ---------------- */

import AdminLayout from "./layouts/AdminLayout";
import AdminTasks from "./pages/admin/AdminTasks";

/* ---------------- USER PAGES ---------------- */

import UserLayout from "./layouts/UserLayout";
import DashboardHome from "./pages/user/DashboardHome";
import ChatInterface from "./pages/user/AIChatbot/ChatInterface";
import Journal from "./pages/user/Journal";
import TasksPage from "./pages/user/TasksPage";

/* ---------------- COMPONENTS ---------------- */

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="loader"></div>
          </div>
        }
      >
        <Routes>
          {/* ---------- PUBLIC ROUTES ---------- */}

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-success" element={<LoginSuccess />} />

          {/* ---------- USER DASHBOARD ROUTES ---------- */}

          <Route
            element={
              <PrivateRoute allowedRoles={["user", "enterprise", "admin"]} />
            }
          >
            <Route path="/dashboard" element={<UserLayout />}>
              {/* Dashboard Home */}
              <Route index element={<DashboardHome />} />

              {/* Chat */}
              <Route path="chat" element={<ChatInterface />} />

              {/* Journal */}
              <Route path="journal" element={<Journal />} />

              {/* Daily Tasks Page */}
              <Route path="tasks" element={<TasksPage />} />
            </Route>
          </Route>

          {/* ---------- ADMIN ROUTES ---------- */}

          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* Admin Dashboard */}
              <Route index element={<AdminTasks />} />

              {/* Users */}
              <Route path="users" element={<AdminTasks />} />

              {/* Courses */}
              <Route path="courses" element={<AdminTasks />} />

              {/* Tasks */}
              <Route path="tasks" element={<AdminTasks />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
