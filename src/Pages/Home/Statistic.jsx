import { useContext } from "react";
import TopNav from "../TopNav";
import { Statistic } from "../../Contexts/Statistic";

export default function Layout() {

    const {totalCount, totalBalance, average} = useContext(Statistic);

    return (
        <>
        <TopNav/>
        <div className="account-box bg-white shadow-sm mb-3">
                <h1>Home</h1>
              <div>Accounts Statistic</div>
                {
                    totalCount !== null && (<p>Total Account Number: {totalCount}</p>)
                }
                {
                    totalBalance !== null && (<p>Total Accounts Balance: {totalBalance.toFixed(2)} €</p>)
                }
                {
                    average !== null && (<p>Accounts Balance Average: {average.toFixed(2)} €</p>)
                }
            </div>
        </>
    )
}