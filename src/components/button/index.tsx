import {
  FC,
  forwardRef,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";

import { createTimeouts, throttle } from "helpers";

import "./style.scss";
import { ButtonAnimationData, ButtonProps } from "./types";

const wait = throttle();

const { clearTimeouts, pushTimeout } = createTimeouts();

const timeForWaveRestart = 300;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      base,
      classes,
      waveColor,
      component: Component,
      ...rest
    },
    ref
  ) => {
    const [playAnimation, setPlayAnimation] =
      useState<ButtonAnimationData | null>(null);
    const handleEndAnimation = () => {
      setPlayAnimation(null);
    };

    const clearPrevWave = () => {
      wait(() => {
        handleEndAnimation();
        clearTimeouts();
      }, timeForWaveRestart);
    };

    const handleStartAnimation = (event: MouseEvent<HTMLButtonElement>) => {
      clearPrevWave();

      const { clientX, clientY, currentTarget } = event;

      pushTimeout(() => {
        const targetRect = currentTarget.getBoundingClientRect();
        setPlayAnimation({
          x: clientX - targetRect.left,
          y: clientY - targetRect.top,
        });
      });
    };

    useEffect(() => {
      return () => {
        clearTimeouts();
      };
    }, []);

    const Root: FC<any> = useCallback(
      forwardRef((props, ref) =>
        Component ? (
          <Component {...props} ref={ref} />
        ) : (
          <button {...props} ref={ref} />
        )
      ),
      []
    );

    return (
      <Root
        ref={ref}
        className={clsx("baseButton", className, classes?.root)}
        {...rest}
        onMouseDown={handleStartAnimation}
      >
        <span
          onAnimationEnd={handleEndAnimation}
          className={clsx(
            "baseButton__waveAnimation",
            playAnimation && "baseButton__waveAnimation_play"
          )}
          style={{
            left: playAnimation?.x,
            top: playAnimation?.y,
            background: waveColor,
          }}
        />
        {children}
      </Root>
    );
  }
);
