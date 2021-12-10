import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface ButtonAnimationData {
  x: number;
  y: number;
}

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "ref"
  > {
  classes?: {
    root?: string;
    label?: string;
  };

  component?: ForwardRefExoticComponent<
    RefAttributes<HTMLAnchorElement | null>
  >;
  waveColor?: string;
  base?: boolean;
}
