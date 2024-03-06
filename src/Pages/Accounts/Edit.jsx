import { useContext, useEffect, useState, useRef } from "react";
import TopNav from "../TopNav";
import { Accounts } from "../../Contexts/Accounts";
import { Router } from "../../Contexts/Router";
import useImage from '../../Hooks/useImage'
import Confirm from "./Confirm";

export default function Edit() {

    const [account, setAccount] = useState(null);
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [error, setError] = useState('');  
    const [deleteImage, setDeleteImage] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const {accounts, setAccounts, setEditAccount, blocked, setBlocked} = useContext(Accounts);
    const {params} = useContext(Router);

    const { image, setImage, readImage } = useImage();

    const imageRef = useRef();

    useEffect(() => {
        setImage(account?.image);
    }, [account, setImage]);

    useEffect(() => {
        if (image && image !== account.image)
        setDeleteImage(true);
    }, [image, account])

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
    }, [accounts, params]);
    
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

    //   const addFunds = () => {
    //     const amount = parseFloat(transactionAmount);
    //     const updatedAccount = { ...account, accountBalance: account.accountBalance + amount };
    //     setAccount(updatedAccount);
    //     setTransactionAmount(0);
    // };

    // const addFunds = () => {
    //     const amount = parseFloat(transactionAmount);
    //     const updatedAccount = { ...account, accountBalance: account.accountBalance + amount };
        
    //     if (amount >= 1000) {
    //         const confirmation = window.confirm("Ar tikrai norite pridėti sumą didesnę nei 1000 eurų?");
    //         if (!confirmation) {
    //             return; // Jei naudotojas paspaudžia "Atšaukti", nutraukti pridėjimą
    //         }
    //     }
    //     setAccount(updatedAccount);
    //     setTransactionAmount(0);
    // }

        const addFunds = () => {
        const amount = parseFloat(transactionAmount);
        const updatedAccount = { ...account, accountBalance: account.accountBalance + amount };
        
        if (amount >= 1000) {
            setOpenConfirm(true);
            return;
        }
        setAccount(updatedAccount);
        setTransactionAmount(0);
    }

    const handleConfirm = () => {
        setOpenConfirm(false); 
        const amount = parseFloat(transactionAmount);
        const updatedAccount = { ...account, accountBalance: account.accountBalance + amount };
        setAccount(updatedAccount);
        setTransactionAmount(0);
    }


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

    const blockAccount = () => {
        setBlocked(true); 
    };

    const unblockAccount = () => {
        setBlocked(false);
    }

      const save = () => {

        const editedAccount = { 
            ...account,
            accountBalance: account.accountBalance,
            old: account,
            image: image,
            del: deleteImage,
            blocked: blocked
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
                    <h1>Edit Account</h1>
                </div>
                <div className="form-body">
                    <div>First Name: {account.firstName}</div>
                    <div>Last Name: {account.lastName}</div>
                    {!account.blocked && (
                <div>Account Balance: {account.accountBalance.toFixed(2)} €</div>
                    )}
                    {!account.blocked && (
                        <>
                    <div>
                        <label>Enter amount: </label>
                        <input type="number" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)}/>
                        <button type='button' onClick={addFunds}>Add Funds</button>
                        <button type='button' onClick={withdrawFunds}>Withdraw Funds</button>
                    </div>
                    <div>{error}</div>
                    </>
                    )}
                    
                    {!account.blocked && (
                        <>
                    <label>Upload your identify Card</label>
                    <div className="input-box">
                        <input ref={imageRef} type="file" className="form-control" onChange={readImage}/>
                        <button style={{
                            display: image ? 'block' : 'none'
                        }}
                        type="button" 
                        className="btn-close"
                        onClick={() => {
                            setDeleteImage(true);
                            setImage(null);
                            imageRef.current.value = null;
                        }}
                        >
                        </button>
                    </div>
                    </>
                    )}
                    {!account.blocked && (
                    <>
                        {
                            image && 
                            <div className="input-box">
                                <img src={image} alt='card' className="img-fluid"/>
                            </div>
                        }
                   </>
                    )}
                        <button type='button' onClick={save}>Save</button>
                        <button type='button' onClick={!account.blocked ? blockAccount : unblockAccount}>
                        {account.blocked ? 'Unblock Account' : 'Block Account'}
                        </button>
                        <button type="button" onClick={() => window.location.href = '#accounts'}>Cancle Edit</button>
                        
                </div>
                {openConfirm && <Confirm setOpenConfirm={setOpenConfirm} transactionAmount={transactionAmount} handleConfirm={handleConfirm}/>}
            </div>
            </>
    )
}