import { useState } from "react";

import ChannelVideos from "./ChannelVideos";

function ChannelTabs({ channel, videos }) {
    const [activeTab, setActiveTab] = useState("videos");

    return (
        <div className="mt-10">

            <div className="flex gap-8 border-b border-zinc-700">

                <button
                    onClick={() => setActiveTab("videos")}
                    className={`pb-3 ${
                        activeTab === "videos"
                            ? "border-b-2 border-red-500 text-white"
                            : "text-zinc-400"
                    }`}
                >
                    Videos
                </button>

                <button
                    onClick={() => setActiveTab("about")}
                    className={`pb-3 ${
                        activeTab === "about"
                            ? "border-b-2 border-red-500 text-white"
                            : "text-zinc-400"
                    }`}
                >
                    About
                </button>

            </div>

            <div className="mt-8">

                {activeTab === "videos" && (
                    <ChannelVideos videos={videos} />
                )}

                {activeTab === "about" && (
                    <div className="space-y-4">

                        <h2 className="text-2xl font-bold">
                            About
                        </h2>

                        <div className="bg-zinc-900 rounded-xl p-6">

                            <p>
                                <strong>Name:</strong>{" "}
                                {channel.fullName}
                            </p>

                            <p className="mt-2">
                                <strong>Username:</strong>{" "}
                                @{channel.username}
                            </p>

                            <p className="mt-2">
                                <strong>Email:</strong>{" "}
                                {channel.email}
                            </p>

                            <p className="mt-2">
                                <strong>Subscribers:</strong>{" "}
                                {channel.subscribersCount}
                            </p>

                            <p className="mt-2">
                                <strong>Following:</strong>{" "}
                                {channel.subscribesToCount}
                            </p>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default ChannelTabs;