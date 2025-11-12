import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './registaration.css';  // Please double-check your actual filename (was 'registaration.css' before!)
import ai_face from '../assets/images/ai_face.png';
import { registerUser } from '../api/api';

const Registration = () => {
    const navigate = useNavigate();

    // State for form data and status
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    // State for field errors and global error
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [error, setError] = useState('');

    // Field validation function
    const validate = () => {
        let isValid = true;
        setNameError('');
        setEmailError('');
        setPhoneError('');

        if (!name.trim()) {
            setNameError('Please enter your Deloitte name.');
            isValid = false;
        }
        if (!email.trim()) {
            setEmailError('Please enter your email.');
            isValid = false;
        } else {
            const emailPattern = /^[^@]+@deloitte\.com$/i;
            if (!emailPattern.test(email.trim())) {
                setEmailError('Email must be a valid @deloitte.com address.');
                isValid = false;
            }
        }
        if (phone.trim()) {
            const phonePattern = /^\d{10}$/;
            if (!phonePattern.test(phone.trim())) {
                setPhoneError('Phone must be exactly 10 digits.');
                isValid = false;
            }
        }
        return isValid;
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (loading) return; // Prevent double submit

        const isValid = validate();
        if (!isValid) return;

        setLoading(true);
        const payload = { name: name.trim(), email: email.trim(), phone: phone.trim() || undefined };

        try {
            const resp = await registerUser(payload);
            // --- Key addition: Store user email locally ---
            localStorage.setItem('user_email', email.trim());
            // Registration succeeded
            console.log('Registration successful', resp);
            navigate('/questions');
        } catch (error) {
            // Handle registration errors
            console.error('Registration error', error);
            if (
                error?.response?.status === 409 ||
                error?.message === "User already registered with this email." ||
                error?.message === "API Error: 409" ||
                (error?.message && error?.message.includes("already registered"))
            ) {
                setError("User already registered with this email.");
            } else {
                setError(error?.message || 'Registration failed. Please try again later.');
            }

            try {
                localStorage.setItem('pending_registration', JSON.stringify(payload));
            } catch (ex) {
                console.warn('localStorage set failed', ex);
            }
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
                        <form onSubmit={handleSubmit} method='post'>
                            <label>Name *</label>
                            <input
                                type='text'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {nameError && <p className='zora_error' role='alert'>{nameError}</p>}

                            <label>Email *</label>
                            <input
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <p className='zora_error' role='alert'>{emailError}</p>}

                            <label>Contact</label>
                            <input
                                type='tel'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="10 digits"
                                maxLength={10}
                            />
                            {phoneError && <p className='zora_error' role='alert'>{phoneError}</p>}
                            {error && <p className='zora_error' role='alert'>{error}</p>}

                            <button className='zora_btn' type='submit' disabled={loading}>
                                {loading ? 'Registering…' : 'Register'}
                            </button>
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