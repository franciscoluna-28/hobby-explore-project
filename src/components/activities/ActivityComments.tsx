import { useGetAllCommentsFromActivity } from "../../features/comments/api/use-activity-comments"
import { auth } from "../../firebase"
import { Comment } from "../../types/comments"
import ActivityCommentWithEditMode from "../comments/ActivityComment"


interface ActivityCommentsProps {
  activityId: string;
}

export default function ActivityComments({
  activityId,
}: ActivityCommentsProps) {
  const {
    data: comments,
    error,
    isLoading,
    status,
  } = useGetAllCommentsFromActivity(activityId);



  console.log(comments);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (error && status === "error") {
    return <p>Error loading comments!</p>;
  }



  return (
    <>
      <h2 className="text-2xl mt-8 text-accent">Comments</h2>
      <section className="mt-4">

        {comments?.length === 0 ? "There are no comments yet." : null}
        {comments!.map((comment: Comment) => (
          
          <ActivityCommentWithEditMode {...comment} currentUserUID={auth.currentUser?.uid!}/>
        ))}
      </section>
    </>
  );
}
