import React from "react";
import clsx from 'clsx';

import { Button } from "components";
import { CloseIcon, RewardIcon } from "icons";
import styles from "./style.module.scss";
import { RewardLogo } from "./components";

interface RewardMenuProps {
  closeMenu: () => void;
  value: number;
}

export const RewardMenu: React.FC<RewardMenuProps> = ({ closeMenu, value }) => {

  return (
    <div className={styles.rewardMenuWrapper}>
      <RewardLogo />
      <div className={styles.rewardInfoWrapper}>
        <div className={styles.closeButtonWrapper}>
          <Button onClick={closeMenu} className={styles.closeButton}>
            <CloseIcon />
          </Button>
        </div>
        <RewardIcon className={styles.rewardIcon} />
        <div className={styles.title}>{value} Reward Points</div>
        <div className={styles.description}>
          As an appreciation for your activity at FaucetPay, we have added 1
          Reward Points to your account. You'll continue to receive +1 as bonus
          for your login streak each day until you hit a maximum of 100 Reward
          Points. If you break your streak, you'll be back to square one.
        </div>
        <Button
          onClick={closeMenu}
          className={clsx(styles.purpleButton, styles.likeButton)}
        >
          I like it
        </Button>
      </div>
    </div>
  );
};
