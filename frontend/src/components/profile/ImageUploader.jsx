import toast from "react-hot-toast";

function ImageUploader({ label, onChange }) {
  return (
    <label className="cursor-pointer">
      <div className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition">
        📷 {label}
      </div>

      <input hidden type="file" accept="image/*" onChange={onChange} />
    </label>
  );
}

export default ImageUploader;
