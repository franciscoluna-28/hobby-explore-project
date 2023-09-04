import { Button } from "../ui/button";
import { Comment } from "../../types/comments";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import withEditMode from "../HOC/WithEditMode";
import { Textarea } from "../ui/textarea";
import { getTimeAgo } from "../../lib/getTimeAgo";
import { BsThreeDots } from "react-icons/bs";
import { auth } from "../../firebase";
import { useActivityCommentActions } from "../../hooks/useCommentsActions";
import CommentOptionsMenu from "./CommentOptionsMenu";

interface Props extends Comment {
  currentUserUID: string;
  isEditMode: boolean; // Agregamos la prop isEditMode
  toggleEditMode: () => void; // Agregamos la prop toggleEditMode
}

function ActivityComment({
  userUid: userCommentUID,
  currentUserUID,
  _id,
  userName,
  activityId,
  userPfp,
  createdAt,
  isContentModified,
  text,
}: Props) {
  const {
    isDialogOpen,
    localText,
    isEditMode,
    handleDialog,
    handleDeleteComment,
    handleEditComment,
    handleCancelEdit,
    toggleEditMode,
    setLocalText,
  } = useActivityCommentActions(currentUserUID, activityId);

  return (
    <article>
      <div className="flex gap-4">
        <Avatar className="bg-red-500">
          <AvatarImage src={userPfp} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <div key={_id} className="border border-gray-300 p-3 mb-4 rounded-md">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{userName}</p>

            {userCommentUID === auth.currentUser?.uid ? (
              <button
                className="ml-auto relative"
                onClick={handleDialog}
                aria-label="Open menu"
              >
                <BsThreeDots />
                {isDialogOpen && (
                  <CommentOptionsMenu
                    onDeleteComment={() => handleDeleteComment(_id)}
                    onEditComment={toggleEditMode}
                  ></CommentOptionsMenu>
                )}
              </button>
            ) : null}
          </div>
          <span className="flex flex-col text-slate-500 text-sm">
            {getTimeAgo(createdAt)}
          </span>
          {isEditMode ? (
            <>
              <Textarea
                className="mt-2"
                value={localText}
                onChange={(e) => setLocalText(e.target.value)}
              />
              <div className="flex gap-2 mt-4">
                <Button onClick={() => handleEditComment(_id, localText)}>
                  Save
                </Button>
                <Button
                  className="bg-transparent text-accent"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <p className="flex">
              {text}
              <span className="block text-slate-500 ml-1 text-sm m-auto">
                {isContentModified ? "(Edited)" : null}
              </span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

const ActivityCommentWithEditMode = withEditMode(ActivityComment);

export default ActivityCommentWithEditMode;
