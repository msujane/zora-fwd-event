import './admin_scores.css';

const Adminscores = () => {
    const data = [
        { name: "Alice Johnson das basu", Email: "mayus@deloitte.com", Score: 9 },
        { name: "Brian Lee", Email: "brian.lee@example.com", Score: 8 },
        { name: "Chen Wang", Email: "chen.wang@example.com", Score: 7 },
        { name: "Dia Patel", Email: "dia.patel@example.com", Score: 6 },
        { name: "Emily Smith", Email: "emily.smith@example.com", Score: 5 }
    ];
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
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.Score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Adminscores;