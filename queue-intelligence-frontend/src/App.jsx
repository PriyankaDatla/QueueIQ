import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import QueueDetails from "./pages/QueueDetails";
import MyTokens from "./pages/MyTokens";
import TokenStatus from "./pages/TokenStatus";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CreateQueue from "./pages/CreateQueue";
import ServeNext from "./pages/ServeNext";
import OpenCounter from "./pages/OpenCounter";
import CloseCounter from "./pages/CloseCounter";
import AdminAnalytics from "./pages/AdminAnalytics";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Recommendations from "./pages/Recommendations";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="CUSTOMER">
                    <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
            path="/recommendation"
            element={
                <ProtectedRoute role="CUSTOMER">
                    <Recommendations />
                </ProtectedRoute>
            }
        />

        <Route
            path="/analytics"
            element={
                <ProtectedRoute role="CUSTOMER">
                    <Analytics />
                </ProtectedRoute>
            }
        />

        <Route
          path="/queue/:id"
          element={
            <ProtectedRoute role="CUSTOMER">
              <QueueDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tokens"
          element={
            <ProtectedRoute role="CUSTOMER">
              <MyTokens />
            </ProtectedRoute>
          }
        />

        <Route
          path="/token-status/:tokenId"
          element={
            <ProtectedRoute role="CUSTOMER">
              <TokenStatus />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateQueue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/serve-next"
          element={
            <ProtectedRoute role="ADMIN">
              <ServeNext />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/open-counter"
          element={
            <ProtectedRoute role="ADMIN">
              <OpenCounter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/close-counter"
          element={
            <ProtectedRoute role="ADMIN">
              <CloseCounter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;