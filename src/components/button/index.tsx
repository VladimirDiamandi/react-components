import {
  forwardRef,
} from "react";
import clsx from "clsx";

import "./style.scss";
import { ButtonProps } from "./types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      ...rest
    },
    ref
  ) => {

    return (
      <button
        ref={ref}
        className={clsx("baseButton", className)}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
