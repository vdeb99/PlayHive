import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Profile from "../pages/Profile/Profile";
import Channel from "../pages/Channel/Channel";
import Dashboard from "../pages/Dashboard/Dashboard";
import History from "../pages/History/History";
import Playlist from "../pages/Playlist/Playlist";
import Upload from "../pages/Upload/Upload";
import Watch from "../pages/Watch/Watch";
import Search from "../pages/Search/Search";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes without Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/channel/:username" element={<Channel />} />
        <Route path="/watch/:videoId" element={<Watch />} />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
