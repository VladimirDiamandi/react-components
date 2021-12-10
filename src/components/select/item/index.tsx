import { FC } from "react";

import { Option } from "../types";
import { ItemBase } from "../itemBase";
import styles from "./style.module.scss";

interface ItemProps extends Omit<Option, "label"> {
    label?: string | number
}

export const Item: FC<ItemProps> = ({ value, label }) => {
    return (
        <ItemBase value={value}>
            <div className={styles.item}>
                <span>{label ? label : value}</span>
            </div>
        </ItemBase>
    );
};
