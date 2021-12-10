import { createTimeouts } from "helpers";

export const throttle = () => {
  const { clearTimeouts, pushTimeout } = createTimeouts();
  let lastTime = 0;

  return (f: Function, timer: number): void => {
    const now = Date.now();
    if (now - lastTime >= timer) {
      lastTime = now;
      f();
      clearTimeouts();
    } else {
      clearTimeouts();
      pushTimeout(() => {
        f();
        lastTime = now;
      }, timer);
    }
  };
};
