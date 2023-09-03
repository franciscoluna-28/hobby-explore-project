// useActivityCommentActions.ts
import { useState } from 'react';
import { useRemoveCommentFromActivity } from '../features/comments/api/use-activity-comments';
import { useEditComment } from '../features/comments/api/use-activity-comments';
import { queryClient } from '../lib/query-client-instance';

export const useActivityCommentActions = (currentUserUID: string, activityId: string) => {
  const deleteCommentMutation = useRemoveCommentFromActivity();
  const editCommentMutation = useEditComment();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [localText, setLocalText] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteCommentMutation.mutateAsync({ uid: currentUserUID, commentId });
      queryClient.invalidateQueries(['commentsFromActivity', activityId]);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = async (commentId: string, newCommentText: string) => {
    try {
      await editCommentMutation.mutateAsync({
        uid: currentUserUID,
        commentId,
        newCommentText,
      });

      toggleEditMode();
      queryClient.invalidateQueries(['commentsFromActivity', activityId]);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleCancelEdit = () => {
    setLocalText('');
    toggleEditMode();
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return {
    isDialogOpen,
    localText,
    isEditMode,
    handleDialog,
    handleDeleteComment,
    handleEditComment,
    handleCancelEdit,
    toggleEditMode,
    setLocalText,
  };
};
