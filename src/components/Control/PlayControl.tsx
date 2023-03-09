import React from 'react';

import './style.css';

type TProps = {
    isRun: boolean;
    onClickStep: () => void;
    onClickRun: () => void;
    onClickStop: () => void;
    onClickEdit: () => void;
};

const PlayControl = (props: TProps) => {
    const {
        isRun,
        onClickStep,
        onClickRun,
        onClickStop,
        onClickEdit,
    } = props;

    const disabledStep = isRun;
    const disabledRun = isRun;
    const disabledStop = !isRun;

    return (
        <div className='control'>
            <button className='control__btn' onClick={onClickStep} disabled={disabledStep}>Шаг</button>
            <button className='control__btn' onClick={onClickRun} disabled={disabledRun}>Старт</button>
            <button className='control__btn' onClick={onClickStop} disabled={disabledStop}>Стоп</button>
            <button className='control__btn' onClick={onClickEdit}>Редактировать</button>
        </div>
    );
};

export default PlayControl;
