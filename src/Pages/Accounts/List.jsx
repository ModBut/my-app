import { useContext } from 'react';
import TopNav from '../TopNav';
import { Accounts } from '../../Contexts/Accounts';
import ShowAccounts from './ShowAccounts';

export default function List() {

    const {accounts} = useContext(Accounts);

    return (
        <div>
            <TopNav/>
            <div className='account-box bg-white shadow-sm mb-3'>
            <h1>Accounts List</h1>
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