import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ videos }) {

    const data = videos.map((video) => ({
        title:
            video.title.length > 15
                ? video.title.slice(0, 15) + "..."
                : video.title,
        Views: video.views,
    }));

    return (
        <div className="bg-zinc-900 rounded-xl p-6 mt-10">

            <h2 className="text-2xl font-bold mb-6">
                Video Views
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="title" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="Views"
                        fill="#ef4444"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default AnalyticsChart;