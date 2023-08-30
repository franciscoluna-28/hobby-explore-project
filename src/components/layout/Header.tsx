/* import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { RenderLink } from "./RenderLink";
import { MdExplore } from "react-icons/md";
import { BsBookmarksFill } from "react-icons/bs";
import { ImPencil2 } from "react-icons/im";
import { BiSolidUser } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";

const menuLinks = [
  { path: "/home", icon: MdExplore, text: "Discover Activities" },
  { path: "/my-activities", icon: BsBookmarksFill, text: "Saved Activities" },
  { path: "/create-activity", icon: ImPencil2, text: "Create Activity" },
  { path: "/profile", icon: BiSolidUser, text: "My Profile" },
  { path: "/faq", icon: BsQuestionLg, text: "FAQ" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-40 md:hidden">
      <header className="bg-white h-16 w-full shadow-md flex items-center relative">
        <div className="mx-8">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isOpen ? 1.2 : 1 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleToggle}
          >
            {isOpen ? (
              <AiOutlineClose className="text-3xl" />
            ) : (
              <AiOutlineMenu className="text-3xl" />
            )}
          </motion.div>
        </div>
      </header>
      {isOpen && (
          <AnimatePresence>
        <motion.div
            className="fixed inset-0 bg-black/50 opacity-50 z-50"
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0}} onClick={handleToggle}></motion.div>
        </AnimatePresence>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="absolute m-auto left-0 right-0 top-20 shadow-xl transform bg-white rounded-xl w-64 p-4 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ul className="flex flex-col gap-2">
              {menuLinks.map((link) => (
                <li key={link.path}>
                  <RenderLink path={link.path} icon={link.icon} text={link.text} />
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
 */