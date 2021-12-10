import { useRef, useEffect } from "react";

export const useEventListener = <T extends keyof WindowEventMap>(
  eventName: T,
  handler: EventListener,
  element: EventTarget = window,
  options?: boolean | AddEventListenerOptions,
) => {
  const savedHandler = useRef<EventListener>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener: EventListener = (event) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};