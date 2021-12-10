import styles from "./style.module.scss";

export const RewardLogo = () => {
  return (
    <div className={styles.rewardLogoWrapper}>
      <div className={styles.topHr} />
      <div className={styles.titleWrapper}>
        <span>Reward Points</span>
      </div>
      <div className={styles.darkCircle}></div>
      <div className={styles.bottomHr} />
    </div>
  );
};
