import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Time.module.scss';

const cx = classNames.bind(styles);

function Time({ props }) {
    const [time, setTime] = useState(0);
    const timer = setTimeout(() => {
        setTime(time + 1);
    }, 1000);

    useEffect(() => {
        return clearTimeout(timer);
    });

    return (
        <div className={cx('box')}>
            Time:
            <span className={cx('content')}>{Math.floor(time / 60) + ':' + (time % 60)}</span>
        </div>
    );
}

export default Time;
