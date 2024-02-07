import { useContext, useEffect, useState } from "react";
import TopNav from "../TopNav";
import { Accounts } from "../../Contexts/Accounts";
import { Router } from "../../Contexts/Router";

export default function Edit() {

    const [account, setAccount] = useState(null);
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [error, setError] = useState('');
    const {accounts, setAccounts, setEditAccount} = useContext(Accounts);
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
    
    useEffect(() => {
        if (null === account) {
            return;
        }
    }, [account]);


    if (!accounts) 
        return (
          <div>
            <TopNav/>
            <h1>Loading...</h1>
          </div>
      ); 

      if (!account) 
        return (
          <div>
            <TopNav/>
            <h1>Account Not Found</h1>
          </div>
      ); 

      const addFunds = () => {
        const amount = parseFloat(transactionAmount);
        const updatedAccount = { ...account, accountBalance: +account.accountBalance + amount };
        setAccount(updatedAccount);
        setTransactionAmount(0);
    };

    const withdrawFunds = () => {
        const amount = parseFloat(transactionAmount);
        if (!isNaN(amount) && amount > 0 && account.accountBalance >= amount) {
            const updatedAccount = { ...account, accountBalance: account.accountBalance - amount };
            setAccount(updatedAccount);
            setTransactionAmount(0);
        } else {
            setError('Nepakanka lėšų');
            setTransactionAmount(0);
        }
    };

    

      const save = () => {
        const editedAccount = { 
            ...account,
            accountBalance: account.accountBalance
        };
        setAccounts(a => a.map(account => account.id === editedAccount.id ? editedAccount : account));
        setEditAccount(editedAccount);
        window.location.href = '#accounts';
    };

    return (
        <>
        <TopNav/>
        <div className="account-box bg-white shadow-sm mb-3">
                <div className="form-title">
                    <h1>Edit Account Balance</h1>
                </div>
                <div className="form-body">
                    <div>First Name: {account.firstName}</div>
                    <div>Last Name: {account.lastName}</div>
                    <div>Account Balance: {account.accountBalance} €</div>
                    <div>
                        <label>Enter amount: </label>
                        <input type="number" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)}/>
                        <button type='button' onClick={addFunds}>Add Funds</button>
                        <button type='button' onClick={withdrawFunds}>Withdraw Funds</button>
                        <button type='button' onClick={save}>Save</button>
                        <button type="button" onClick={() => window.location.href = '#accounts'}>Cancle</button>
                    </div>
                    <div>{error}</div>
                </div>
            </div>
            </>
    )
}