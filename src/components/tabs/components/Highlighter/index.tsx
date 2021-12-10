import React, { FC, CSSProperties } from "react";
import clsx from "clsx";

import styles from "./style.module.scss";

interface Props {
  className?: string;
  style?: CSSProperties;
}

const Highlighter: FC<Props> = ({ children, className, style }) => {
  return (
    <div style={style} className={clsx(styles.root, className)}>
      {children}
    </div>
  );
};

export default Highlighter;
