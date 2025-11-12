import React, { useEffect, useState } from 'react';
import './score.css';
import { submitScore } from '../api/api' // <<-- import

export default function Score() {
    const [score, setScore] = useState(null);
    const [total, setTotal] = useState(0);
    const [breakdown, setBreakdown] = useState([]);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        try {
            const quiz = JSON.parse(localStorage.getItem('current_quiz') || '[]');
            const answers = JSON.parse(localStorage.getItem('quiz_answers') || '{}');
            const bd = quiz.map((q, i) => {
                const selected = typeof answers[i] !== 'undefined' ? answers[i] : null;
                const correct = q.correctIndex;
                return {
                    q: q.q,
                    selected,
                    correct,
                    correctText: q.options[correct],
                    selectedText: selected !== null ? q.options[selected] : null
                };
            });
            const s = bd.reduce((acc, cur) => acc + (cur.selected === cur.correct ? 1 : 0), 0);
            setBreakdown(bd);
            setScore(s);
            setTotal(bd.length);

            // New: Submit the score once it's calculated
            const email = localStorage.getItem('user_email');
            if (email && bd.length > 0) {
                submitScore({ email, score: s })
                    .then(() => setSubmitSuccess(true))
                    .catch(err => setSubmitError(err.message || 'Could not store score.'));
            }
        } catch (e) {
            console.warn(e);
        }
    }, []);

    return (
        <div className="register-page">
            <div className="register-wrapper">
                <div className="zora_heading_center">
                    <h1><span>ZORA AI<sup>TM</sup></span></h1>
                </div>
                <div className="zora_score_card">
                    <div>
                        <div>You scored</div>
                        <div>{score} / {total}</div>
                        {submitError && <div style={{ color: 'red', margin: 10 }}>{submitError}</div>}
                        {submitSuccess && <div style={{ color: 'green', margin: 10 }}>Score saved!</div>}
                    </div>
                </div>
                <h2 className='zora_heading_center'><span>THANK YOU</span></h2>
            </div>
        </div>
    );
}