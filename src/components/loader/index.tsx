import React, { DetailedHTMLProps, FC } from "react";
import clsx from "clsx";

import styles from "./style.module.scss";

export interface CircularProgressProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  size?: number | string;
  circularClass?: string;
}

export const CircularProgress: FC<CircularProgressProps> = ({
  size,
  className,
  style,
  circularClass,
}) => {
  const loaderSize = size || "100%";

  const components = [] as Array<JSX.Element>;

  for (let i = 0; i < 5; i++) {
    components.push(
      <div
        key={`progress_${i}`}
        className={clsx(styles.circular, circularClass)}
      />,
    );
  }

  const sizeFix = (node: HTMLDivElement | null) => {
    if (node) {
      const { height, width } = node.getBoundingClientRect();
      let size = Math.min(height, width);

      !size ? (size = 40) : (size = size);

      node.style.width = `${size}px`;
      node.style.height = `${size}px`;
    }
  };

  return (
    <div
      style={{
        ...style,
        width: style?.width || loaderSize,
        height: style?.height || loaderSize,
      }}
      className={clsx(styles.ldsRing, className)}
      ref={sizeFix}
      // ---
    >
      {components}
    </div>
  );
};

export default CircularProgress;
