import React, { useState } from "react";
import { Button } from "../ui/button";
import { BiPencil, BiSolidTrashAlt } from "react-icons/bi";
import { useRemoveCommentFromActivity } from "../../features/comments/api/use-activity-comments";
import { queryClient } from "../../lib/query-client-instance";
import { Comment } from "../../types/comments";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import withEditMode from "../HOC/WithEditMode";
import { useEditComment } from "../../features/comments/api/use-activity-comments";
import { Textarea } from "../ui/textarea";
import { getTimeAgo } from "../../lib/getTimeAgo";
import { BsThreeDots } from "react-icons/bs";
import { auth } from "../../firebase";

// TODO: REFACTOR THE LOGIC INTO A HOOK AND CREATE AN ISOLATED FORM CARD HERE
interface Props extends Comment {
  currentUserUID: string;
  isEditMode: boolean; // Agregamos la prop isEditMode
  toggleEditMode: () => void; // Agregamos la prop toggleEditMode
}

function ActivityComment({
  userUid: userCommentUID,
  currentUserUID,
  text,
  _id,
  userName,
  activityId,
  userPfp,
  createdAt,
  isContentModified,
  isEditMode, // Agregamos la prop isEditMode
  toggleEditMode, // Agregamos la prop toggleEditMode
}: Props) {
  const deleteCommentMutation = useRemoveCommentFromActivity();
  const editCommentMutation = useEditComment();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [localText, setLocalText] = React.useState(text); // Estado local para la edición

  const handleDialog = () => {
    setIsDialogOpen((isDialogOpen) => !isDialogOpen);
  };

  const handleDeleteComment = async (commentId: string, uid: string) => {
    try {
      await deleteCommentMutation.mutateAsync({ uid, commentId });
      queryClient.invalidateQueries(["commentsFromActivity", activityId]);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (
    commentId: string,
    newCommentText: string
  ) => {
    try {
      console.log(newCommentText);

      await editCommentMutation.mutateAsync({
        uid: currentUserUID,
        commentId,
        newCommentText,
      });

      toggleEditMode(); // Salir del modo de edición
      queryClient.invalidateQueries(["commentsFromActivity", activityId]);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleCancelEdit = () => {
    setLocalText(text); // Regresar al texto original
    toggleEditMode(); // Salir del modo de edición
  };

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
                  <div className="bg-white absolute top-full border border-gray-300 right-0  mt-1 p-2 rounded-md shadow-md">
                    <Button
                      onClick={() => handleDeleteComment(_id, currentUserUID)}
                      className="flex bg-transparent text-red-500 w-full text-left hover:bg-transparent"
                    >
                      <BiSolidTrashAlt className="mr-2" />
                      Delete
                    </Button>
                    <Button
                      onClick={toggleEditMode}
                      className="bg-transparent text-accent w-full text-left flex hover:bg-slate-200"
                    >
                      <BiPencil className="mr-2 text-accent" />
                      Edit
                    </Button>
                  </div>
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
            <p className="flex ">
              {localText}{" "}
              <span className="block text-slate-500 ml-1 text-sm m-auto">
                {isContentModified ? "(Edited)" : null}
              </span>
            </p>
          )}
          {currentUserUID === userCommentUID ? (
            <>
              {/*  <Button
                  onClick={() => handleDeleteComment(_id, currentUserUID)}
                  className=" text-slate-500 duration-200 bg-slate-200 rounded-full hover:bg-slate-200"
                >Delete
                </Button>
                <Button
                  className="bg-white duration-200 rounded-full"
                  onClick={toggleEditMode}
                >
                </Button> */}
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}

const ActivityCommentWithEditMode = withEditMode(ActivityComment);

export default ActivityCommentWithEditMode;
