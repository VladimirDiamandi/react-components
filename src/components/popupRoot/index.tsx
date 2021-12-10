import { FC, KeyboardEvent, MouseEvent } from "react";
import { createPortal } from "react-dom";
import css from "./style.module.scss";
import clsx from "clsx";
import { Utils } from "helpers";
import { useEventListener } from "hooks";

const keyEventGuard = Utils.createGuard<KeyboardEvent<HTMLDivElement>>("key");
interface Props {
  background?: string;
  curtainOnClick?: () => void;
  curtainOnMove?: () => void;
  classes?: {
    root?: string;
    paper?: string;
  };
}

const rootDom = document.getElementById("pop-up");

export const PopUpRoot: FC<Props> = ({
  children,
  background = "transparent",
  curtainOnClick,
  curtainOnMove,
  classes,
}) => {
  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEventListener("keydown", (event) => {
    event.stopPropagation();

    if (keyEventGuard(event)) {
      if (event?.key === "Escape") {
        curtainOnClick && curtainOnClick();
      }
    }
  });

  if (rootDom) {
    return createPortal(
      <div
        className={clsx(css.root, classes?.root)}
        onClick={stopPropagation}>
        <div
          onPointerMove={curtainOnMove}
          onClick={() => {
            curtainOnClick && curtainOnClick();
          }}
          className={clsx(
            css.curtain,
            background === "transparent"
              ? css.curtain__transparent
              : css.curtain__dark,
          )}
        />
        <div className={clsx(css.paper, classes?.paper)}>{children}</div>
      </div>,
      rootDom,
    );
  }

  return null;
};
