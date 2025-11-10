import './registaration.css';
import ai_face from'/deloitte 25 projects/zora fwd event/fwd_zora_frontend/src/assets/images/ai_face.png';

const Registration = () => {
    return (
        <div className='zora_reg'>
            <div className='zora_reg_left'>
                <div className='zora_reg_content'>
                    <div className='zora_heading'>
                        <h2><span>ZORA AI <sup>TM</sup></span></h2>
                        <p>By Deloitte</p>
                    </div>
                    <div className='zora_reg_form'>
                        <form action="/questions">
                            <label>Name * </label>
                            <input type="text" required />

                            <label>Email *</label>
                            <input type="email" required />

                            <label>Contact </label>
                            <input type="tel" required />

                            <button className='zora_btn' type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='zora_reg_right'>
                <div className='zora_reg_img'>
                    <img src={ai_face} alt="AI Face" />
                </div>

            </div>
        </div>
    );
};

export default Registration;