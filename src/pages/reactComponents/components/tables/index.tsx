import { FC, useState } from "react";
import clsx from "clsx";

import styles from "./style.module.scss";
import { tableData } from "./resources";
import { TableRow } from "./components";
import { StandardSkeleton } from "components/skeletons";
import Checkbox from "components/checkbox";

interface Props {}

export const Tables: FC<Props> = () => {
  const [skeleton, setSkeleton] = useState(false);

  return (
    <div className={styles.tablesWrapper}>
      <div className={clsx(styles.grayTable_rowWrapper, styles.rowWrapper)}>
        <div className={clsx(styles.grayTable_header, styles.table_header)}>
          <div>#</div>
          <div>From</div>
          <div>To</div>
          <div>Paid</div>
          <div>Received</div>
          <div className={styles.date}>Date</div>
        </div>
        {!skeleton ? (
          tableData.map((data) => (
            <TableRow key={data.id} data={data} className={styles.table_row} />
          ))
        ) : (
          <StandardSkeleton
            rows={5}
            columns={6}
            SkeletonBlock={({ children }) => (
              <div className={clsx(styles.grayTable_row, styles.table_row)}>
                {children}
              </div>
            )}
          />
        )}
      </div>
      <div className={styles.checkWrapper}>
      <Checkbox checked={skeleton} onChange={() => setSkeleton(!skeleton)} />
      <span>Turn on skeleton</span>
      </div>
    </div>
  );
};
