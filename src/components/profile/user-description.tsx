  import { useState } from "react";
  import { BiPencil } from "react-icons/bi";
  import {
    useGetUserDescription,
    useUpdateUserDescription,
  } from "../../features/user-actions/api/use-user-description";
  import withEditMode, { WithEditModeProps } from "../HOC/WithEditMode";
import { queryClient } from "../../lib/query-client-instance";
import { Textarea } from "../ui/textarea";


  interface UserDescriptionProps {
    uid: string;
  }

  function UserDescription({
    uid,
    isEditMode,
    toggleEditMode,
  }: UserDescriptionProps & WithEditModeProps) {
    const { data: userDescription } = useGetUserDescription(uid);
    const updateUserDescriptionMutation = useUpdateUserDescription();
    const [descriptionText, setDescriptionText] = useState<string>(
      userDescription || ""
    );

    const handleUpdateDescription = async () => {
      try {
        await updateUserDescriptionMutation.mutateAsync({
          uid,
          newText: descriptionText,
        });
         queryClient.invalidateQueries(["userDescription", uid]); // Invalidate the cached query
        toggleEditMode(); // Exit edit mode after updating
      } catch (error) {
        console.error("Error updating description:", error);
        // Handle error here
      }
    };

    return (
      <section className="flex flex-col items-center w-full mt-2 rounded-xl p-4 m-auto text-accent/80 leading-normal">
        {isEditMode ? (
          <>
           <Textarea className="flex flex-wrap m-auto w-full"
              value={descriptionText}
              placeholder="Tell us about you!"
              onChange={(e) => setDescriptionText(e.target.value)}
            />
            <div className="flex gap-4 mt-2 ">
              <button
                className="bg-main p-2 rounded-xl text-white font-bold hover:brightness-75"
                onClick={handleUpdateDescription}
              >
                Save
              </button>
              <button
                className="bg-transparent p-2 rounded-xl text-main font-normal border-2 border-main hover:brightness-75"
                onClick={() => {
                  setDescriptionText(userDescription || ""); // Reset the description
                  toggleEditMode();
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full items-center gap-2 border-none">
          <Textarea className="flex gap-2 items-center justify-center m-auto flex-wrap resize-none" readOnly={true}             value={userDescription || "No description yet."}>
          </Textarea>
            <button
              className="flex items-center gap-2 text-accent text-sm"
              onClick={toggleEditMode}
            >
              <span className="sr-only">Edit Description</span>
              <BiPencil />
              Edit
            </button>
            </div>
        )}
      </section>
    );
  }

  export default withEditMode(UserDescription);
