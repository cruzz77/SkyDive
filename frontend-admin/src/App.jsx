import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { InstructorProvider, useInstructor } from './context/InstructorContext';
import Login from './pages/Login';
import AdminDashboard from './Admin/AdminDashboard';
import InstructorDashboard from './Instructor/InstructorDashboard';
import AllBookings from './Admin/AllBookings';
import AddInstructor from './Admin/AddInstructor';
import InstructorsList from './Admin/InstructorsList';
import AddPackage from './Admin/AddPackage';
import Sidebar from './components/Sidebar';

// Layout wrapper for authenticated pages
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
};

// Protected route wrapper
const ProtectedRoute = ({ children, requireAdmin, requireInstructor }) => {
  const { aToken } = useAdmin();
  const { iToken } = useInstructor();

  // Check if user is authenticated
  const isAuthenticated = requireAdmin ? aToken : requireInstructor ? iToken : false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>
};

// Placeholder components for instructor routes
const InstructorBookings = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-white mb-4">My Bookings</h1>
    <p className="text-gray-400">View your assigned bookings.</p>
  </div>
);

const InstructorProfile = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-white mb-4">My Profile</h1>
    <p className="text-gray-400">Manage your instructor profile.</p>
  </div>
);

function App() {
  return (
    <AdminProvider>
      <InstructorProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/all-bookings"
              element={
                <ProtectedRoute requireAdmin>
                  <AllBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-instructor"
              element={
                <ProtectedRoute requireAdmin>
                  <AddInstructor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructors-list"
              element={
                <ProtectedRoute requireAdmin>
                  <InstructorsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-package"
              element={
                <ProtectedRoute requireAdmin>
                  <AddPackage />
                </ProtectedRoute>
              }
            />

            {/* Instructor Routes */}
            <Route
              path="/instructor-dashboard"
              element={
                <ProtectedRoute requireInstructor>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor-bookings"
              element={
                <ProtectedRoute requireInstructor>
                  <InstructorBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor-profile"
              element={
                <ProtectedRoute requireInstructor>
                  <InstructorProfile />
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </InstructorProvider>
    </AdminProvider>
  );
}

export default App;
