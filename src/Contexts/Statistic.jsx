import { useState, createContext, useEffect} from "react";
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';


export const Statistic = createContext();

export const StatisticProvider = ({children}) => {

    const [totalBalance, setTotalBalance] = useState(null);
    const [totalCount, setTotalCount] = useState(null);
    const [average, setAverage] = useState(null);
    const [accountsWithoutImage, setAccountsWithoutImage] = useState(null);
    const [accountWithZeroBalance, setAccountWithZeroBalance] = useState(null);
    const [accountsWitNegativeBalance, setAccountsWitNegativeBalance] = useState(null);
    const [accountsWithBalance, setAccountsWithBalance] = useState(null);

    useEffect(() => {
        axios.get(`${SERVER_URL}/statistic`)
            .then(res => {
                setTotalBalance(res.data.totalBalance);
                setTotalCount(res.data.totalCount);
                setAverage(res.data.average);
                setAccountsWithoutImage(res.data.accountsWithoutImage);
                setAccountWithZeroBalance(res.data.accountWithZeroBalance)
                setAccountsWitNegativeBalance(res.data.accountsWitNegativeBalance)
                setAccountsWithBalance(res.data.accountsWithBalance)
    
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <Statistic.Provider value={{
            totalBalance, totalCount,
            average, accountsWithoutImage,
            accountWithZeroBalance, accountsWitNegativeBalance,
            accountsWithBalance, 
        }}>
            {children}
        </Statistic.Provider>
    )
}