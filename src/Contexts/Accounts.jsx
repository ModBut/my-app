import { createContext} from "react";
import useAccounts from "../Hooks/useAccount";

export const Accounts = createContext();

export const AccountsProvider = ({children}) => {


    const {accounts, setAccounts, 
        createAccount, setCreatAccount, 
        editAccount, setEditAccount, 
        deleteAccount, setDeleteAccount, 
        filterAccountBalance, setFilterAccountBalance, 
        messages, 
        totalCount, totalBalance, 
        blocked, setBlocked,
        sort,
        sorts, setSort, handlePayment} = useAccounts();

    return (
        <Accounts.Provider value={{
            accounts, setAccounts,
            createAccount, setCreatAccount,
            editAccount, setEditAccount,
            deleteAccount, setDeleteAccount,
            filterAccountBalance, setFilterAccountBalance,
            messages, totalCount,
            totalBalance,
            blocked, setBlocked,
            sort,
            sorts, setSort,
            handlePayment
        }}>
            {children}
        </Accounts.Provider>
    )

}