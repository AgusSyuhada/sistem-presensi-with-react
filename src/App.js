import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Impor AuthProvider
import { AuthProvider } from "./context/AuthContext";

// Komponen Auth
import LoginPage from "./pages/auth/LoginPage";
import { ProtectedRoute, GuestRoute } from "./components/AuthRoutes";

// Halaman Admin (Nama Baru)
import ManageAttendance from "./pages/admin/ManageAttendance";
import ManageTeacherAccounts from "./pages/admin/ManageTeacherAccounts";
import AddTeacherAccount from "./pages/admin/AddTeacherAccount";
import EditTeacherAccount from "./pages/admin/EditTeacherAccount";
import ManageVisits from "./pages/admin/ManageVisits";
import ManageReports from "./pages/admin/ManageReports";

// Halaman User (Nama Baru)
import AttendanceHistory from "./pages/users/AttendanceHistory";
import Profile from "./pages/users/Profile";
import MarkAttendance from "./pages/users/MarkAttendance";

// Halaman Guest/Publik (Nama Baru)
import VisitForm from "./pages/guest/VisitForm";
import AttendanceResponse from "./pages/response/AttendanceResponse";
import VisitResponse from "./pages/response/VisitResponse";


export default function App() {
  return (
    // Bungkus seluruh Router dengan AuthProvider
    <AuthProvider>
      <Router>
        <Routes>
          {/* === GUEST ROUTE (Hanya bisa diakses jika BELUM login) === */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />

          {/* === ADMIN ROUTES (Hanya bisa diakses oleh role "admin") === */}
          <Route
            path="/dashboard/manage-attendance"
            element={
              <ProtectedRoute allowedRole="admin">
                <ManageAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-accounts"
            element={
              <ProtectedRoute allowedRole="admin">
                <ManageTeacherAccounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-accounts/add"
            element={
              <ProtectedRoute allowedRole="admin">
                <AddTeacherAccount />
              </ProtectedRoute>
            }
          />
          {/* Asumsi: rute edit menggunakan parameter :id */}
          <Route
            path="/dashboard/manage-accounts/edit/:id"
            element={
              <ProtectedRoute allowedRole="admin">
                <EditTeacherAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-visits"
            element={
              <ProtectedRoute allowedRole="admin">
                <ManageVisits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-reports"
            element={
              <ProtectedRoute allowedRole="admin">
                <ManageReports />
              </ProtectedRoute>
            }
          />

          {/* === USER ROUTES (Hanya bisa diakses oleh role "user") === */}
          <Route
            path="/dashboard/attendance-history"
            element={
              <ProtectedRoute allowedRole="user">
                <AttendanceHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute allowedRole="user">
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* === PUBLIC ROUTES (Bisa diakses siapa saja) === */}
          <Route path="/visit-form" element={<VisitForm />} />
          <Route path="/mark-attendance" element={<MarkAttendance />} />
          <Route path="/attendance-response" element={<AttendanceResponse />} />
          <Route path="/visit-response" element={<VisitResponse />} />

          {/* Redirect default: arahkan ke /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

