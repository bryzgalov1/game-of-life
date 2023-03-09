import React, { useCallback } from 'react';

import { GRAIN_MAX, GRAIN_MIN, SIZE_MAX, SIZE_MIN } from '../../config';

import { TFormData } from '../../types';

import './style.css';

type TProps = {
    data: TFormData;
    setData: (data: TFormData) => void;
};

const DataForm = (props: TProps) => {
    const {
        data,
        setData,
    } = props;

    const setDataCallback = useCallback(<T extends keyof TFormData,>(key: T, value: TFormData[T]) => {
        setData({
            ...data,
            [key]: value,
        });
    }, [
        data,
        setData,
    ]);

    const onChangeWidth = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDataCallback('width', event.target.value);
    }, [
        setDataCallback,
    ]);

    const onChangeHeight = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDataCallback('height', event.target.value);
    }, [
        setDataCallback,
    ]);

    const onChangeGrain = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDataCallback('grain', event.target.value);
    }, [
        setDataCallback,
    ]);

    const onChangeGrid = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDataCallback('grid', event.target.checked);
    }, [
        setDataCallback,
    ]);

    const selectInputText = useCallback((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if (event.nativeEvent.target) {
            (event.nativeEvent.target as HTMLInputElement).select();
        }
    }, []);

    return (
        <div className='GameData'>
            <label
                className='GameData__label'
                htmlFor="width"
            >
                Ширина
            </label>
            <input
                className='GameData__input-number'
                name="width"
                id="width"
                type="number"
                value={data.width}
                onChange={onChangeWidth}
                onClick={selectInputText}
                min={SIZE_MIN}
                max={SIZE_MAX}
            />

            <label
                className='GameData__label'
                htmlFor="height"
            >
                Высота
            </label>
            <input
                className='GameData__input-number'
                name="height"
                id="height"
                type="number"
                value={data.height}
                onChange={onChangeHeight}
                onClick={selectInputText}
                min={SIZE_MIN}
                max={SIZE_MAX}
            />

            <label
                className='GameData__label'
                htmlFor="grain"
            >
                Ячейка
            </label>
            <input
                className='GameData__input-number'
                name="grain"
                id="grain"
                type="number"
                value={data.grain}
                onChange={onChangeGrain}
                onClick={selectInputText}
                min={GRAIN_MIN}
                max={GRAIN_MAX}
            />

            <label
                className='GameData__label'
                htmlFor="grid"
            >
                Сетка
            </label>
            <input
                className='GameData__input-checked'
                name="grid"
                id="grid"
                type="checkbox"
                checked={data.grid}
                onChange={onChangeGrid}
                onClick={selectInputText}
            />
        </div>
    );
};

export default DataForm;
