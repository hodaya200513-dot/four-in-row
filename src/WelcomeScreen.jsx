
import React from 'react';

function WelcomeScreen({ onStart, rows, setRows, columns, setColumns }) {
    return (
        <div className="welcome-screen">
            <h1 className="main-title">4 IN A ROW</h1>
            <div className="options-card">
                <h2>אפשרויות משחק:</h2>

                <ul>
                    <li>ניתן לקבוע את גודל המשחק לפי רצון השחקנים</li>
                    <li>קיים כפתור שמאפס את הלוח</li>
                    <li>ניתן לראות בצד המשחק לוח ניקוד של כל שחקן</li>
                    <li>כשהדיסקיות נופלות יש אנימציה שמראה את הנפילה</li>
                    <li>לכל שחקן יש תור למשך 10 שניות ברגע שלא עשה מהלך התור עובר אוטומטית לשחקן הבא</li>
                    <li>יש כפתור רמז המאפשר לדעת האם יש אפשרות לנצח באותו תור</li>
                </ul>
            </div>
            <p style={{fontSize: '1.2rem', marginBottom: '30px', opacity: 0.8}}>
                !הגדירו את גודל הלוח והתחילו לשחק

            </p>

            <div className="settings-panel" style={{marginBottom: '30px', background: 'rgba(255,255,255,0.1)'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <div>
                        <label style={{fontSize: '0.9rem'}}>עמודות</label>
                    <input
                        type="number"
                        value={columns}
                        onChange={(e) => setColumns(e.target.value)}
                        style={{ width: '80px', textAlign: 'center' }}
                    />
                <span style={{ fontSize: '1.5rem', alignSelf: 'center', marginTop: '15px' }}>X</span>
                    <label style={{ fontSize: '0.9rem' }}>שורות</label>
                    <input
                        type="number"
                        value={rows}
                        onChange={(e) => setRows(e.target.value)}
                        style={{ width: '80px', textAlign: 'center' }}
                    />
                </div>
                </div>
            </div>

            <button className="btn-primary" style={{ padding: '15px 50px', fontSize: '1.5rem' }} onClick={onStart}>
                התחל משחק ▶
            </button>
        </div>
    );
}

export default WelcomeScreen;
