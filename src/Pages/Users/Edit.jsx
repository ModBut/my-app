import { useContext, useState, useEffect} from "react";
import TopNav from "../TopNav";
import { Router } from "../../Contexts/Router";
import { Users } from "../../Contexts/Users";

export default function Delete(){

    const [role, setRole] = useState('');
    const [user, setUser] = useState(null);
    const {setEditUser, setUsers, users } =  useContext(Users);
    const {params} = useContext(Router);

    useEffect(() => {
        if (null === users) {
            return;
        }
        const user = users.find(user => user.id === +params[1]);
        if (!user) {
            setUser(null);
        } else {
            setUser(user);
        }
    }, [users, params[1]]);

    useEffect(() => {
        if (null === user) {
            return;
        }
        setRole(user.role.toLowerCase());
    }, [user, setRole]);

    const save = _ => {
        const editedUser = {
            role,
            name: user.name,
            id: user.id,
        };
        setUsers(f => f.map(user => user.id === editedUser.id ? { ...editedUser, temp: true, preEdit: user } : user));
        setEditUser(editedUser);
        window.location.href = '#users';
    }

    if (!users) 
        return (
          <div>
            <TopNav/>
            <h1>Loading...</h1>
          </div>
      ); 

      if (!user) 
        return (
          <div>
            <TopNav/>
            <h1>User Not Found</h1>
          </div>
      );

    return (
        <>
            <TopNav/>
            <div className="account-box bg-white shadow-sm mb-3">
                <div className="form-title">
                    <h1>Change Role</h1>
                </div>
                <div className="form-body">
                    <div>User Name: {user.name}</div>
                    <div>
                        <input id='admin' type='checkbox' checked={'admin' === role} onChange={() => setRole('admin')}/>
                        <label htmlFor="admin">Admin</label>
                    </div>
                    <div>
                        <input id='user' type='checkbox' checked={'user' === role} onChange={() => setRole('user')}/>
                        <label htmlFor="user">User</label>
                    </div>
                    <div>
                        <input id='animal' type='checkbox' checked={'animal' === role} onChange={() => setRole('animal')}/>
                        <label htmlFor="animal">Animal</label>
                    </div>
                </div>
                <div className="button">
                    <button type="button" onClick={save}>Change</button>
                    <button type="button" onClick={() => window.location.href = '#users'}>Cancel</button>
                </div>
            </div>
        </>
    )
}