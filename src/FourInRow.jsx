import {useState} from "react";


function FourInRow() {
    const [rows, setRows] = useState(6);
    const [columns, setColumns] = useState(7);
    const [board, setBoard] = useState(
        Array(columns).fill(null).map(() => Array(rows).fill(null))
    );
    const creatBoard = () => {
        const numRows = Number(rows);
        const numColumns = Number(columns);
        if (numRows <= 0 || numColumns <= 0) {
            alert('Enter a number greater than 0 ')
            return;
        }
        const newBoard = Array(numColumns).fill(null).map(() => Array(numRows).fill(null))
        setBoard(newBoard);
    }
    return (
        <div className="game-container">
            <h1>My Game</h1>
            <input type={'number'} placeholder={'number of columns:'} value={columns}
                   onChange={event => {
                       setColumns((event.target.value));
                   }}/>
            <input type={'number'} placeholder={'number of rows:'} value={rows}
                   onChange={event => {
                       setRows((event.target.value));
                   }}/>
            <button onClick={creatBoard}>
                Creat a new board
            </button>

            <div className="board">
                {board.map((col, colIndex) => (
                    <div key={colIndex} className="column">
                        {col.map((cell, rowIndex) => (
                            <div key={rowIndex} className="cell">
                                {/* התאים כרגע ריקים */}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default FourInRow;