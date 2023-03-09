import { useCallback, useEffect, useMemo } from 'react';

import { TGameData } from '../types';
import zipData from '../utils/zipData';
import useForceUpdate from './useForceUpdate';

type TSetGameData = (gameData: TGameData) => void;

type TUse = () => [TGameData, TSetGameData];

const gameDataStart: TGameData = {
    key: 'key',
    mode: 'build',

    width: 20,
    height: 20,

    grain: 20,
    grid: true,

    data: new Uint8Array((new Array(20 * 20)).fill('0')),
};

const useGameData: TUse = () => {
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        window.addEventListener('hashchange', forceUpdate);
        return () => {
            window.removeEventListener('hashchange', forceUpdate);
        };
    }, [
        forceUpdate,
    ]);

    const hash = document.location.hash;

    const gameData = useMemo(() => {
        if (hash) {
            const [, locationSearch] = hash.split('#');
            const searchParams = new URLSearchParams(locationSearch);

            const key = searchParams.get('key');
            const modeStr = searchParams.get('mode');

            const widthStr = searchParams.get('width');
            const heightStr = searchParams.get('height');

            const grainStr = searchParams.get('grain');
            const gridStr = searchParams.get('grid');

            const dataStr = searchParams.get('data');

            if (key && modeStr && widthStr && heightStr && grainStr && gridStr && dataStr) {
                const mode = modeStr === 'play' ? 'play' : 'build';

                const width = +widthStr;
                const height = +heightStr;

                const grain = +grainStr;
                const grid = (gridStr === 'true');

                const data = new Uint8Array(zipData.unZip(dataStr).split('').map(x => +x));

                const gameData: TGameData = {
                    key,

                    mode,

                    width,
                    height,

                    grain,
                    grid,

                    data,
                };
                return gameData;
            }
        }

        return gameDataStart;
    }, [
        hash,
    ]);

    const setGameData: TSetGameData = useCallback((newGameData: TGameData) => {
        const {
            key,
            mode,

            width,
            height,

            grain,
            grid,

            data,
        } = newGameData;

        const dataStr = data.join('');

        const dataZip = zipData.zip(dataStr);

        const search = `#?key=${key}&mode=${mode}&width=${width}&height=${height}&grain=${grain}&grid=${grid}&data=${dataZip}`;

        const locationHref = window.location.origin + search;

        window.location.href = locationHref;
    }, []);

    return [gameData, setGameData];
};

export default useGameData;
