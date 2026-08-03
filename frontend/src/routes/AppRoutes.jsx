import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/layout/ProtectedRoute";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
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

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Main Layout */}
            <Route element={<Layout />}>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />

                <Route
                    path="/watch/:videoId"
                    element={<Watch />}
                />

                <Route
                    path="/search"
                    element={<Search />}
                />

                <Route
                    path="/channel/:username"
                    element={<Channel />}
                />

                {/* Protected Routes */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

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

            </Route>

            {/* 404 */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;