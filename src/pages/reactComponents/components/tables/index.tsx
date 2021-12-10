import { FC, useState } from "react";
import clsx from "clsx";

import styles from "./style.module.scss";
import { tableData } from "./resources";
import { TableRow } from "./components";
import Checkbox from "components/checkbox";

interface Props {}

export const Tables: FC<Props> = () => {
  const [skeleton, setSkeleton] = useState(false);

  return (
    <div className={styles.tablesWrapper}>
      <table className={clsx(styles.grayTable_rowWrapper, styles.rowWrapper)}>
        <thead>
          <tr className={clsx(styles.grayTable_header, styles.table_header)}>
            <th>#</th>
            <th>From</th>
            <th>To</th>
            <th>Paid</th>
            <th>Received</th>
            <th className={styles.date}>Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <TableRow
              key={data.id}
              data={data}
              className={styles.table_row}
              loading={skeleton}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.checkWrapper}>
        <Checkbox checked={skeleton} onChange={() => setSkeleton(!skeleton)} />
        <span>Turn on skeleton</span>
      </div>
    </div>
  );
};
