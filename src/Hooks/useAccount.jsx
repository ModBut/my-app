import { useContext, useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { Router } from '../Contexts/Router';
import { v4 as uuidv4 } from 'uuid';

export default function useAccounts() {

    const [accounts, setAccounts] = useState([]);
    const [createAccount, setCreatAccount] = useState(null);
    const [editAccount, setEditAccount] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [filterAccountBalance, setFilterAccountBalance] = useState('all');
    const [messages, setMessages] = useState([]);
    const [totalCount, setTotalCount] = useState(null);
    const [totalBalance, setTotalBalance] = useState(null);

    const { user, logout } = useContext(Auth);
    const { show401Page } = useContext(Router);

    const addMessage = useCallback((type, text) => {
        const id = uuidv4();
        setMessages((prevMessages) => [{ id, type, text }, ...prevMessages]);
        setTimeout(() => {
          setMessages((prevMessages) => prevMessages.filter((m) => m.id !== id));
        }, 4000);
      }, []);

      useEffect(() => {
        if (user) {
            return;
        }
        axios.get(`${SERVER_URL}/home`)
          .then(res => {
            setTotalBalance(res.data.totalBalance);
            setTotalCount(res.data.totalCount);
          })
          .catch(err => {
            console.log(err);
          });
      }, []);


    useEffect(() => {
        if (null === user) {
            return;
        }
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
            })
    }, []);

    useEffect(() => {
        if (null !== createAccount) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/accounts?token=${user.token}` : `${SERVER_URL}/accounts`;

            axios.post(withTokenUrl, createAccount)
                .then(res => {
                    setCreatAccount(null);
                    setAccounts(a => a.map(account => account.id === res.data.uuid ? {...account, id: res.data.id} : account));
                    addMessage(res.data.type, res.data.message);
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
                    addMessage(res.data.type, res.data.message);
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
                .then(res => {
                    setDeleteAccount(null);
                    setAccounts(a => a.filter(account => account.id !== deleteAccount));
                    addMessage(res.data.type, res.data.message);
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
        setFilterAccountBalance,
        messages,
        totalCount,
        totalBalance
    };
}