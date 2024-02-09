import { useContext, useEffect, useState } from 'react';
import TopNav from '../TopNav';
import { Accounts } from '../../Contexts/Accounts';
import ShowAccounts from './ShowAccounts';
import Messages from "../Messages";

export default function List() {

  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  
  const {accounts, setFilterAccountBalance, filterAccountBalance, messages} = useContext(Accounts);

  useEffect(() => {
    setTotalAccounts(accounts.length);
    setTotalBalance(accounts.reduce((sum, account) => sum + +account.accountBalance, 0));
  }, [accounts]);

  if (!accounts) 
    return (
      <div>
          <TopNav />
          <h1>Loading...</h1>
      </div>
    );

      
    return (
        <div>
            <TopNav/>
            <div className='account-box bg-white shadow-sm mb-3'>
              <div className="form-title">
                <h1>Accounts List</h1>
              </div>
              <div>Accounts Statistic</div>
              <div>Total accounts number: {totalAccounts}</div>
              <div>Total accounts balance: {totalBalance} €</div>
            </div>
            <label>Filter by Account Balance:</label>
            <select  value={filterAccountBalance} onChange={e => setFilterAccountBalance(e.target.value)}>
                <option value="all">All Accounts</option>
                <option value="empty-accounts">Empty Accounts</option>
                <option value="accounts-with-funds">Accounts with Funds</option>
            </select>
            <div>
            <ul className="list-group list-group shadow-sm">
              {accounts
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
                .map((account) => (
                  <ShowAccounts key={account.id} account={account}/>
                ))}
            </ul>
            </div>
            <Messages messages={messages}/>
        </div>
    )
}
