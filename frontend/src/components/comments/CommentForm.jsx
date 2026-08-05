import { useState } from "react";

function CommentForm({ onSubmit, loading }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    onSubmit(content);

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mt-8">
      <input
        type="text"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 bg-zinc-800 rounded-lg px-4 py-3 outline-none"
      />

      <button
        disabled={loading}
        className="bg-red-600 px-6 rounded-lg hover:bg-red-700 transition"
      >
        {loading ? "Posting..." : "Comment"}
      </button>
    </form>
  );
}

export default CommentForm;
