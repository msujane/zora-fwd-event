import React, { useEffect, useState } from 'react';
import './questions.css';
import QUESTIONS from './questionData';
import { useNavigate } from 'react-router-dom';

 
function shuffle(a){
    return a.slice().sort(()=>Math.random()-0.5);
}
 
export default function Questions(){
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState({});
 
    useEffect(()=>{
        // pick 10 random questions
        const picked = shuffle(QUESTIONS).slice(0,10);
        setQuiz(picked);
        try{ localStorage.setItem('current_quiz', JSON.stringify(picked)); }catch(e){}
    },[]);
 
    const handleSelect = (qIdx, optIdx)=>{
        setAnswers(prev=>({ ...prev, [qIdx]: optIdx }));
    }
 
        const handleSubmit = (e)=>{
            e.preventDefault();
            // ensure all questions are answered
            if(Object.keys(answers).length !== quiz.length){
                // shouldn't happen because submit button is disabled until complete, but guard anyway
                alert('Please answer all questions before submitting.');
                return;
            }
            // save answers to localStorage and go to feedback
            try{ localStorage.setItem('quiz_answers', JSON.stringify(answers)); }catch(e){}
            navigate('/feedback');
        }
 
    if(!quiz || quiz.length===0) return (
        <div className="register-page">
            <div className="register-wrapper">
                <div className="intro"><h1>ZORA AI</h1><p className="intro-sub">Preparing questions…</p></div>
            </div>
        </div>
    )
 
        const allAnswered = quiz.length > 0 && Object.keys(answers).length === quiz.length;
 
        return (
        <div className="register-page">
            <div className="register-wrapper">
                <div className="zora_heading_center">
                    <h1><span>ZORA AI<sup>TM</sup></span></h1>
                    <h3>Answer the following {quiz.length} questions</h3>
                </div>
 
                <div className="zora_que_container">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <div className="zora_que_mcq">
                        {quiz.map((q, i)=> (
                            <div key={q.id}>
                                    <div>{i+1}. {q.q}</div>
                                    <div style={{display:'grid',gridTemplateColumns:'1fr',gap:8,marginTop:8}}>
                                    {q.options.map((opt, oi)=> (
                                            <label key={oi} className="zora_option_label">
                                                <input type="radio" name={`q-${i}`} checked={answers[i]===oi} onChange={()=>handleSelect(i, oi)} />
                                                <span className="option-text">{opt}</span>
                                            </label>
                                    ))}
                            </div>
                            </div>
                        ))}
 </div>
                            <div className='zora_que_btn'>
                                {!allAnswered && <div style={{color:'#ffd7a8',marginBottom:8}}>Please answer all questions to enable submission</div>}
                                    <button className="zora_btn" type="submit" disabled={!allAnswered}>Submit Answers</button>
                               
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}