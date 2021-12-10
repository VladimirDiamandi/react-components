import { useState, useEffect } from "react";

import { windowSizeListener } from "helpers";

export const useWindowSize = () => {
    const [width, setWidth] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        setWidth({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        const windowSizeSub = windowSizeListener.subscribe(setWidth);
        return () => windowSizeSub.unsubscribe();
    }, []);

    return width;
};
