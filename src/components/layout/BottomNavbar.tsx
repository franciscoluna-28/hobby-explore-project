import { RenderLink } from './RenderLink'; // Replace with the correct path to your RenderLink component
import { MdExplore } from 'react-icons/md';
import { BsBookmarksFill } from 'react-icons/bs';
import { ImPencil2 } from 'react-icons/im';
import { BiSolidUser } from 'react-icons/bi';
import { BsQuestionLg } from 'react-icons/bs';

const BottomNavbar = ({ uid }: { uid: string }) => {
    const menuLinks = [
        { path: "/home", icon: MdExplore, text: 'Discover' },
        { path: `/saved-activities/${uid}`, icon: BsBookmarksFill, text: 'Activities' },
        { path: "/create-activity", icon: ImPencil2, text: 'Create' },
        { path: `/profile/${uid}`, icon: BiSolidUser, text: 'My Profile' },
        { path: "/faq", icon: BsQuestionLg, text: 'FAQ' },
    ];

    return (
        <div className="fixed md:hidden bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-slate-300 dark:bg-gray-700 dark:border-gray-600">
            <ul className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium m-auto items-center">
                {menuLinks.map((link, index) => (
                    <RenderLink
                        key={index}
                        path={link.path}
                        icon={link.icon}
                        text={link.text}
                        isMobile={true}
                    />
                ))}
            </ul>
        </div>
    );
};

export default BottomNavbar;

