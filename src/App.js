import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import { fetchPresensiByIdApi } from "./data/attendance"; // New import
import { fetchVisitByIdApi } from "./data/visits";

// Impor AuthProvider
import { AuthProvider } from "./context/AuthContext";

// Komponen Auth
import LoginPage from "./pages/auth/LoginPage";
import { ProtectedRoute, GuestRoute } from "./components/AuthRoutes";

// Halaman Admin
import ManageAttendance from "./pages/admin/ManageAttendance";
import ManageTeacherAccounts from "./pages/admin/ManageTeacherAccounts";
import AddTeacherAccount from "./pages/admin/AddTeacherAccount";
import EditTeacherAccount from "./pages/admin/EditTeacherAccount";
import ManageVisits from "./pages/admin/ManageVisits";
import ManageReports from "./pages/admin/ManageReports";

// Halaman User
import AttendanceHistory from "./pages/users/AttendanceHistory";
import Profile from "./pages/users/Profile";
import MarkAttendance from "./pages/users/MarkAttendance";

// Halaman Guest/Publik
import VisitForm from "./pages/guest/VisitForm";
import AttendanceResponse from "./pages/response/AttendanceResponse";
import VisitResponse from "./pages/response/VisitResponse";

// Wrapper component to fetch visit data by ID
const VisitResponseWrapper = () => {
  const { id } = useParams();
  const [visitData, setVisitData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVisitByIdApi(id);
        setVisitData(data);
      } catch (error) {
        console.error("Error fetching visit:", error);
        setVisitData(null); // Triggers redirect in VisitResponse
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <VisitResponse visitData={visitData} />;
};

// New Wrapper for Attendance Response
const AttendanceResponseWrapper = () => {
  const { id } = useParams();
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPresensiByIdApi(id);
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendanceData(null); // Triggers redirect in AttendanceResponse
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <AttendanceResponse attendanceData={attendanceData} />;
};

export default function App() {
  return (
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
          <Route path="/attendance-response/:id" element={<AttendanceResponseWrapper />} /> {/* Updated */}
          <Route path="/visit-response/:id" element={<VisitResponseWrapper />} />

          {/* Redirect default: arahkan ke /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}