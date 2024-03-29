import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import useLogin from "../../Hooks/useLogin";
import { Auth } from "../../Contexts/Auth";
import { AFTER_LOGIN_URL, SITE_URL } from "../../Constants/main";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [setInputs, response] = useLogin();

    const {user} = useContext(Auth);

    const go = () => {
        setInputs({username, password});
        setPassword('');
    }

    useEffect(() => {
        if (user) {
            window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
        }
    }, [user])

    if (!user) {
    return (
        <div className="box">
        <div className='wrapper'>
        <form>
            <h1>Login</h1>
            <div className="response">
                {
                    response && !response.ok && <span>{response.message}</span>
                }
            </div>
            <div className='input-box'>
                <input type='text' 
                placeholder='UserName' value={username} onChange={e => setUsername(e.target.value)} required/>
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type='password' 
                placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required/>
                <FaLock className='icon'/>
            </div>
            <div className='remember-forgot'>
            <label><input type='checkbox'/>Remember me</label>
            <a href='#home'>Forgot password?</a>
            </div>
            <button type='button' onClick={go}>Login</button>
            <div className='register-link'>
                <p>Don't have an account? <a href='#register'>Register</a></p>
                <p>Return <a href="#home">Home</a></p>
            </div>
        </form>
    </div>
    </div>
    )
}
else {
    return null;
}
}