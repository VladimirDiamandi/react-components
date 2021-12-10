import { FC, useState } from "react";

import { Button, PopUpRoot } from "components";

import styles from "./style.module.scss";
import { ButtonSelect, ButtonTab } from "./components";
import { RewardMenu } from "./components/rewardMenu";

interface Props {}

const testData = ["first value", "second value", "third value"];

export const Buttons: FC<Props> = () => {
  const [selectValue, setSelectValue] = useState<string | number>(testData[0]);
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className={styles.buttonsWrapper}>
      <div>
        <span className={styles.title}>Open popup menu</span>
        <Button onClick={() => setOpenPopup(true)} className={styles.purpleButton}>Click me</Button>
      </div>
      <div className={styles.tabsWrapper}>
        <span className={styles.title}>Tabs button</span>
        <ButtonTab />
      </div>
      <div>
        <span className={styles.title}>Select</span>
        <ButtonSelect
          value={selectValue}
          changeValue={setSelectValue}
          selectData={testData}
        />
      </div>
      {openPopup && (
        <PopUpRoot curtainOnClick={() => setOpenPopup(false)} background="dark">
          <RewardMenu closeMenu={() => setOpenPopup(false)} value={10} />
        </PopUpRoot>
      )}
    </div>
  );
};
