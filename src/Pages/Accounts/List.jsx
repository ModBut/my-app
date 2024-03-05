import { useContext, useEffect, useState } from 'react';
import TopNav from '../TopNav';
import { Accounts } from '../../Contexts/Accounts';
import ShowAccounts from './ShowAccounts';
import axios from 'axios';
import { SERVER_URL } from '../../Constants/main';
import { Auth } from '../../Contexts/Auth';



export default function List() {

  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const { user} = useContext(Auth);

  const {accounts, setFilterAccountBalance, filterAccountBalance, setAccounts, editAccount, setEditAccount} = useContext(Accounts);

  useEffect(() => {
    setTotalAccounts(accounts.length);
    setTotalBalance(accounts.reduce((sum, account) => sum + account.accountBalance, 0));
  }, [accounts]);

  

  const sortedAccounts = () => {
    const sortedArray = [...accounts].sort((a, b) => a.lastName.localeCompare(b.lastName));
    setAccounts(sortedArray);
  }

  const handlePayment = () => {
    const updatedAccounts = [...accounts];
    updatedAccounts.forEach(account => {
        if (account.accountBalance) {
            account.accountBalance -= 5;
        } else if (account.accountBalance === 0) {
          account.accountBalance -= 5
        }
        setAccounts(updatedAccounts)
    });
    
    updatedAccounts.forEach(account => {
      const withTokenUrl = user ? `${SERVER_URL}/accounts/${account.id}?token=${user.token}` : `${SERVER_URL}/accounts/${account.id}`;

      const toServer = { accountBalance: account.accountBalance };
      axios.put(withTokenUrl, toServer)
        .then(() => {
          setAccounts(updatedAccounts);
        })
        .catch(err => {
          console.log(err)
        });
    });

    if (editAccount) {
      setEditAccount(updatedAccounts);
    }
  }

  const sortAccountsByBalance = (order) => {
    const sortedAccounts = [...accounts].sort((a, b) => {
      if (order === 'asc') {
        return a.accountBalance - b.accountBalance;
      } else {
        return b.accountBalance - a.accountBalance;
      }
    });
    setAccounts(sortedAccounts);
  };


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
            <div className='account-box bg-white shadow-sm mb-3 flex'>
              <div className="form-title">
                <h1>Accounts List</h1>
              </div>
              <div>Accounts Statistic</div>
              <div>Total accounts number: {totalAccounts}</div>
              <div>Total accounts balance: {totalBalance.toFixed(2)} €</div>

            <div className='sort-box'>
            <select  value={filterAccountBalance} onChange={e => setFilterAccountBalance(e.target.value)}>
                <option value="all">Filter Account Balance</option>
                <option value="all">All Accounts</option>
                <option value="empty-accounts">Empty Accounts</option>
                <option value="accounts-with-funds">Accounts with Funds</option>
                <option value="accounts-with--funds">Accounts with - Funds</option>
            </select>
            <div class="dropdown">
                <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort Accounts
                </button>
                <ul className="dropdown-menu">
                  <li><label onClick={() => sortAccountsByBalance('asc')}> Balance low to high</label></li>
                  <li><label onClick={() => sortAccountsByBalance('desc')}>Balance high to low</label></li>
                  <li onClick={sortedAccounts}>Accounts by last name</li>
                </ul>
            </div>
            <label onClick={handlePayment}>Payment</label>
            </div>
            </div>
            <div>
            <ul className="list-group list-group shadow-sm">
            {accounts.map((account) => (
                <ShowAccounts key={account.id} account={account} />
            ))}
        </ul>
            </div>
        </div>
    )
}
