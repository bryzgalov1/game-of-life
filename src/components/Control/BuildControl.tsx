import React from 'react';

import './style.css';

type TProps = {
    clear: () => void;
    addRendom: () => void;
    play: () => void;
};

const BuildControl = (props: TProps) => {
    const {
        clear,
        addRendom,
        play,
    } = props;

    return (
        <div className='control'>
            <button className='control__btn' onClick={clear}>Сброс</button>
            <button className='control__btn' onClick={addRendom}>Добавить случайные данные</button>
            <button className='control__btn' onClick={play}>Start</button>
        </div>
    );
};

export default BuildControl;
