import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper', 'header')}>
            <div className={cx('logo')}>
                <img src="https://ik.imagekit.io/sjyfpsp1n/marketing/featuredGames/sudoku-classic/logo.png" alt="" />
            </div>
        </header>
    );
}

export default Header;
