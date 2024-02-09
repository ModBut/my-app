import { useContext } from 'react';
import TopNav from '../TopNav';
import { Users } from '../../Contexts/Users';
import ShowUsers from './ShowUsers';

export default function List() {

  const {users} = useContext(Users);

  if (!users) 
    return (
      <div>
          <TopNav />
          <h1>Loading...</h1>
      </div>
    );

  if (users.error)
    return (
      <div>
          <TopNav />
          <h1>Server Error</h1>
      </div>
    );

    return (
        <div>
            <TopNav/>
            <div className='account-box bg-white shadow-sm mb-3'>
              <div className="form-title">
                <h1>Users List</h1>
              </div>
            </div>
            <div>
            <ul className="list-group list-group shadow-sm">
                {
                    users.map(user => <ShowUsers key={user.id} user={user} />)
                }
            </ul>
            </div>
        </div>
    )
}
