import React from "react";
import { MdOutlineDownloadDone } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import LoadingSpinner from "../ui/loading-spinner";

type SaveActivityButtonProps = {
  isSaved: boolean | undefined;
  isSaving: boolean;
  handleSave: () => void;
};

const SaveActivityButton: React.FC<SaveActivityButtonProps> = ({
  isSaved,
  isSaving,
  handleSave,
}) => {
  return (
    <button
      onClick={handleSave}
      disabled={isSaved || isSaving}
      className="hover:brightness-90 shadow-xl bg-white  
      absolute z-0 left-4 top-0 duration-200 text-white 
      font-semibold disabled:brightness-75 px-4 my-4 py-2 
      text-lg w-16 h-16 rounded-full md:w-20 md:h-20"
    >
      {isSaving ? (
        <LoadingSpinner size="xl" className="m-auto" />
      ) : isSaved ? (
        <>
          <MdOutlineDownloadDone className="text-main text-3xl m-auto" />
          <span className="sr-only">Activity Saved</span>
        </>
      ) : (
        <>
          <FaBookmark className="text-main relative text-2xl m-auto" />
          <span className="sr-only">Save Activity</span>
        </>
      )}
    </button>
  );
};

export default SaveActivityButton;
