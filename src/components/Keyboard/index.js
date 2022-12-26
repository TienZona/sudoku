import classNames from 'classnames/bind';

import styles from './Keyboard.module.scss';

const cx = classNames.bind(styles);

function Keyboard(props) {
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className={cx('box')}>
            <div className={cx('sudoku-container__left')}>
                <div className={cx('number-list')}>
                    {number.map((item, index) => {
                        return (
                            <div key={index} className={cx('number-item')} onClick={() => props.handle(item)}>
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Keyboard;
