import React from "react";
import { cn } from "@shadcn/ui/utils";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
