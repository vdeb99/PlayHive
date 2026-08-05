import VideoRow from "./VideoRow";

function DashboardVideoTable({ videos, refresh }) {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-zinc-800">
          <tr>
            <th className="p-4">Thumbnail</th>

            <th>Title</th>

            <th>Views</th>

            <th>Status</th>

            <th>Created</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video) => (
            <VideoRow key={video._id} video={video} refresh={refresh} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardVideoTable;
