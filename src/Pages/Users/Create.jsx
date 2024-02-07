import { useContext, useState } from "react";
import TopNav from "../TopNav";
import { v4 as uuidv4 } from 'uuid';
import { Users } from "../../Contexts/Users";

export default function Create(){

    const [name, setName] = useState('');
    const [password, setpassword] = useState('');

    const {setCreateUser } =  useContext(Users);

    const register = () => {
        const user = {
            name,
            password,
            id : uuidv4()
        };
        setCreateUser(user);
        window.location.href = '#login';
    }

    return (
        <>
            <TopNav/>
            
            <div className="account-box bg-white shadow-sm mb-3">
                <div className="form-title">
                    <h1>Register</h1>
                </div>
                <div className="form-body">
                    <label>Name</label>
                    <div className="input-box">
                        <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <label>Password</label>
                    <div className="input-box">
                        <input type="password" value={password} onChange={e => setpassword(e.target.value)}/>
                    </div>
                </div>
                <div className="button">
                    <button type="button" onClick={register}>Register</button>
                </div>
            </div>
            
        </>
    )
}