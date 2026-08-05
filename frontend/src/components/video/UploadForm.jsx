import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../../services/video.service";

function UploadForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !thumbnail || !videoFile) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("videoFile", videoFile);

    try {
      setLoading(true);

      const response = await uploadVideo(formData);

      console.log(response.data);

      alert("Video uploaded successfully!");

      navigate("/");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 rounded-xl p-8 space-y-5"
    >
      <h1 className="text-3xl font-bold">Upload Video</h1>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-3 rounded bg-zinc-800"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full p-3 rounded bg-zinc-800"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <label className="block mb-2">Thumbnail</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
      </div>

      <div>
        <label className="block mb-2">Video</label>

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
      </div>

      <button disabled={loading} className="bg-red-600 px-6 py-3 rounded-lg">
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
}

export default UploadForm;
