import CommentCard from "./CommentCard";

function CommentList({ comments, refreshComments }) {
  if (!comments.length) {
    return <h2 className="text-zinc-500 mt-6">No comments yet.</h2>;
  }

  return (
    <div className="mt-8">
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          refreshComments={refreshComments}
        />
      ))}
    </div>
  );
}

export default CommentList;
