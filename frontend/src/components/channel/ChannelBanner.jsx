function ChannelBanner({ coverImage }) {
  return (
    <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-zinc-800">
      <img
        src={
          coverImage ||
          "https://via.placeholder.com/1500x400?text=No+Cover+Image"
        }
        alt="Channel Cover"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default ChannelBanner;
