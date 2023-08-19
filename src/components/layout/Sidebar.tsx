import { MdExplore } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import { ImPencil2 } from "react-icons/im";
import { RenderLink } from "./RenderLink";
import Logo from "../../assets/logo.png";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

// Sidebar page of Hobby Explore
export default function Sidebar() {
  return (
    <div className="sticky max-h-3 z-50 top-0">
      <aside className="bg-white shadow-normal min-h-screen w-full px-8 py-8 border-r-2 max-w-xs">
        <AspectRatio className="h-min" ratio={16 / 9}>
          <img className="" src={Logo}></img>
        </AspectRatio>
        <hr className="py-3"></hr>
        <h5 className="text-accent font-bold text-normal">Activities</h5>
        <ul className="py-2 flex flex-col gap-2">
          <RenderLink
            path="/home"
            icon={MdExplore}
            text="Discover Activities"
          />
          <RenderLink
            path="/my-activities"
            icon={BsBookmarksFill}
            text="Saved-Activities"
          />
          <RenderLink
            path="/create-activity"
            icon={ImPencil2}
            text="Create Activity"
          />
        </ul>
        <hr></hr>
        <h5 className="text-accent mt-3 font-bold text-normal">Me</h5>
        <ul className="py-2 flex flex-col gap-2">
          <RenderLink path="/profile" icon={BiSolidUser} text="My Profile" />
        </ul>
        <hr></hr>
        <h5 className="text-accent mt-3 font-bold text-normal">More</h5>
        <ul className="py-2">
          <RenderLink path="/faq" icon={BsQuestionLg} text="FAQ" />
        </ul>
        <hr></hr>
      </aside>
    </div>
  );
}
