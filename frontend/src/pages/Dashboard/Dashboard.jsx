import { useEffect, useState } from "react";

import {
    getDashboardStats,
    getDashboardVideos,
} from "../../services/dashboard.service";

import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardVideoTable from "../../components/dashboard/DashboardVideoTable";

function Dashboard() {

    const [stats, setStats] = useState(null);

    const [videos, setVideos] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {

        try {

            const statsResponse =
                await getDashboardStats();

            const videosResponse =
                await getDashboardVideos();

            setStats(statsResponse.data.data);

            setVideos(videosResponse.data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    if (loading) {

        return (
            <div className="text-center mt-20">

                Loading Dashboard...

            </div>
        );

    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-8">

            <DashboardStats
                stats={stats}
            />

            <DashboardVideoTable
                videos={videos}
                refresh={loadDashboard}
            />

        </div>

    );

}

export default Dashboard;