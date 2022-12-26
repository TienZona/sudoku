import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

function Nav(props) {
    return (
        <div className={cx('box')}>
            <div className={cx('list-btn')}>
                <div className={cx('btn-item')} onClick={props.setLevel('')}>
                    New Game
                </div>
            </div>
        </div>
    );
}

export default Nav;
