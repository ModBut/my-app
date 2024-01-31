import { useContext, useState } from "react";
import TopNav from "../TopNav";
import { Accounts } from "../../Contexts/Accounts";

export default function Create(){


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const {setCreatAccount} =  useContext(Accounts);

    

    const add = () => {
        const account = {
            firstName,
            lastName,
            accountBalance: 0,
        };
        console.log(account);
        setCreatAccount(account);
    }

    return (
        <>
            <TopNav/>
            <div className="account-box bg-white shadow-sm mb-3">
                <div className="form-title">
                    <h1>Add New Accounts</h1>
                </div>
                <div className="form-body">
                    <label>First Name</label>
                    <div className="input-box">
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <label>Last Name</label>
                    <div className="input-box">
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </div>
                </div>
                <div className="button">
                    <button type="button" onClick={add}>Add</button>
                </div>
            </div>
            
        </>
    )
}