import React, { useContext, forwardRef } from "react";
import clsx from "clsx";

import { TabContext } from "components";
import { ButtonProps } from "components/button/types";
import { Button } from "components";

import styles from "./style.module.scss";

export interface Props extends ButtonProps {
  value?: number | string;
  label?: string;
}

export const Tab = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, value, label, ...props }, ref) => {
    const { tabOnChange, value: selectedTab } = useContext(TabContext);

    return (
      <Button
        {...props}
        ref={ref}
        disabled={selectedTab === value}
        className={clsx(styles.tab, className)}
        onClick={(event) => {
          if (value !== undefined) {
            tabOnChange(event as any, value);
          }
        }}>
        {label ? label : children}
      </Button>
    );
  },
);

export default Tab;
