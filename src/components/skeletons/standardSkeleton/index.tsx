import React from "react";
import clsx from "clsx";

import styles from "./style.module.scss";
import CircularProgress from "components/loader";

interface StandardSkeletonProps {
  columns: number;
  rows: number;
  classes?: {
    wrapper: string;
  };
  SkeletonBlock: React.FC;
  SkeletonHeader?: React.FC;
}

export const StandardSkeleton: React.FC<StandardSkeletonProps> = ({
  columns,
  rows,
  classes,
  SkeletonBlock,
  SkeletonHeader,
}) => {
  const getColumns = (className: string) => {
    const columnsElement: JSX.Element[] = [];
    for (let i = 0; i < columns; i++) {
      columnsElement.push(<span key={i} className={className} />);
    }
    return columnsElement;
  };

  const getRows = () => {
    const rowsArray: JSX.Element[] = [];
    for (let i = 0; i < rows; i++) {
      rowsArray.push(
        <SkeletonBlock key={i}>
          {getColumns(styles.skeletonColumn)}
        </SkeletonBlock>,
      );
    }
    return rowsArray;
  };

  return (
    <div
      className={clsx(
        styles.skeletonWrapper,
        classes?.wrapper,
      )}>
      {SkeletonHeader && (
        <SkeletonHeader>{getColumns(styles.skeletonHeader)}</SkeletonHeader>
      )}
      {getRows()}
      <CircularProgress
        circularClass={styles.circular}
        size={86}
        className={styles.loader}
      />
    </div>
  );
};
