import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getDashboardVideos,
} from "../../services/dashboard.service";

import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardVideoTable from "../../components/dashboard/DashboardVideoTable";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [statsRes, videosRes] = await Promise.all([
        getDashboardStats(),
        getDashboardVideos(),
      ]);

      setStats(statsRes.data.data);
      setVideos(videosRes.data.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const filteredVideos = videos
    .filter((video) => {
      if (filter === "published") return video.isPublished;

      if (filter === "private") return !video.isPublished;

      return true;
    })
    .filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase()),
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">Creator Dashboard</h1>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-800 rounded-lg px-4 py-3 w-72 outline-none"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-zinc-800 rounded-lg px-4 py-3 outline-none"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <DashboardStats stats={stats} />
      <AnalyticsChart videos={filteredVideos} />

      <div className="mt-10">
        <DashboardVideoTable videos={filteredVideos} refresh={loadDashboard} />
      </div>
    </div>
  );
}

export default Dashboard;
