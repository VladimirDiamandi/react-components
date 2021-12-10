import { fromEvent, map, sampleTime } from "rxjs";

export const windowSizeListener = fromEvent(window, "resize").pipe(
    sampleTime(500),
    map((event) => ({
        width: (event.target as Window)?.innerWidth,
        height: (event.target as Window)?.innerHeight,
    }))
);
