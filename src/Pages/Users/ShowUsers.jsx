export default function ShowUsers({user}) {

    return (
        <li className='account-box bg-white shadow-sm mb-3'>
            <div className="list-group-item">User name: <span className="account-list">{user.name}</span></div>
            <div className="list-group-item">User role: <span className="account-list">{user.role}</span></div>
            <div className="button right">
            <button><a href={'#users/edit/' + user.id}>Change role</a></button>
            <button><a href={'#users/delete/' + user.id}>Delete</a></button>
            </div>
        </li>
    )
}