
import React from 'react';

function Board({ board, onColumnClick, winner }) {
    return (
        <div className="board" style={{ opacity: winner ? 0.8 : 1 }}>
            {board.map((col, colIndex) => (
                <div
                    key={colIndex}
                    className="column"
                    onClick={() => onColumnClick(colIndex)}
                    style={{ cursor: winner ? 'not-allowed' : 'pointer' }}
                >
                    {col.map((cellColor, rowIndex) => (
                        <div key={rowIndex} className="cell">
                            {cellColor && <div className={`piece ${cellColor}`}></div>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;