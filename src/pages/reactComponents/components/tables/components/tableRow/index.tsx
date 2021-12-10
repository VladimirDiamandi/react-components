import { FC } from "react";
import clsx from "clsx";

import styles from "./style.module.scss";
import { TableRowType } from "../../resources";

interface Props {
  className: string;
  data: TableRowType;
}

export const TableRow: FC<Props> = ({ className, data }) => {
  return (
    <div className={clsx(styles.grayTable_row, className)}>
      <div>{data.id}</div>
      <div>{data.from}</div>
      <div>{data.to}</div>
      <div>{data.paid}</div>
      <div>{data.received}</div>
      <div className={styles.date}>{data.date}</div>
    </div>
  );
};
