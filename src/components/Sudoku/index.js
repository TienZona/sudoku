import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import { sudokuGen, CONSTANT } from './sudoku';

import styles from './Sudoku.module.scss';

const cx = classNames.bind(styles);

function Sudoku(props) {
    const number = CONSTANT.NUMBERS;
    const [arr, setArr] = useState(sudokuGen(props.level));
    const [focus, setFocus] = useState([0, 0]);
    const [numFocus, setNumFocus] = useState(0);

    useEffect(() => {
        if (props.valueFocus) {
            arr.question[focus[0]][focus[1]] = props.valueFocus;
            setArr(arr);
            checkFoul();
            setNumFocus(props.valueFocus);
        }
    }, [props.valueFocus]);

    const checkFoul = () => {
        if (arr.original[focus[0]][focus[1]] !== arr.question[focus[0]][focus[1]]) {
            props.setFoul(props.foul - 1);
            console.log('foul');
        }
    };

    const handleNumber = (row, col) => {
        setFocus([row, col]);
        setNumFocus(0);
    };

    const renderNumber = (row, col) => {
        const num = arr.question[row][col];
        if (num) {
            return num;
        } else {
            if (numFocus !== 0 && focus[0] === row && focus[1] === col) {
                return numFocus;
            }
        }
    };

    return (
        <div className={cx('frame')}>
            <div className={cx('row-sudoku')}>
                {number.map((col, colIndex) => {
                    return (
                        <div key={colIndex} className={cx('row')}>
                            {number.map((row, rowIndex) => {
                                return (
                                    <div
                                        key={rowIndex}
                                        className={cx(
                                            'item',
                                            rowIndex === 2 || rowIndex === 5 ? 'item-row' : '',
                                            colIndex === 2 || colIndex === 5 ? 'item-col' : '',
                                            rowIndex === focus[0] || colIndex === focus[1] ? 'sub-focus' : '',
                                            rowIndex === focus[0] && colIndex === focus[1] ? 'focus' : '',
                                            arr.original[rowIndex][colIndex] !== arr.question[rowIndex][colIndex] &&
                                                'red',
                                        )}
                                        onClick={() => handleNumber(rowIndex, colIndex)}
                                    >
                                        {renderNumber(rowIndex, colIndex)}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Sudoku;
