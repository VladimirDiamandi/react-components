import React, { FC, useState } from "react";
import clsx from "clsx";
import css from "./style.module.scss";
import { PopUpRoot } from "components";

interface PopUpMenuProps {
  anchor?: HTMLElement | Element | null;
  isOpen: boolean;
  onClose: () => void;
  onMove?: () => void;
  background?: string;
  paper?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  position?: {
    top: number;
    left: number;
  }
}

export const PopUpAnchorMenu: FC<PopUpMenuProps> = ({
  children,
  anchor,
  isOpen,
  onClose,
  onMove,
  background = "black",
  paper,
  position,
}) => {
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  const getMenuPosition = () => {
    if (anchor && rootElement) {
      let { top, left } = anchor.getBoundingClientRect();

      const custom_top = position?.top ? position.top : 0;
      const custom_left = position?.left ? position.left : 0;

      top = top + custom_top;
      left = left + custom_left;

      if (top < 0) {
        top = 0;
      }

      if (left < 0) {
        left = 0;
      }

      if (left + rootElement.offsetWidth > window.innerWidth) {
        left = window.innerWidth - rootElement.offsetWidth;
      }

      if (top + rootElement.offsetHeight > window.innerHeight) {
        top = window.innerHeight - rootElement.offsetHeight;
      }
      return {
        top,
        left,
      };
    }

    return {
      top: 0,
      left: 0,
    };
  };

  if (!isOpen || !anchor) {
    return null;
  }

  const menuPosition = getMenuPosition();
  
  return (
    <PopUpRoot
      background={background}
      curtainOnClick={onClose}
      curtainOnMove={onMove}
    >
      <div
        ref={(node) => setRootElement(node)}
        style={{
          ...paper?.style,
          transform: `translate(${menuPosition.left}px, ${menuPosition.top}px)`,
        }}
        {...paper}
        className={clsx(css.root, paper?.className)}
      >
        {children}
      </div>
    </PopUpRoot>
  );
};
