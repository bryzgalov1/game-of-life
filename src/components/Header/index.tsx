import React from 'react';

import { TGameData } from '../../types';

import tpls from './tpls';

import './style.css';

type TProps = {
    data: TGameData;
};

const Header = (props: TProps) => {
    const {
        key,
    } = props.data;

    return (
        <header className='header'>

            <h1 className='header__h1'>
                Игра «Жизнь» {' '}
                <a
                    href="https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB"
                    target="_blank"
                    rel="noopener noreferrer">
                    wikipedia
                </a>
            </h1>

            <nav className='header__nav'>

                {'key' === key ? (
                    <span className='header__name'>Начало</span>
                ) : (
                    <a className='header__link' href='/game-of-life/#'>Начало</a>
                )}

                {tpls.map((tpl) => {
                    if (tpl.key === key) {
                        return (
                            <span
                                className='header__name'
                                key={tpl.name}
                            >
                                {tpl.name}
                            </span>
                        );
                    }
                    return (
                        <a
                            className='header__link'
                            key={tpl.name}
                            href={tpl.hash}
                        >
                            {tpl.name}
                        </a>
                    );
                })}
            </nav>

        </header>
    );
};

export default Header;
