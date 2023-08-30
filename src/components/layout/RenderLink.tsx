import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";



const linkVariants = cva(
  "group duration-200 w-auto md:w-full rounded-xl h-min text-normal relative hover:bg-slate-200 hover:text-accent rounded-normal flex gap-2 items-center p-2 sm:p-4",
  {
    variants: {
      isActive: {
        true: "bg-slate-200 w-min m-auto hover:bg-slate-300 rounded-xl",
        false: "",
      },
      isNew: {
        true: "text-accent",
      },
      isMobile: {
        true: "flex flex-col items-center rounded-full", // Updated the alignment to center horizontally
      },
    },
    defaultVariants: {
      isActive: false,
      isNew: false,
      isMobile: false,
    },
  }
);

type Props = {
  path: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  isNew?: boolean;
  isMobile: boolean;
};

export const RenderLink = ({ path, icon: Icon, text, isNew, isMobile }: Props) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <li className={cn(linkVariants({ isActive, isNew, isMobile }))}>
      <Link
        to={path}
        className={cn("text-accent font-normal gap-2 flex items-center", {
          [linkVariants({ isNew, isMobile })]: isNew,
        })}
      >
        <Icon
          className={cn("text-accent font-normal", {
            "group-hover:text-accent": isActive && !isMobile,
          })}
        />
        {isMobile ? (
          <div className={cn("text-accent hidden font-normal")}>{text}</div>
        ) : (
          <>
            <span>{text}</span>
            {isNew && <Badge variant="destructive">New</Badge>}
          </>
        )}
      </Link>
    </li>
  );
};
