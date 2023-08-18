import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IPredefinedActivityCard } from "../../types/default-activities";
import { BiWorld } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

type Props = {
  children: React.ReactNode;
  activity: ActivityDetails;
};

type ActivityDetails = Pick<
  IPredefinedActivityCard,
  "participants" | "price" | "user" | "accessibility"
>;

// Activity Hover Card to display the rest of the information from one activity
export default function ActivityHoverCard({ children, activity }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={activity.user.profile_image.medium} />
            <AvatarFallback>Unsplash User</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">More About this Activity</h4>
            <p className="text-sm">
              Activity Photo provided by - {activity.user.name} on Unsplash
            </p>
            <div className="flex items-center pt-2">
              <ul className="flex gap-2 flex-col">
                <li className="flex gap-2 items-center">
                  <p className="text-accent text-sm">Accesibility:</p>
                  <BiWorld className="text-accent" />
                  <h5 className="text-accent text-sm">
                    {activity.accessibility}
                  </h5>
                </li>
                <li className="flex gap-2 items-center">
                  <p className="text-accent text-sm">Cost range:</p>
                  <FaMoneyBillAlt className="text-accent" />
                  <h5 className="text-accent text-sm">{activity.price}</h5>
                </li>
                <li className="flex gap-2 items-center">
                  <p className="text-accent text-sm">Participants:</p>
                  <BsFillPeopleFill className="text-accent" />
                  <h5 className="text-accent text-sm">
                    {activity.participants}
                  </h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
