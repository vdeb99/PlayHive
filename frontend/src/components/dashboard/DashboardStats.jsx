function DashboardStats({ stats }) {

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-zinc-900 rounded-xl p-6">

                <h2 className="text-4xl font-bold">

                    {stats.totalVideos}

                </h2>

                <p className="text-zinc-400 mt-2">

                    Videos

                </p>

            </div>

            <div className="bg-zinc-900 rounded-xl p-6">

                <h2 className="text-4xl font-bold">

                    {stats.totalViews}

                </h2>

                <p className="text-zinc-400 mt-2">

                    Views

                </p>

            </div>

            <div className="bg-zinc-900 rounded-xl p-6">

                <h2 className="text-4xl font-bold">

                    {stats.totalLikes}

                </h2>

                <p className="text-zinc-400 mt-2">

                    Likes

                </p>

            </div>

            <div className="bg-zinc-900 rounded-xl p-6">

                <h2 className="text-4xl font-bold">

                    {stats.totalComments}

                </h2>

                <p className="text-zinc-400 mt-2">

                    Comments

                </p>

            </div>

        </div>

    );

}

export default DashboardStats;