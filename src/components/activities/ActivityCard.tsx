import { IPredefinedActivityCard } from "../../types/default-activities";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useActivityActions } from "../../hooks/useActivityActions";
import { Button } from "../ui/button";
import { FaLightbulb } from "react-icons/fa";
import SaveActivityButton from "./SaveActivityButton";

import { Link } from "react-router-dom";
import ActivityHoverCard from "./ActivityHoverCard";
import RatingOnlyVisible from "../ratings/RatingOnlyVisible";



export default function ActivityCard(props: IPredefinedActivityCard) {
  const { name, type, urls, _id, reviews, averageRating } = props;

  const { isSaved, saveActivity } = useActivityActions(props._id);
  const [isSaving, setIsSaving] = useState(false);
  

  const handleSaveActivity = async () => {
    setIsSaving(true);
    console.log(_id)
    try {
      await saveActivity(props._id);
    } catch (error) {
      console.error("Error saving activity:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <article className="rounded-xl overflow-hidden relative w-full shadow-lg hover:shadow-xl duration-200 md:max-w-xs lg:max-w-md">
 <Link
        to={`/activities/${_id}`}
        className="w-min min-w-fit rounded-xl duration-200 underline underline-offset-2 text-sm flex items-center gap-2 group"
      >
        {/* Container for image and text */}
        <div className="relative">
          {/* Darkened image */}
          <img
            className="overflow-hidden rounded-t-xl shadow-xl duration-200 z-20 group-hover:brightness-90"
            loading="lazy"
            src={urls.regular}
            alt="Activity"
          />
          {/* Hover text */}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-60 rounded-lg py-1 px-2 text-xs opacity-0 group-hover:opacity-100 duration-200">
            Learn more
          </span>
        </div>
      </Link>

      <SaveActivityButton
        isSaved={isSaved}
        isSaving={isSaving}
        handleSave={handleSaveActivity}
      />
      <div className="bg-white h-min p-6 overflow-hidden border-b-2 border-l-2 rounded-b-xl border-r-2 border-2 border-t-0">
        <h3 className="font-bold text-start text-2xl text-accent leading-relaxed">
          {name}
        </h3>
        <div className="flex gap-2 items-center">
          <div className="w-auto">
            <div className="flex items-center gap-2">
              <span className="block text-accent"></span>
            </div>
            <RatingOnlyVisible averageRating={averageRating} totalRatings={reviews}/>
            <h5 className="text-start text-accent text-sm my-2 font-normal">
              Category:
            </h5>

            <Badge variant="secondary" className="h-10 mt-2  w-auto rounded-xl">
              <span className="first-letter:uppercase">{type}</span>
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
        </div>
        <div className="mt-4"></div>

        <ActivityHoverCard activity={props}>
          <Button className="bg-transparent  hover:bg-slate-100 text-accent/70 mt-4 flex items-center gap-2">
            <FaLightbulb className="text-accent"></FaLightbulb>
            Hover to see more
          </Button>
        </ActivityHoverCard>
      </div>
    </article>
  );
}
