import { axios } from "../../axios";
import { useMutation, useQuery } from "@tanstack/react-query";

// TODO SPLIT THIS INTO MULTIPLE FUNCTIONS
const QUERY_KEY = "comment";

// Adds a new comment to an activity
async function addNewComment(data: {
  uid: string;
  activityId: string;
  commentText: string;
}): Promise<any> {
  const { uid, activityId, commentText } = data;
  const { data: newComment } = await axios.post(
    `${QUERY_KEY}/add-comment-in-activity`,
    {
      uid,
      activityId,
      commentText,
    }
  );
  return newComment;
}

// Gets all comments from an activity
async function getAllCommentsFromActivity(activityId: string): Promise<any[]> {
  const { data: comments } = await axios.get(
    `${QUERY_KEY}/get-comments-from-activity/${activityId}`
  );
  return comments;
}

// Removes a comment from an activity
async function removeCommentFromActivity(data: {
  uid: string;
  commentId: string;
}): Promise<void> {
  const { uid, commentId } = data;
  await axios.delete(
    `${QUERY_KEY}/remove-comment-from-activity/${uid}/${commentId}`
  );
}

// Edits a comment in an activity
async function editComment(data: {
  uid: string;
  commentId: string;
  newCommentText: string;
}): Promise<any> {
  const { uid, commentId, newCommentText: newText } = data;
  const { data: editedComment } = await axios.post(
    `${QUERY_KEY}/edit-comment-from-activity/${uid}/${commentId}`,
    {
      newText,
    }
  );
  return editedComment;
}

export function useAddNewComment() {
  return useMutation(
    (data: { uid: string; activityId: string; commentText: string }) =>
      addNewComment(data)
  );
}

export function useGetAllCommentsFromActivity(activityId: string) {
  return useQuery(["commentsFromActivity", activityId], () =>
    getAllCommentsFromActivity(activityId)
  );
}

export function useRemoveCommentFromActivity() {
  return useMutation(
    (data: { uid: string; commentId: string }) =>
      removeCommentFromActivity(data)
  );
}

export function useEditComment() {
  return useMutation(
    (data: {
      uid: string;
      commentId: string;
      newCommentText: string;
    }) => editComment(data)
  );
}
