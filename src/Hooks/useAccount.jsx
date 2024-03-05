import { useContext, useEffect, useState} from "react";
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
    const [blocked, setBlocked] = useState(false);

    const { user, logout } = useContext(Auth);

    const { show401Page } = useContext(Router);


    const sorts = [
        {name: 'default', value: 'default'},
        {name: 'accountBalance_asc', value: 'accountBalance 1-9'},
        {name: 'accountBalance_desc', value: 'accountBalance 9-1'},
      ]
      const [sort, setSort] = useState('default');

  
    useEffect(() => {
        if (null === user) {
            return;
        }
            const withTokenUrl = 
            user ? `${SERVER_URL}/accounts?token=${user.token}` : `${SERVER_URL}/accounts`;
            axios.get(withTokenUrl)
                .then(res => {
                    setAccounts(res.data);
                    setAccounts(accounts => accounts.map(account => ({
                        ...account,
                        image: account.image ? SERVER_URL + '/' + account.image : null
                    })));
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
    }, [sort]);

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
            const toServer = {...editAccount}
            if (editAccount.image === editAccount.old.image) {
                toServer.image = null;
            }
            console.log(toServer)
            axios.put(withTokenUrl, toServer)
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
                .then(res => {
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
        if (filterAccountBalance === 'empty-accounts') return account.accountBalance === 0;
        if (filterAccountBalance === 'accounts-with-funds') return account.accountBalance > 0;
        if (filterAccountBalance === 'accounts-with--funds') return account.accountBalance < 0;
        
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
        blocked, 
        setBlocked,
        sorts,
        setSort, sort,
    };
}