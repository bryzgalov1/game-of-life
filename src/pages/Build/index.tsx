import React, { useCallback, useEffect, useRef } from 'react';

import { CellStatus } from '../../LifeMap/types';
import { TGameData, TGameDataPart } from '../../types';

import log from '../../utils/log';
import randomInteger from '../../utils/randomInteger';

import Canvas, { TCanvasHandles } from '../../components/Canvas';
import Header from '../../components/Header';
import BuildControl from '../../components/Control/BuildControl';
import { GameDataForm } from '../../components/GameData';

const addRendomPercent = 15;

type TProps = {
    gameData: TGameData;
    setGameData: (gameData: TGameData) => void;
    onPlay: () => void;
};

const Build = (props: TProps) => {
    const {
        gameData,
        setGameData,
        onPlay,
    } = props;

    const canvasApiRef = useRef<TCanvasHandles | null>(null);

    const addRendomData = useCallback(() => {
        log.time("addRendomData");

        let count = Math.floor((gameData.width * gameData.height * addRendomPercent) / 100);
        if (count < 1) {
            count = 1;
        }

        for (let index = 0; index < count; index++) {
            const cellX = randomInteger(0, gameData.width);
            const cellY = randomInteger(0, gameData.height);

            const index = cellY * gameData.width + cellX;

            gameData.data[index] = CellStatus.LIVE;
        }

        setGameData(gameData);
        log.timeEnd("addRendomData");
    }, [
        gameData,
        setGameData,
    ]);

    const drawCells = useCallback(() => {
        if (canvasApiRef.current) {
            canvasApiRef.current.drawCells(gameData.data);
        }
    }, [
        gameData,
    ]);

    useEffect(() => {
        drawCells();
    }, [
        drawCells,
    ]);

    const onClickClear = useCallback(() => {
        setGameData({
            ...gameData,
            data: new Uint8Array(new ArrayBuffer(gameData.width * gameData.height)),
        });
    }, [
        gameData,
        setGameData,
    ]);

    const onCellClick = useCallback((cellX: number, cellY: number) => {
        const index = cellY * gameData.width + cellX;
        const status = gameData.data[index];
        const newStatus = status === CellStatus.LIVE ? CellStatus.DEAD : CellStatus.LIVE;
        gameData.data[index] = newStatus;
        setGameData(gameData);
    }, [
        setGameData,
        gameData,
    ]);

    const onDataFormChange = useCallback((gameDataPart: TGameDataPart) => {
        const data: TGameData = {
            ...gameData,
            ...gameDataPart,
        };
        if (
            gameDataPart.width !== gameData.width ||
            gameDataPart.height !== gameData.height
        ) {
            data.data = new Uint8Array(new ArrayBuffer(gameDataPart.width * gameDataPart.height));
        }

        setGameData(data);
    }, [
        gameData,
        setGameData,
    ]);

    return (
        <main className='page'>
            <Header data={gameData} />

            <GameDataForm
                data={gameData}
                setData={onDataFormChange}
            />

            <BuildControl
                addRendom={addRendomData}
                clear={onClickClear}
                play={onPlay}
            />

            <Canvas
                ref={canvasApiRef}
                width={gameData.width}
                height={gameData.height}
                cellSize={gameData.grain}
                showGrid={gameData.grid}
                onCellClick={onCellClick}
            />
        </main>
    );
};

export default Build;
