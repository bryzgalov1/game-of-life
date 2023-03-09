import { useCallback, useEffect, useRef } from "react";

type TUse = () => () => boolean;

const useIsMounted: TUse = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return useCallback(() => isMounted.current, []);
};

export default useIsMounted;
