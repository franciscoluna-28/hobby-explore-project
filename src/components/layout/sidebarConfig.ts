import { BiSolidUser } from "react-icons/bi";
import { BsBookmarkFill, BsQuestionLg } from "react-icons/bs";
import { MdExplore } from "react-icons/md";

export const sidebarConfig = [
    {
      sectionTitle: "Activities",
      links: [
        {
          icon: MdExplore,
          text: "Find Activities",
          to: "/home",
        },
        {
          icon: BsBookmarkFill,
          text: "Saved Activities",
          to: "/saved-activities",
        },
      ],
    },
    {
      sectionTitle: "Me",
      links: [
        {
          icon: BiSolidUser,
          text: "My Profile",
          to: "/profile",
        },
      ],
    },
    {
      sectionTitle: "More",
      links: [
        {
          icon: BsQuestionLg,
          text: "FAQ",
          to: "/faq",
        },
      ],
    },
  ];
  