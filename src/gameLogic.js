/* קומפוננטת לוגיקת המשחק*/
export const createEmptyBoard = (rows, cols) => {
    return Array(Number(cols)).fill(null).map(() => Array(Number(rows)).fill(null));
};

export const checkWinner = (currentBoard, colIndex, rowIndex, playerColor) => {
    const numCols = currentBoard.length;
    const numRows = currentBoard[0].length;
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (let [dx, dy] of directions) {
        let count = 1;
        let x = colIndex + dx;
        let y = rowIndex + dy;
        while (x >= 0 && x < numCols && y >= 0 && y < numRows && currentBoard[x][y] === playerColor) {
            count++;
            x += dx;
            y += dy;
        }

        x = colIndex - dx;
        y = rowIndex - dy;
        while (x >= 0 && x < numCols && y >= 0 && y < numRows && currentBoard[x][y] === playerColor) {
            count++;
            x -= dx;
            y -= dy;
        }

        if (count >= 4) return true;
    }
    return false;
};

export const countDiscs = (currentBoard) => {
    let redCount = 0;
    let yellowCount = 0;

    currentBoard.forEach(col => {
        col.forEach(cell => {
            if (cell === 'red') redCount++;
            if (cell === 'yellow') yellowCount++;
        });
    });

    return { red: redCount, yellow: yellowCount };
};

export const findWinningMove = (board, playerColor) => {
    for (let col = 0; col < board.length; col++) {

        const tempBoard = board.map(column => [...column]);
        let rowToPlace = -1;

        for (let r = tempBoard[col].length - 1; r >= 0; r--) {
            if (!tempBoard[col][r]) {
                rowToPlace = r;
                break;
            }
        }

        if (rowToPlace === -1) continue;


        tempBoard[col][rowToPlace] = playerColor;
        if (checkWinner(tempBoard, col, rowToPlace, playerColor)) {
            return true;
        }
    }
    return false;
};