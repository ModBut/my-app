import { useContext } from "react";
import TopNav from "../TopNav";
import { Statistic } from "../../Contexts/Statistic";

export default function Layout() {

    const {totalCount, totalBalance, average, accountsWithoutImage, accountWithZeroBalance, accountsWitNegativeBalance,
        accountsWithBalance} = useContext(Statistic);

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
                {
                    accountsWithoutImage !== null && (<p>Accounts without image: {accountsWithoutImage}</p>)
                }
                {
                    accountWithZeroBalance !== null && (<p>Accounts with Zero Funds: {accountWithZeroBalance}</p>)
                }
                {
                    accountsWitNegativeBalance !== null && (<p>Accounts with Negative Balanse: {accountsWitNegativeBalance}</p>)
                }
                {
                    accountsWithBalance !== null && (<p>Accounts with Funds: {accountsWithBalance}</p>)
                }
            </div>
        </>
    )
}