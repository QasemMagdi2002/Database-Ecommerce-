import React from "react";
import classNames from "classnames";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
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
