import React, { useCallback } from 'react';

import { TGameData } from '../../types';

import './style.css';

type TData = Omit<TGameData, 'data' | 'mode'>;

type TProps = {
    data: TData;
    generationTimeout: {
        percent: number;
        timeout: number;
    };
    onChange: (percent: number) => void;
};

const GameDataInfo = (props: TProps) => {
    const {
        data,
        generationTimeout,
        onChange,
    } = props;

    const onChangeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const percent = +event.target.value;
        onChange(percent);
    }, [
        onChange,
    ]);

    return (
        <div className='GameData'>
            <div>Ширина: {data.width}</div>
            <div>Высота: {data.height}</div>
            <div>Ячейка: {data.grain}</div>
            <div>
                <span>Задержка: </span>
                <input
                    className='GameData__input-range'
                    type="range"
                    value={generationTimeout.percent}
                    onChange={onChangeCallback}
                />
                <span> {generationTimeout.timeout}ms</span>
            </div>
        </div>
    );
};

export default GameDataInfo;
