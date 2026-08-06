import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


import VideoPlayer from "../../components/video/VideoPlayer";
import VideoInfo from "../../components/video/VideoInfo";
import VideoActions from "../../components/video/VideoActions";

import CommentForm from "../../components/comments/CommentForm";
import CommentList from "../../components/comments/CommentList";

import RelatedVideos from "../../components/video/RelatedVideos";

import { addToHistory } from "../../services/history.service";
import { getComments, addComment } from "../../services/comment.service";
import { getVideoById, incrementVideoView } from "../../services/video.service";

function Watch() {
  const { videoId } = useParams();
  
  const { isAuthenticated, loading } = useSelector(
  (state) => state.auth
);

useEffect(() => {
  if (!loading && !isAuthenticated) {
    navigate("/login");
  }
}, [loading, isAuthenticated, navigate]);

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");

  const hasViewed = useRef(false);

  const fetchVideo = async () => {
    try {
      const response = await getVideoById(videoId);

      const data = response.data.data;

      setVideo({
        ...data.video,
        likeCount: data.likeCount || 0,
        isLiked: data.isLiked || false,
      });

      await incrementVideoView(videoId);

      await addToHistory(videoId);
    } catch (error) {
      console.error(error);
      setError("Failed to load video.");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(videoId);

      setComments(response.data.data.comments || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (content) => {
    try {
      setCommentLoading(true);

      await addComment(videoId, content);

      await fetchComments();
    } catch (error) {
      console.error(error);
    } finally {
      setCommentLoading(false);
    }
  };

  useEffect(() => {
    hasViewed.current = false;

    const loadData = async () => {
      setLoading(true);

      if (!hasViewed.current) {
        hasViewed.current = true;
        await fetchVideo();
      }

      await fetchComments();

      setLoading(false);
    };

    loadData();
  }, [videoId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-white">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-500 text-2xl">{error}</h1>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-500 text-2xl">Video Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer video={video} />

          <div className="mt-5">
            <VideoInfo video={video} />
          </div>

          <div className="mt-4">
            <VideoActions video={video} />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Comments ({comments.length})
            </h2>

            <CommentForm onSubmit={handleComment} loading={commentLoading} />

            <div className="mt-8">
              <CommentList
                comments={comments}
                refreshComments={fetchComments}
              />
            </div>
          </div>
        </div>

        <div>
          <RelatedVideos currentVideoId={video._id} />
        </div>
      </div>
    </div>
  );
}

export default Watch;
