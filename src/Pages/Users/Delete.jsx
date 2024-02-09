import { useContext, useState, useEffect} from "react";
import TopNav from "../TopNav";
import { Router } from "../../Contexts/Router";
import { Users } from "../../Contexts/Users";

export default function Delete(){

    const [user, setUser] = useState(null);
    const {setDeleteUser, setUsers, users } =  useContext(Users);
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

    const doDelete = () => {
            const userid = user.id;
            setUsers(u => u.filter(user => user.id === userid ? {...user} : user));
            setDeleteUser(userid);
            window.location.href = '#users';
      };

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
                    <h1>Confirm delete User</h1>
                </div>
                <div className="form-body">
                    <div>User Name: {user.name}</div>
                </div>
                <div className="button">
                    <button type="button" onClick={doDelete}>Delete</button>
                    <button type="button" onClick={() => window.location.href = '#users'}>Cancel</button>
                </div>
            </div>
        </>
    )
}