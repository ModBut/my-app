import TopNav from '../TopNav';
import { useState, useEffect, useContext } from 'react';
import { Router } from '../../Contexts/Router';
import { Accounts } from '../../Contexts/Accounts';

export default function BlockAccount() {

    const [account, setAccount] = useState(null);
    const {accounts, setAccounts} =  useContext(Accounts);
    const {params} = useContext(Router);

    useEffect(() => {
        if (null === accounts) {
            return;
        }
        const account = accounts.find(account => account.id === +params[1]);
        if (!account) {
            setAccount(null);
        } else {
            setAccount(account);
        }
    }, [accounts, params[1]]);

    const blockAccount = () => {
        const blockedAccount = { ...account, blocked: 1 };
        setAccounts(a => a.map(account => account.id === blockedAccount.id ? blockedAccount : account));
    };


    return (
        <>
            <TopNav/>
            <div className="account-box bg-white shadow-sm mb-3">
                <div className="form-title">
                    <h1>Confirm block Account</h1>
                </div>
                <div className="form-body">
                    <div>First Name: {account?.firstName}</div>
                    <div>Last Name: {account?.lastName}</div>
                    <div>Account Number: {account?.accountNumber}</div>
                </div>
                <div className="button">
                    <button type="button" onClick={blockAccount}>Block Account</button>
                    <button type="button" onClick={() => window.location.href = '#accounts'}>Cancel</button>
                </div>
            </div>
        </>
    )
}