import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getHistory,
  clearHistory,
} from "../../services/history.service";

import HistoryCard from "../../components/history/HistoryCard";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const response = await getHistory();

      setHistory(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await clearHistory();

      toast.success("History cleared");

      setHistory([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear history");
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-white">
        Loading History...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Watch History
        </h1>

        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
          >
            Clear History
          </button>
        )}

      </div>

      {history.length === 0 ? (
        <div className="text-center mt-20 text-zinc-500 text-xl">
          No watch history yet.
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((video) => (
            <HistoryCard
              key={video._id}
              video={video}
              refresh={loadHistory}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default History;