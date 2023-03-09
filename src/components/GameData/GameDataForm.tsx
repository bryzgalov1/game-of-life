import React, { useCallback, useState, useRef, useEffect } from 'react';

import { TFormData, TGameDataPart } from '../../types';

import gameDataPartToFormData from '../../utils/gameDataPartToFormData';
import getNormalizeFormData from '../../utils/getNormalizeFormData';

import DataForm from './DataForm';

import useIsMounted from '../../hooks/useIsMounted';

type TProps = {
    data: TGameDataPart;
    setData: (data: TGameDataPart) => void;
};

const GameDataForm = (props: TProps) => {
    const {
        setData,
    } = props;

    const [formData, setFormData] = useState<TFormData>(gameDataPartToFormData(props.data));

    useEffect(() => {
        setFormData(gameDataPartToFormData(props.data));
    }, [
        props.data,
    ]);

    const isMounted = useIsMounted();

    const timeoutRef = useRef<number | undefined>();

    const setDataCallback = useCallback((formData: TFormData) => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            if (isMounted()) {
                const normalizeFormData = getNormalizeFormData(formData);
                setData(normalizeFormData);
                setFormData(gameDataPartToFormData(normalizeFormData));
            }
        }, 500);
    }, [
        isMounted,
        setData,
    ]);

    const setFormDataCallback = useCallback((formData: TFormData) => {
        setFormData(formData);
        setDataCallback(formData);
    }, [
        setDataCallback,
    ]);

    return (
        <DataForm
            data={formData}
            setData={setFormDataCallback}
        />
    );
};

export default GameDataForm;
