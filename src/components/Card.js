import React from "react";
import { cn } from "@shadcn/ui/utils";

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "border rounded p-4 shadow-md bg-white hover:shadow-lg transition",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
