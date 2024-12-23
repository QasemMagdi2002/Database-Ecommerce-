import React from "react";
import { cn } from "@shadcn/ui/utils";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
};

export default Input;
