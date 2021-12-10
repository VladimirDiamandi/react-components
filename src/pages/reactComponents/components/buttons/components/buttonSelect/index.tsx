import { FC } from "react";
import clsx from "clsx";

import { Select } from "components/select";

import styles from "./style.module.scss";
import { ItemBase } from "components/select/itemBase";

interface Props {
  selectData: Array<string | number>;
  value: string | number;
  changeValue: (value: string | number) => void;
  className?: string;
}


export const ButtonSelect: FC<Props> = ({ selectData, className, value, changeValue }) => {
  return (
    <Select
      onChange={changeValue}
      value={value}
      className={clsx(styles.select, className)}
      classes={{
        arrow: styles.arrow,
        options: styles.selectOptions,
      }}
      frontComponent={
        <div className={styles.selectFront}>
          <span className={styles.selectFrontLabel}>{value}</span>
        </div>
      }
    >
      {
        selectData.map((data) => (
          <ItemBase value={data}>
            <div className={clsx(styles.item, {
                [styles.itemDisabled]: data === value
            })}>
                <span>{data}</span>
            </div>
        </ItemBase>
        ))
      }
    </Select>
  );
};
