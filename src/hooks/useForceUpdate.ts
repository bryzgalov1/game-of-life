import { useReducer } from 'react';

type TUse = () => () => void;

const useForceUpdate: TUse = () => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    return forceUpdate;
};

export default useForceUpdate;
