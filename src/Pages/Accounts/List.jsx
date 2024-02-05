import { useContext } from 'react';
import TopNav from '../TopNav';
import { Accounts } from '../../Contexts/Accounts';
import ShowAccounts from './ShowAccounts';

export default function List() {

    const {accounts} = useContext(Accounts);

    if (!accounts) 
        return (
          <div>
            <TopNav/>
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
              <div>Total accounts number:</div>
              <div>Total accounts balance:</div>
            </div>
            <div>
            <ul className="list-group list-group">
              {accounts
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
                .map((account) => (
                  <ShowAccounts key={account.id} account={account}/>
                ))}
            </ul>
            </div>
        </div>
    )
}