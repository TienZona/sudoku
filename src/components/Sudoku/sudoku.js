export const CONSTANT = {
    UNASSIGNED: 0,
    GRID_SIZE: 9,
    BOX_SIZE: 3,
    NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    LEVEL_NAME: ['Easy', 'Medium', 'Hard', 'Very hard'],
    LEVEL: [29, 38, 47, 56],
};

export const newGrid = (size) => {
    let arr = new Array(size);

    for (let i = 0; i < size; i++) {
        arr[i] = new Array(size);
    }

    for (let i = 0; i < Math.pow(size, 2); i++) {
        arr[Math.floor(i / size)][i % size] = CONSTANT.UNASSIGNED;
    }

    return arr;
};

// check duplicate number in col
export const isColSafe = (grid, col, value) => {
    for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
        if (grid[row][col] === value) return false;
    }
    return true;
};

// check duplicate number in row
export const isRowSafe = (grid, row, value) => {
    for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
        if (grid[row][col] === value) return false;
    }
    return true;
};

// check duplicate number in 3x3 box
export const isBoxSafe = (grid, box_row, box_col, value) => {
    for (let row = 0; row < CONSTANT.BOX_SIZE; row++) {
        for (let col = 0; col < CONSTANT.BOX_SIZE; col++) {
            if (grid[row + box_row][col + box_col] === value) return false;
        }
    }
    return true;
};

// check in row, col and 3x3 box
export const isSafe = (grid, row, col, value) => {
    return (
        isColSafe(grid, col, value) &&
        isRowSafe(grid, row, value) &&
        isBoxSafe(grid, row - (row % 3), col - (col % 3), value) &&
        value !== CONSTANT.UNASSIGNED
    );
};

// find unassigned cell
export const findUnassignedPos = (grid, pos) => {
    for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
        for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
            if (grid[row][col] === CONSTANT.UNASSIGNED) {
                pos.row = row;
                pos.col = col;
                return true;
            }
        }
    }
    return false;
};

// shuffle arr
export const shuffleArray = (arr) => {
    let curr_index = arr.length;

    while (curr_index !== 0) {
        let rand_index = Math.floor(Math.random() * curr_index);
        curr_index -= 1;

        let temp = arr[curr_index];
        arr[curr_index] = arr[rand_index];
        arr[rand_index] = temp;
    }

    return arr;
};

// check puzzle is complete
export const isFullGrid = (grid) => {
    return grid.every((row, i) => {
        return row.every((value, j) => {
            return value !== CONSTANT.UNASSIGNED;
        });
    });
};

export const sudokuCreate = (grid) => {
    let unassigned_pos = {
        row: -1,
        col: -1,
    };

    if (!findUnassignedPos(grid, unassigned_pos)) return true;

    let number_list = shuffleArray([...CONSTANT.NUMBERS]);

    let row = unassigned_pos.row;
    let col = unassigned_pos.col;

    number_list.forEach((num, i) => {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;

            if (isFullGrid(grid)) {
                return true;
            } else {
                if (sudokuCreate(grid)) {
                    return true;
                }
            }

            grid[row][col] = CONSTANT.UNASSIGNED;
        }
    });

    return isFullGrid(grid);
};

export const sudokuCheck = (grid) => {
    let unassigned_pos = {
        row: -1,
        col: -1,
    };

    if (!findUnassignedPos(grid, unassigned_pos)) return true;

    grid.forEach((row, i) => {
        row.forEach((num, j) => {
            if (isSafe(grid, i, j, num)) {
                if (isFullGrid(grid)) {
                    return true;
                } else {
                    if (sudokuCreate(grid)) {
                        return true;
                    }
                }
            }
        });
    });

    return isFullGrid(grid);
};

export const rand = () => Math.floor(Math.random() * CONSTANT.GRID_SIZE);

export const removeCells = (grid, level) => {
    let attemps = 0;
    switch (level) {
        case 'easy':
            attemps = CONSTANT.LEVEL[0];
            break;
        case 'medium':
            attemps = CONSTANT.LEVEL[1];
            break;
        case 'hard':
            attemps = CONSTANT.LEVEL[2];
            break;
        case 'very hard':
            attemps = CONSTANT.LEVEL[3];
            break;
        default:
            attemps = CONSTANT.LEVEL[0];
            break;
    }

    let res = [...grid];
    while (attemps > 0) {
        let row = rand();
        let col = rand();
        while (res[row][col] === 0) {
            row = rand();
            col = rand();
        }
        res[row][col] = CONSTANT.UNASSIGNED;
        attemps--;
    }
    return res;
};

// generate sudoku base on level
export const sudokuGen = (level) => {
    let sudoku = newGrid(CONSTANT.GRID_SIZE);
    let check = sudokuCreate(sudoku);
    if (check) {
        const question = removeCells(copyGrid(sudoku), level);
        // let question = sudoku;
        return {
            original: sudoku,
            question: question,
        };
    }
    return undefined;
};

export const copyGrid = (grid) => {
    const new_grid = newGrid(9);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            new_grid[i][j] = grid[i][j];
        }
    }
    return new_grid;
};
