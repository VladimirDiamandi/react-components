import { FC, Children, ReactElement, cloneElement, useContext } from "react";

import { Option } from "../types";
import { SelectContext } from "..";

export interface ItemBaseProps {
    value: Option["value"];
}

export const ItemBase: FC<ItemBaseProps> = ({ children, value }) => {
    const { setValue } = useContext(SelectContext);

    return Children.only(
        cloneElement(children as ReactElement<any>, {
            onClick: () => setValue(value),
        })
    );
};
