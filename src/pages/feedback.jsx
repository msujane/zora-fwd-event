import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Feedback(){
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    try{ localStorage.setItem('quiz_feedback', text); }catch(e){}
    navigate('/score');
  }

  return (
    <div className="register-page">
      <div className="register-wrapper">
        <div className="intro">
          <h1>ZORA AI<sup className="tm">TM</sup></h1>
          <p className="intro-sub">We'd love your feedback</p>
        </div>

        <div className="glass-card">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-title">Feedback</div>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Write your feedback here" style={{minHeight:120,padding:12,borderRadius:8,border:'1px solid rgba(255,255,255,0.06)',background:'rgba(255,255,255,0.02)',color:'#fff'}} />

            <div className="actions">
              <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
