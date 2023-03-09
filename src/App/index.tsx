import React, { useCallback } from 'react';

import Build from '../pages/Build';
import Play from '../pages/Play';

import useGameData from '../hooks/useGameData';

const App = () => {
    const [gameData, setGameData] = useGameData();

    const onPlay = useCallback(() => {
        setGameData({
            ...gameData,
            mode: 'play',
        });
    }, [
        gameData,
        setGameData,
    ]);

    const onBuild = useCallback(() => {
        setGameData({
            ...gameData,
            mode: 'build',
        });
    }, [
        gameData,
        setGameData,
    ]);

    if (gameData.mode === 'build') {
        return (
            <Build
                gameData={gameData}
                setGameData={setGameData}
                onPlay={onPlay}
            />
        );
    }

    if (gameData.mode === 'play') {
        return (
            <Play
                gameData={gameData}
                onBuild={onBuild}
            />
        );
    }

    return null;
};

export default App;
