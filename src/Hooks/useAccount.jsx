import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';

export default function useAccounts() {

    const [accounts, setAccounts] = useState([]);
    const [createAccount, setCreatAccount] = useState(null);
    const [editAccount, setEditAccount] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);

    const { user, logout } = useContext(Auth);

    useEffect(() => {
        const withTokenUrl = 
        user ? `${SERVER_URL}/accounts?token=${user.token}` : `${SERVER_URL}/accounts`;
        axios.get(withTokenUrl)
            .then(res => {
                setAccounts(res.data);
                console.log(res.data);
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        logout();
                    }
                }
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (null !== createAccount) {
            axios.post(`${SERVER_URL}/accounts`, createAccount)
                .then(res => {
                    setCreatAccount(null);
                    setAccounts(a => a.map(account => account.id === res.data.uuid ? {...account, id: res.data.id} : account));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [createAccount]);

    useEffect(() => {
        if (editAccount !== null) {
            axios.put(`${SERVER_URL}/accounts/${editAccount.id}`, editAccount)
                .then(res => {
                    setEditAccount(null);
                    setAccounts(a => a.map(account => account.id === res.data.id ? { ...res.data } : account));
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [editAccount]);

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