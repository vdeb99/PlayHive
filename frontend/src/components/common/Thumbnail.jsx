function Thumbnail({ src, alt, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`w-full aspect-video overflow-hidden rounded-xl bg-zinc-900 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition duration-300 hover:scale-105"
      />
    </div>
  );
}

export default Thumbnail;
