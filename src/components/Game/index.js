import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Game.module.scss';

import Timer from '~/components/Time';
import Keyboard from '~/components/Keyboard';
import Sudoku from '~/components/Sudoku';

const cx = classNames.bind(styles);

function Game(props) {
    const [foul, setFoul] = useState(3);
    const [valueFocus, setValue] = useState(0);

    const handle = (value) => {
        setValue(value);
    };

    if (foul === 0) {
        alert('GAME OVER !!!');
        props.setLevel('');
    }

    const updateFoul = () => {
        props.setLevel('');
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('sudoku-header')}>
                    <div className={cx('sudoku-header__item')}>
                        Level:
                        <span className={cx('level')}>{props.level}</span>
                    </div>
                    <h5 className={cx('sudoku-header__foul')}>
                        Foul: <span id="foul">{foul}</span>
                    </h5>
                    <Timer start={true} />
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('right')}>
                    <div className={cx('box')}>
                        <div className={cx('list-btn')}>
                            <div className={cx('btn-item')} onClick={updateFoul}>
                                GO BACK
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('mid')}>
                    <Sudoku level={props.level} valueFocus={valueFocus} foul={foul} setFoul={setFoul} />
                </div>
                <div className={cx('left')}>
                    <Keyboard handle={handle} />
                </div>
            </div>
        </div>
    );
}

export default Game;
