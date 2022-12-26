import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <h1>Side bar</h1>
        </aside>
    );
}

export default SideBar;
