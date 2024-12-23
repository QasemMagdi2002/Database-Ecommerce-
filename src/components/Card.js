import React from "react";
import classNames from "classnames";

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={classNames(
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
