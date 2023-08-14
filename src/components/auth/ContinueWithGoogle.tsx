import { Button } from "../ui/button";

interface ContinueWithGoogleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  continueWithGoogle: () => void;
}


export default function ContinueWithGoogle({
  disabled,
  continueWithGoogle, // Add this prop
}: ContinueWithGoogleProps) {
  return (
    <Button
      onClick={continueWithGoogle} // Call the continueWithGoogle function on click
      className={`bg-white ${
        disabled
          ? "disabled:brightness-7 bg-red-500  disabled:border-0 disabled:hover:!border-transparent"
          : "hover:brightness-95"
      } mt-4 text-slate-500 hover:shadow-black shadow-transparent hover:border-accent/20 font-normal hover:bg-white w-full flex duration-200 items-center justify-center gap-2  border-2 border-gray-100 p-4 rounded-xl`}
    >
      <img
        className="h-4 w-4"
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327"
        }
        alt="Google logo"
        width={16} // px width
        height={16} // px height
      />{" "}
      Continue with Google
    </Button>
  );
}

