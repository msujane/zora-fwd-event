import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registaration.css';
import ai_face from '../assets/images/ai_face.png';

const Registration = () => {
    // navigation: call hook unconditionally (rules-of-hooks). Wrap the real navigate
    // in a safe function so any runtime error is caught when used.
    const _navigate = useNavigate();
    const navigate = (to, options) => {
        try { _navigate(to, options); } catch (e) { console.warn('navigate failed', e); }
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validate = () => {
        if (!username.trim()) return 'Please enter your Deloitte username.';
        if (!email.trim()) return 'Please enter your email.';
        const re = /^\S+@\S+\.\S+$/;
        if (!re.test(email)) return 'Please provide a valid email address.';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const v = validate();
        if (v) { setError(v); return; }
        setLoading(true);
        const payload = { username: username.trim(), email: email.trim(), mobile: mobile.trim() };
        try {
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text();
                const ct = (res.headers.get('content-type') || '').toLowerCase();
                const looksLikeHtml = ct.includes('text/html') || /^\s*</.test(text);

                if (looksLikeHtml) {
                    try { localStorage.setItem('pending_registration', JSON.stringify(payload)); } catch (ex) { console.warn('localStorage set failed', ex); }
                    setError('Backend not available: saved registration locally. You will be redirected.');
                    navigate('/questions');
                    return;
                }

                throw new Error(text || `Request failed with status ${res.status}`);
            }

            // success
            navigate('/questions');
        } catch (err) {
            console.error('Registration error', err);
            const message = (err && err.message) || '';
            const isNetworkError = message === 'Failed to fetch' || /network/i.test(message);
            if (isNetworkError) {
                try { localStorage.setItem('pending_registration', JSON.stringify(payload)); } catch (ex) { console.warn('localStorage set failed', ex); }
                setError('Network/backend unavailable — saved registration locally and continuing.');
                navigate('/questions');
                return;
            }

            setError(message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='zora_reg'>
            <div className='zora_reg_left'>
                <div className='zora_reg_content'>
                    <div className='zora_heading'>
                        <h2><span>ZORA AI <sup>TM</sup></span></h2>
                        <p>By Deloitte</p>
                    </div>
                    <div className='zora_reg_form'>
                        <form onSubmit={handleSubmit}>
                            <label>Name * </label>
                            <input
                                type='text'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <label>Email *</label>
                            <input
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label>Contact </label>
                            <input
                                type='tel'
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />

                            {error && <p className='zora_error' role='alert'>{error}</p>}

                            <button className='zora_btn' type='submit' disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='zora_reg_right'>
                <div className='zora_reg_img'>
                    <img src={ai_face} alt='AI Face' />
                </div>

            </div>
        </div>
    );
};

export default Registration;