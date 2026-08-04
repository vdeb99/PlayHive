import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function VideoCardSkeleton() {
  return (
    <div className="space-y-3">

      <Skeleton height={180} />

      <Skeleton height={25} />

      <Skeleton width="70%" />

    </div>
  );
}

export default VideoCardSkeleton;