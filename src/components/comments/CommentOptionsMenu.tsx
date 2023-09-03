import { Button } from "../ui/button";
import { BiPencil, BiSolidTrashAlt } from "react-icons/bi";

interface Props {
  onDeleteComment: () => void;
  onEditComment: () => void;
}

function CommentOptionsMenu({ onDeleteComment, onEditComment }: Props) {
  return (
    <div className="bg-white absolute top-full border border-gray-300 right-0  mt-1 p-2 rounded-md shadow-md">
      <Button
        onClick={onDeleteComment} // Pass the comment ID as an argument
        className="flex bg-transparent  text-red-500 w-full text-left hover:bg-red-500 hover:text-white"
      >
        <BiSolidTrashAlt className="mr-2" />
        Delete
      </Button>
      <Button
        onClick={onEditComment}
        className="bg-transparent text-accent w-full text-left flex hover:bg-slate-200"
      >
        <BiPencil className="mr-2 text-accent" />
        Edit
      </Button>
    </div>
  );
}

export default CommentOptionsMenu;
