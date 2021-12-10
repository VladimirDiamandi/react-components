import { useState, useEffect } from "react";

import { windowSizeListener } from "helpers";

export const useBoundingScreen = (boundingWidth: number) => {
    const [isBoundingScreen, setIsBoundingScreen] = useState(false);

    useEffect(() => {
        setIsBoundingScreen(window.innerWidth <= boundingWidth);
        const windowSizeSub = windowSizeListener.subscribe((windowSize) => {
            setIsBoundingScreen(windowSize.width <= boundingWidth);
        });
        return () => windowSizeSub.unsubscribe();
    }, []);

    return isBoundingScreen;
};
