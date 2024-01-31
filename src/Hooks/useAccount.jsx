import { useEffect, useState } from "react";
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';


export default function useAccounts() {

    const [accounts, setAccounts] = useState([]);
    const [createAccount, setCreatAccount] = useState(null);
    const [editAccount, setEditAccount] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);

    useEffect(() => {
        axios.get(`${SERVER_URL}/accounts`)
            .then(res => {
                setAccounts(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (null !== createAccount) {
            axios.post(`${SERVER_URL}/accounts`, createAccount)
                .then(() => {
                    setCreatAccount(null);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [createAccount]);

    return {
        accounts, 
        setAccounts,
        createAccount, 
        setCreatAccount,
        editAccount, 
        setEditAccount,
        deleteAccount, 
        setDeleteAccount
    };
}