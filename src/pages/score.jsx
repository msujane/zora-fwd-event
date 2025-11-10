import React, { useEffect, useState } from 'react';
import './score.css';


export default function Score(){
	const [score, setScore] = useState(null);
	const [total, setTotal] = useState(0);
	const [breakdown, setBreakdown] = useState([]);

	useEffect(()=>{
		try{
			const quiz = JSON.parse(localStorage.getItem('current_quiz') || '[]');
			const answers = JSON.parse(localStorage.getItem('quiz_answers') || '{}');
			const bd = quiz.map((q, i)=>{
				const selected = typeof answers[i] !== 'undefined' ? answers[i] : null;
				const correct = q.correctIndex;
				return { q: q.q, selected, correct, correctText: q.options[correct], selectedText: selected!==null? q.options[selected] : null };
			});
			const s = bd.reduce((acc, cur)=> acc + (cur.selected === cur.correct ? 1:0), 0);
			setBreakdown(bd);
			setScore(s);
			setTotal(bd.length);
		}catch(e){ console.warn(e) }
	},[]);

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
					</div>

					{/* <div style={{marginTop:16}}>
						{breakdown.map((b, idx)=> (
							<div key={idx} style={{padding:10,borderTop:'1px solid rgba(255,255,255,0.03)'}}>
								<div style={{fontWeight:600}}>{idx+1}. {b.q}</div>
								<div style={{marginTop:6,color:'var(--muted)'}}>Your answer: {b.selectedText ?? 'No answer'}</div>
								<div style={{color:'#b7f5d5'}}>Correct: {b.correctText}</div>
							</div>
						))}
					</div> */}
				</div>
					<h2 className='zora_heading_center'><span>THANKYOU</span></h2>
				
			</div>
		</div>
	)
}

