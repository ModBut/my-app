import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { Router } from '../Contexts/Router';

export default function useAccounts() {

    const [accounts, setAccounts] = useState([]);
    const [createAccount, setCreatAccount] = useState(null);
    const [editAccount, setEditAccount] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [filterAccountBalance, setFilterAccountBalance] = useState('all');

    const { user, logout } = useContext(Auth);
    const { show401Page } = useContext(Router);

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
                            if (err.response.data.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                }
            });
    }, []);

    useEffect(() => {
        if (null !== createAccount) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/accounts?token=${user.token}` : `${SERVER_URL}/accounts`;

            axios.post(withTokenUrl, createAccount)
                .then(res => {
                    setCreatAccount(null);
                    setAccounts(a => a.map(account => account.id === res.data.uuid ? {...account, id: res.data.id} : account));
                })
                .catch(err => {
                    setCreatAccount(null);
                    setAccounts(a => a.filter(account => account.id !== createAccount.id));
                    if (err.response) {
                        if (err.response.status === 401) {
                            if (err.response.data.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                }
            });
        }
    }, [createAccount]);

    useEffect(() => {
        if (null !== editAccount) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/accounts/${editAccount.id}?token=${user.token}` : `${SERVER_URL}/accounts/${editAccount.id}`;
        
            axios.put(withTokenUrl, editAccount)
                .then(res => {
                    setEditAccount(null);
                    setAccounts(a => a.map(account => account.id === res.data.id ? { ...account } : account));
                })
                .catch(err => {
                    setEditAccount(null);
                    setAccounts(a => a.map(account => account.id === editAccount.id ? {...account.preEdit} : account));
                    if (err.response) {
                        if (err.response.status === 401) {
                            if (err.response.data.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                }
            });
        }
    }, [editAccount]);

    useEffect(() => {
        if (null !== deleteAccount) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/accounts/${deleteAccount}?token=${user.token}` : `${SERVER_URL}/accounts/${deleteAccount}`;

            axios.delete(withTokenUrl)
                .then(() => {
                    setDeleteAccount(null);
                    setAccounts(a => a.filter(account => account.id !== deleteAccount));
                })
                .catch(err => {
                    setDeleteAccount(null);
                    setAccounts(a => a.map(account => account.id === deleteAccount ? { ...account } : account));
                    if (err.response) {
                        if (err.response.status === 401) {
                            if (err.response.data.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                }
            });
        }
    }, [deleteAccount]);

    const filteredAccounts = accounts.filter(account => {
        if (filterAccountBalance === 'all') return true;
        if (filterAccountBalance === 'empty-accounts') return +account.accountBalance === 0;
        if (filterAccountBalance === 'accounts-with-funds') return +account.accountBalance > 0;
        return true;
    });

    return {
        accounts: filteredAccounts, 
        setAccounts,
        createAccount, 
        setCreatAccount,
        editAccount, 
        setEditAccount,
        deleteAccount, 
        setDeleteAccount,
        filterAccountBalance,
        setFilterAccountBalance
    };
}