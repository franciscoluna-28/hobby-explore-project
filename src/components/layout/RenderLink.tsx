import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

const linkVariants = cva(
  "group duration-200 rounded-xl h-min w-auto text-sm relative hover:bg-slate-200 hover:text-accent rounded-normal flex gap-2 items-center p-3",
  {
    variants: {
      isActive: {
        true: "bg-slate-200 hover:bg-slate-300",
        false: "hover:bg-slate-200",
      },
      isNew: {
        true: "text-accent",
      },
    },
    defaultVariants: {
      isActive: false,
      isNew: false,
    },
  }
);

type Props = {
  path: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  isNew?: boolean;
};

export const RenderLink = ({ path, icon: Icon, text, isNew }: Props) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <li className={cn(linkVariants({ isActive, isNew }))}>
      <Icon
        className={cn("text-accent font-normal", {
          "group-hover:text-accent": isActive,
        })}
      />
      <Link
        to={path}
        className={cn("text-accent font-normal", {
          [linkVariants({ isNew })]: isNew,
        })}
      >
        {text}
        {isNew && <Badge variant="destructive">New</Badge>}
      </Link>
    </li>
  );
};
