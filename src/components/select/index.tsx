import { FC, createContext, useState, useRef } from "react";
import clsx from "clsx";

import { ExpandMoreIcon } from "icons";
import { PopUpRoot } from "components";

import styles from "./style.module.scss";
import { Option } from "./types";

export const SelectContext = createContext<{
    setValue: (value: Option["value"]) => void;
    value: Option["value"];
}>({
    setValue: () => {},
    value: "",
});

export interface SelectClasses {
    label: string;
    arrow: string;
    root: string;
    options: string;
}

export interface SelectProps {
    onChange: (value: Option["value"]) => void;
    value: Option["value"];
    frontComponent?: JSX.Element;
    className?: string;
    classes?: Partial<SelectClasses>;
}

interface SelectPosition {
    left: number;
    top: number;
    selectHeight: number;
    selectWidth: number;
}

const correctOptionsPosition = (
    optionsContainer: HTMLElement,
    selectPosition: SelectPosition
) => {
    const offsetTop = selectPosition.top + selectPosition.selectHeight;

    const containerHeight = optionsContainer.offsetHeight;
    const availableSpace = window.innerHeight - offsetTop;
    let correctedOffset = offsetTop;
    if (availableSpace < containerHeight) {
        correctedOffset -= containerHeight - availableSpace + 10;
    }

    optionsContainer.style.top = `${correctedOffset}px`;
    optionsContainer.style.left = `${selectPosition.left}px`;
    optionsContainer.style.width = `${selectPosition.selectWidth}px`;
};

export const Select: FC<SelectProps> = ({
    children,
    onChange,
    value,
    className,
    frontComponent,
    classes,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectPosition = useRef<SelectPosition>({
        left: 0,
        top: 0,
        selectHeight: 0,
        selectWidth: 0,
    });

    return (
        <div
            className={clsx(className, styles.select, classes?.root)}
            onClick={(event) => {
                const { top, left, height, width } = (
                    event.currentTarget as HTMLElement
                ).getBoundingClientRect();
                selectPosition.current = {
                    top,
                    left,
                    selectHeight: height,
                    selectWidth: width,
                };

                setIsOpen(true);
            }}
        >
            {frontComponent ? (
                frontComponent
            ) : (
                <span className={classes?.label}>{value}</span>
            )}
            <ExpandMoreIcon
                className={clsx(styles.arrow, classes?.arrow, {
                    [styles.arrowOpen]: isOpen,
                })}
            />
            <SelectContext.Provider
                value={{
                    setValue: (value) => {
                        onChange(value);
                        setIsOpen(false);
                    },
                    value,
                }}
            >
                {isOpen ? (
                    <PopUpRoot curtainOnClick={() => setIsOpen(false)}>
                        <div
                            ref={(ref) => {
                                if (!ref) return;
                                correctOptionsPosition(
                                    ref,
                                    selectPosition.current
                                );
                            }}
                            className={clsx(
                                styles.optionContainer,
                                classes?.options
                            )}
                        >
                            {children}
                        </div>
                    </PopUpRoot>
                ) : null}
            </SelectContext.Provider>
        </div>
    );
};
