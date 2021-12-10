import { FC, useState } from "react";
import clsx from "clsx";

import { Tabs } from "components";
import { Tab } from "components/tabs/components";

import styles from "./style.module.scss";

interface Props {}

enum StatisticTabs {
  STATISTICS = "Statistics",
  USER_STATISTICS = "User Statistics",
  TRANSACTIONS = "Transactions",
}

export const ButtonTab: FC<Props> = () => {
  const [currentButton, setCurrentButton] = useState<string>(StatisticTabs.STATISTICS);

  return (
    <Tabs
      value={currentButton}
      onChange={(event, value) => {
        setCurrentButton(String(value));
      }}
      highlighterClass={styles.highlighter}
      className={styles.tabs}
    >
      {
        Object.values(StatisticTabs).map((data, index) => (
          <Tab
            value={data}
            className={clsx(
              styles.tabButton,
              currentButton === data && styles.activeTab,
            )}
            label={data}
          />
        ))
      }
    </Tabs>
  );
};
