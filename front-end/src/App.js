import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import { ProtectedRoute, GuestRoute } from "./components/AuthRoutes";
import ManageAttendance from "./pages/admin/ManageAttendance";
import AddAttendance from "./pages/admin/AddAttendance";
import ManageTeacherAccounts from "./pages/admin/ManageTeacherAccounts";
import AddTeacherAccount from "./pages/admin/AddTeacherAccount";
import EditTeacherAccount from "./pages/admin/EditTeacherAccount";
import ManageVisits from "./pages/admin/ManageVisits";
import ManageReports from "./pages/admin/ManageReports";
import AttendanceHistory from "./pages/users/AttendanceHistory";
import Profile from "./pages/users/Profile";
import RegisterFace from "./pages/users/RegisterFace";
import MarkAttendance from "./pages/users/MarkAttendance";
import VisitForm from "./pages/guest/VisitForm";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />

          <Route
            path="/dashboard/manage-attendance"
            element={
              <ProtectedRoute allowedRole={1}>
                <ManageAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-attendance/add"
            element={
              <ProtectedRoute allowedRole={1}>
                <AddAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-accounts"
            element={
              <ProtectedRoute allowedRole={1}>
                <ManageTeacherAccounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-accounts/add"
            element={
              <ProtectedRoute allowedRole={1}>
                <AddTeacherAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-accounts/edit/:id"
            element={
              <ProtectedRoute allowedRole={1}>
                <EditTeacherAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-visits"
            element={
              <ProtectedRoute allowedRole={1}>
                <ManageVisits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manage-reports"
            element={
              <ProtectedRoute allowedRole={1}>
                <ManageReports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/attendance-history"
            element={
              <ProtectedRoute allowedRole={2}>
                <AttendanceHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute allowedRole={2}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/register-face"
            element={
              <ProtectedRoute allowedRole={2}>
                <RegisterFace />
              </ProtectedRoute>
            }
          />

          <Route path="/visit-form" element={<VisitForm />} />
          <Route path="/mark-attendance" element={<MarkAttendance />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}