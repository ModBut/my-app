import { useState, createContext, useEffect} from "react";
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
// import { Accounts } from "./Accounts";

export const Statistic = createContext();

export const StatisticProvider = ({children}) => {

    const [totalBalance, setTotalBalance] = useState(null);
    const [totalCount, setTotalCount] = useState(null);
    const [average, setAverage] = useState(null);

    // const {setAccounts} = useContext(Accounts);

    useEffect(() => {
        axios.get(`${SERVER_URL}/statistic`)
            .then(res => {
                setTotalBalance(res.data.totalBalance);
                setTotalCount(res.data.totalCount);
                setAverage(res.data.average);
            })
            .catch(err => {
                console.log(err);
            });
    }, [setTotalBalance, setTotalCount, setAverage]);

    return (
        <Statistic.Provider value={{
            totalBalance, totalCount,
            average
        }}>
            {children}
        </Statistic.Provider>
    )
}