import React, { useCallback, useEffect, useRef } from 'react';

import { TGameData } from '../../types';

import LifeMap from '../../LifeMap';

import getGenerationTimeout from '../../utils/getGenerationTimeout';

import Canvas, { TCanvasHandles } from '../../components/Canvas';
import Header from '../../components/Header';
import PlayControl from '../../components/Control/PlayControl';
import { GameDataInfo } from '../../components/GameData';

import useForceUpdate from '../../hooks/useForceUpdate';

const generationTimeoutInit = {
    percent: 10,
    timeout: getGenerationTimeout(10),
};

type TProps = {
    gameData: TGameData;
    onBuild: () => void;
};

const Play = (props: TProps) => {
    const {
        gameData,
        onBuild,
    } = props;

    const lifeMapRef = useRef<LifeMap | null>(null);
    const canvasApiRef = useRef<TCanvasHandles | null>(null);
    const isRunRef = useRef(false);
    const generationTimeoutRef = useRef({
        ...generationTimeoutInit,
    });
    const timeoutIdRef = useRef<number>();

    const forceUpdate = useForceUpdate();

    const drawCells = useCallback(({ cache }: { cache: boolean }) => {
        if (canvasApiRef.current && lifeMapRef.current) {
            canvasApiRef.current.drawCells(lifeMapRef.current.dataMain, cache);
        }
    }, []);

    const stepCallback = useCallback(() => {
        if (lifeMapRef.current) {
            lifeMapRef.current.generation();
            drawCells({
                cache: true,
            });
        }
    }, [
        drawCells,
    ]);

    const generation = useCallback(() => {
        if (isRunRef.current) {
            stepCallback();
            if (timeoutIdRef.current) {
                window.clearTimeout(timeoutIdRef.current);
            }

            timeoutIdRef.current = window.setTimeout(() => {
                generation();
            }, generationTimeoutRef.current.timeout);
        }
    }, [
        stepCallback,
    ]);

    const stopCallback = useCallback(() => {
        isRunRef.current = false;
        forceUpdate();
    }, [
        forceUpdate,
    ]);

    const changePercent = useCallback((percent: number) => {
        generationTimeoutRef.current = {
            percent,
            timeout: getGenerationTimeout(percent),
        };
        forceUpdate();
    }, [
        forceUpdate,
    ]);

    const runCallback = useCallback(() => {
        isRunRef.current = true;
        forceUpdate();
        generation();
    }, [
        generation,
        forceUpdate,
    ]);

    useEffect(() => {
        lifeMapRef.current = new LifeMap(gameData.width, gameData.height, gameData.data);
        generationTimeoutRef.current = {
            ...generationTimeoutInit,
        };
        drawCells({
            cache: false,
        });
        runCallback();

        return () => {
            lifeMapRef.current = null;
            isRunRef.current = false;
        };
    }, [
        gameData.width,
        gameData.height,
        gameData.data,
        drawCells,
        runCallback,
    ]);

    return (
        <main className='page'>
            <Header data={gameData} />

            <GameDataInfo
                data={gameData}
                generationTimeout={generationTimeoutRef.current}
                onChange={changePercent}
            />

            <PlayControl
                isRun={isRunRef.current}
                onClickRun={runCallback}
                onClickStep={stepCallback}
                onClickStop={stopCallback}
                onClickEdit={onBuild}
            />

            <Canvas
                ref={canvasApiRef}
                width={gameData.width}
                height={gameData.height}
                cellSize={gameData.grain}
                showGrid={gameData.grid}
            />
        </main>
    );
};

export default Play;
