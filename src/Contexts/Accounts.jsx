import { createContext} from "react";
import useAccounts from "../Hooks/useAccount";

export const Accounts = createContext();

export const AccountsProvider = ({children}) => {


    const {accounts, setAccounts, createAccount, setCreatAccount, editAccount, setEditAccount, deleteAccount, setDeleteAccount} = useAccounts();

    return (
        <Accounts.Provider value={{
            accounts, setAccounts,
            createAccount, setCreatAccount,
            editAccount, setEditAccount,
            deleteAccount, setDeleteAccount
        }}>
            {children}
        </Accounts.Provider>
    )

}