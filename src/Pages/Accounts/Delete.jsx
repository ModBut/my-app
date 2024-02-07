import { useContext, useState, useEffect} from "react";
import TopNav from "../TopNav";
import { Accounts } from "../../Contexts/Accounts";
import { Router } from "../../Contexts/Router";

export default function Delete(){

    const [account, setAccount] = useState(null);
    const [error, setError] = useState('');
    const {setDeleteAccount, setAccounts, accounts } =  useContext(Accounts);
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

    const doDelete = () => {
        if (+account.accountBalance === 0) {
            const accountid = account.id;
            setAccounts(a => a.filter(account => account.id === accountid ? {...account, preEdit: account} : account));
            setDeleteAccount(accountid);
            window.location.href = '#accounts';
        } else {
          setError("Sąskaitos turinčios lėšų ištrinti negalima!");
        }
      };


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

    return (
        <>
            <TopNav/>
            <div className="account-box bg-white shadow-sm mb-3">
                <div className="form-title">
                    <h1>Confirm delete Account</h1>
                </div>
                <div className="form-body">
                    <div>First Name: {account.firstName}</div>
                    <div>Last Name: {account.lastName}</div>
                    <div>Account Number: {account.accountNumber}</div>
                    <div>{error}</div>
                </div>
                <div className="button">
                    <button type="button" onClick={doDelete}>Delete</button>
                    <button type="button" onClick={() => window.location.href = '#accounts'}>Cancel</button>
                </div>
            </div>
        </>
    )
}