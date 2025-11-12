import React, { useEffect, useState } from 'react';
import './admin_winner.css';
import { winner1, winner2, winner3, medal1, medal2, medal3 } from '../assets/svg.js';
import { getTopWinners } from '../api/api';

const Adminwinner = () => {
    const [winners, setWinners] = useState(['', '', '']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getTopWinners()
            .then(winnerNames => {
                setWinners([winnerNames[0] || '', winnerNames[1] || '', winnerNames[2] || '']);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load winner names.');
                setLoading(false);
            });
    }, []);

    const winnerSvgs = [winner1, winner2, winner3];
    const medalSvgs = [medal1, medal2, medal3];

    return (
        <div className='zora_aw'>
            <div className='zora_aw_header'>
                <div className='zora_heading_center'>
                    <h2><span>ZORA AI <sup>TM</sup></span></h2>
                </div>
            </div>
            <div className='zora_aw_content'>
                {loading && <div>Loading...</div>}
                {error && <div className="zora_aw_error">{error}</div>}
                {!loading && !error && [0, 1, 2].map(idx => (
                    <div className='zora_aw_place' key={idx}>
                        {winnerSvgs[idx]}
                        {medalSvgs[idx]}
                        <span>{winners[idx] || '—'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Adminwinner;