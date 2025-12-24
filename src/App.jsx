/* קומפוננטת האפליקציה*/
import React, { useState, useEffect } from 'react';
import './App.css';

import ScoreBoard from './ScoreBoard.jsx';
import WelcomeScreen from './WelcomeScreen.jsx';
import Board from './Board.jsx';
import { createEmptyBoard, checkWinner, countDiscs, findWinningMove } from './gameLogic.js';

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isRedTurn, setIsRedTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const [hintMessage, setHintMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState(10);
    const [scores, setScores] = useState({ red: 0, yellow: 0 });

    const [rows, setRows] = useState(6);
    const [columns, setColumns] = useState(7);

    const [board, setBoard] = useState(createEmptyBoard(6, 7));

    const handleStartGame = () => {
        const numRows = Number(rows);
        const numCols = Number(columns);

        if (numRows <= 0 || numCols <= 0) {
            alert("אנא הכנס גודל לוח חוקי");
            return;
        }

        setBoard(createEmptyBoard(numRows, numCols));
        setIsRedTurn(true);
        setWinner(null);
        setHintMessage("");
        setTimeLeft(10);
        setIsGameStarted(true);
    };

    useEffect(() => {
        if (!isGameStarted || winner) return;
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timerId);
    }, [isGameStarted, winner, isRedTurn]);

    useEffect(() => {
        if (timeLeft === 0 && !winner && isGameStarted) {
            setIsRedTurn((prev) => !prev);
            setTimeLeft(10);
        }
    }, [timeLeft, winner, isGameStarted]);

    const handleColumnClick = (colIndex) => {
        if (winner) return;
        const newBoard = [...board];
        const column = [...newBoard[colIndex]];
        let placedRow = -1;
        for (let r = column.length - 1; r >= 0; r--) {
            if (!column[r]) { column[r] = isRedTurn ? 'red' : 'yellow'; placedRow = r; break; }
        }
        if (placedRow === -1) return;

        newBoard[colIndex] = column;
        setBoard(newBoard);
        setHintMessage("");
        setTimeLeft(10);

        const currentPlayerColor = isRedTurn ? 'red' : 'yellow';
        if (checkWinner(newBoard, colIndex, placedRow, currentPlayerColor)) {
            setWinner(currentPlayerColor);
            const { red, yellow } = countDiscs(newBoard);
            setScores(prev => ({ red: prev.red + red, yellow: prev.yellow + yellow }));
        } else {
            setIsRedTurn(!isRedTurn);
        }
    };

    const handleResetGame = () => {
        setBoard(createEmptyBoard(rows, columns));
        setIsRedTurn(true); setWinner(null); setHintMessage(""); setTimeLeft(10);
    };

    const handleFullReset = () => {
        setScores({ red: 0, yellow: 0 });
        setIsGameStarted(false);
    };

    const handleGetHint = () => {
        const currentPlayer = isRedTurn ? 'red' : 'yellow';
        const canWin = findWinningMove(board, currentPlayer);
        if (canWin) setHintMessage("🎉 כן! יש לך מהלך מנצח אפשרי!");
        else setHintMessage("🤔 לא מצאתי ניצחון מיידי בתור הקרוב.");
        setTimeout(() => setHintMessage(""), 3000);
    };

    return (
        <div className="app-container">
            { !isGameStarted ? (

                <WelcomeScreen
                    onStart={handleStartGame}
                    rows={rows} setRows={setRows}
                    columns={columns} setColumns={setColumns}
                />

            ) : (
                <div className="game-screen">
                    <div className="top-bar">
                        <div className="left-buttons-container">
                            <button className="btn-secondary" onClick={handleFullReset}>יציאה לתפריט</button>
                        </div>
                        <ScoreBoard scores={scores} />
                    </div>
                    <h1 className="main-title">4 IN A ROW</h1>

                    {hintMessage && hintMessage.trim() !== "" && (
                        <div style={{ marginTop: '10px', backgroundColor: '#fff3cd', color: '#856404', padding: '10px', borderRadius: '5px', fontWeight: 'bold', border: '1px solid #ffeeba' }}>
                            {hintMessage}
                        </div>
                    )}

                    {winner ? (
                        <div className="winner-message">
              <span style={{ color: winner === 'red' ? '#ff6b6b' : '#ffd54f' ,fontSize: '3rem', marginTop: '5px'}}>
                 🏆 !המנצח: {winner === 'red' ? 'אדום' : 'צהוב'}
              </span>
                            <p style={{ fontSize: '1rem', marginTop: '5px' }}>
                                (נוספו {winner === 'red' ? countDiscs(board).red : countDiscs(board).yellow} נקודות)
                            </p>
                            <div style={{ marginTop: '15px' }}>
                                <button className="btn-warning" onClick={handleResetGame}>משחק חדש ↺</button>
                            </div>
                        </div>
                    ) : (
                        <div className="game-info">
                            <div className={`timer-box ${timeLeft <= 3 ? 'danger' : ''}`}>⏳ {timeLeft}</div>
                            <div style={{ fontSize: '1.2rem' }}>
                                תור: <span style={{ color: isRedTurn ? '#ff6b6b' : '#ffd54f', fontWeight: 'bold' }}>{isRedTurn ? 'אדום' : 'צהוב'}</span>
                            </div>
                            <button className="btn-hint" onClick={handleGetHint} style={{ background: ' #673ab7', color: 'white' }}>💡 רמז</button>
                            <button className="btn-warning" onClick={handleResetGame} style={{ fontSize: '0.9rem' }}>איפוס לוח</button>
                        </div>
                    )}

                    <Board board={board} onColumnClick={handleColumnClick} winner={winner} />
                </div>
            )}
        </div>
    );
}

export default App;













