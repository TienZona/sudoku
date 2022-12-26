import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Home.module.scss';
import Game from '~/components/Game';

const cx = classNames.bind(styles);

function Home() {
    const [level, setLevel] = useState('');

    return (
        <div className={cx('container')}>
            {level === '' ? (
                <div className={cx('list-level')}>
                    <div className={cx('level-item')} onClick={() => setLevel('easy')}>
                        Easy
                    </div>
                    <div className={cx('level-item')} onClick={() => setLevel('medium')}>
                        Medium
                    </div>
                    <div className={cx('level-item')} onClick={() => setLevel('hard')}>
                        Hard
                    </div>
                    <div className={cx('level-item')} onClick={() => setLevel('very hard')}>
                        Very Hard
                    </div>
                </div>
            ) : (
                <>
                    <Game level={level} setLevel={setLevel} />
                </>
            )}
        </div>
    );
}

export default Home;
