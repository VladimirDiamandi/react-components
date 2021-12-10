import React, {
  FC,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import clsx from "clsx";

import { CheckIcon } from "icons";

import styles from "./style.module.scss";

export interface CheckboxClasses {
  root: string;
  input: string;
  label: string;
  checked: string;
  checkbox: string;
  icon: string;
}

export interface Props
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "onChange"
  > {
  classes?: Partial<CheckboxClasses>;
  label?: number | string | JSX.Element;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export const Checkbox: FC<Props> = ({
  classes,
  label,
  checked,
  onChange,
  className,
  ...props
}) => {
  let labelComponent: JSX.Element | null;

  if (!label) {
    labelComponent = null;
  } else if (typeof label === "string" || typeof label === "number") {
    labelComponent = (
      <span className={clsx(classes?.label, styles.label)}>{label}</span>
    );
  } else {
    labelComponent = label;
  }

  return (
    <label className={clsx(classes?.root, styles.root, className)}>
      <div
        className={clsx(styles.checkbox, classes?.checkbox, {
          [clsx(styles.checkboxChecked, classes?.checked)]: checked,
        })}>
        <input
          {...props}
          onChange={
            onChange
              ? (event) => onChange(event, event.target.checked)
              : undefined
          }
          type="checkbox"
          checked={checked}
          className={clsx(classes?.input, styles.input)}
        />
        <CheckIcon
          className={clsx(styles.icon, classes?.icon, {
            [styles.iconChecked]: checked,
          })}
        />
      </div>
      {labelComponent}
    </label>
  );
};

export default Checkbox;
