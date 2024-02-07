import { useContext, useState } from "react";
import TopNav from "../TopNav";
import { Accounts } from "../../Contexts/Accounts";
import { v4 as uuidv4 } from 'uuid';

export default function Create(){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const {setCreatAccount, setAccounts } =  useContext(Accounts);

    const accountNumber = generateAccountNumber();
        function generateAccountNumber() {
            const prefix = 'LT';
            const randomNumber1 = rand(855558488, 9641161618).toString().padStart(10, '0');
            const randomNumber2 = rand(855558488, 98416151318).toString().padStart(11, '0');
        return `${prefix}${randomNumber1}${randomNumber2}`;
    }
        function rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const add = () => {
        const account = {
            firstName,
            lastName,
            accountBalance: 0,
            accountNumber,
            id : uuidv4()
        };
        setAccounts(a => [...a, {...account}]);
        setCreatAccount(account);
        window.location.href = '#accounts';
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