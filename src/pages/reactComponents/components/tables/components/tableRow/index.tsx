import { FC } from "react";
import clsx from "clsx";

import styles from "./style.module.scss";
import { TableRowType } from "../../resources";

interface Props {
  className: string;
  data: TableRowType;
  loading: boolean;
}

export const TableRow: FC<Props> = ({ className, data, loading }) => {
  return (
    <tr className={clsx(styles.grayTable_row, styles.rowWrapper, className)}>
      <td>{!loading ? data.id : <div />}</td>
      <td>{!loading ? data.from : <div />}</td>
      <td>{!loading ? data.to : <div />}</td>
      <td>{!loading ? data.paid : <div />}</td>
      <td>{!loading ? data.received : <div />}</td>
      <td className={styles.date}>{!loading ? data.date: <div />}</td>
    </tr>
  );
};
