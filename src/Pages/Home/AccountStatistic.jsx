import TopNav from "../TopNav"
import { useContext} from "react";
import { Accounts } from "../../Contexts/Accounts";

export default function AccountStatistic() {

    const {totalCount, totalBalance} = useContext(Accounts);

    return (
        <div>
            <TopNav/>
            <div className="account-box bg-white shadow-sm mb-3">
                <h1>Home</h1>
              <div>Accounts Statistic</div>
                {
                    totalCount !== null && (<p>Total Account Number: {totalCount}</p>)
                }
                {
                    totalBalance !== null && (<p>Total Balance: ${totalBalance.toFixed(2)}</p>)
                }
            </div>
        </div>
    )
}