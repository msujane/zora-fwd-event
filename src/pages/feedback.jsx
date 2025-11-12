import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitFeedback } from '../api/api'; // <-- import this
import './feedback.css';

export default function Feedback() {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const email = localStorage.getItem('user_email'); // get email stored on registration

        if (!email) {
            setError("Could not identify user. Please register again.");
            return;
        }

        try {
            // send API call to backend
            await submitFeedback({ email, feedback: text });
            navigate('/score');
        } catch (err) {
            setError(err.message || "Feedback submission failed.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-wrapper">
                <div className="zora_heading_center">
                    <h1><span>ZORA AI<sup className="tm">TM</sup></span></h1>
                    <p className="intro-sub">We'd love your feedback</p>
                </div>

                <div className="glass-card">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="form-title">Feedback</div>
                        <textarea
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Write your feedback here"
                            style={{
                                minHeight: 120,
                                padding: 12,
                                borderRadius: 8,
                                border: '1px solid rgba(255,255,255,0.06)',
                                background: 'rgba(255,255,255,0.02)',
                                color: '#fff'
                            }}
                        />
                        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                        <div className="zora_btn_wrapper">
                            <button type="submit" className="zora_btn">Submit Feedback</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}