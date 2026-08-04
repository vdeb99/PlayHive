import { Video, Eye, Heart, MessageCircle } from "lucide-react";

function DashboardStats({ stats }) {
  const cards = [
    {
      title: "Videos",
      value: stats.totalVideos,
      icon: <Video size={28} />,
    },

    {
      title: "Views",
      value: stats.totalViews,
      icon: <Eye size={28} />,
    },

    {
      title: "Likes",
      value: stats.totalLikes,
      icon: <Heart size={28} />,
    },

    {
      title: "Comments",
      value: stats.totalComments,
      icon: <MessageCircle size={28} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-zinc-900 rounded-xl p-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-4xl font-bold">{card.value}</h2>

              <p className="mt-3 text-zinc-400">{card.title}</p>
            </div>

            <div className="text-red-500">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
