import React, { useEffect, useState } from 'react';
import './admin_scores.css';
import { getAllUsers } from '../api/api';

const Adminscores = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const users = await getAllUsers();
                setData(users);
            } catch (err) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='zora_as'>
            <div className='zora_as_header'>
                <div className='zora_heading_center'>
                    <h2><span>ZORA AI <sup>TM</sup></span></h2>
                </div>
            </div>
            <div className='zora_as_content'>
                <div className='zora_as_winner'>
                    <a className='zora_btn' href='/admin_winner'>Click to see winner</a>
                </div>
                <div className='zora_as_table'>
                    <h3>score table</h3>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div style={{ color: 'red' }}>{error}</div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Score</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0
                                    ? (
                                        <tr>
                                            <td colSpan={5}>No data to display.</td>
                                        </tr>
                                    )
                                    : (data
                                        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                                        .map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.score ?? '-'}</td>
                                                <td>{item.feedback || '-'}</td>
                                            </tr>
                                        )))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Adminscores;