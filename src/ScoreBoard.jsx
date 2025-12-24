/* קומפוננטת הלוח ניקוד*/
import React from 'react';

function ScoreBoard({ scores }) {

    if (!scores) {
        return null;
    }

    return (
        <div className="scoreboard">
            <div className="score-item red">
                <div className="score-dot red"></div>
                <span>אדום: {scores.red || 0}</span>
            </div>
            <div className="score-item yellow">
                <div className="score-dot yellow"></div>
                <span>צהוב: {scores.yellow || 0}</span>
            </div>
        </div>
    );
}

export default ScoreBoard;