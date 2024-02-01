export default function ShowAccounts({account}) {

    return (
        <li className='account-box bg-white shadow-sm mb-3'>
            <div className="list-group-item">First Name: <span className="account-list">{account.firstName}</span></div>
            <div className="list-group-item">Last Name: <span className="account-list">{account.lastName}</span></div>
            <div className="list-group-item">Account Number: <span className="account-list">{account.accountNumber}</span></div>
            <div className="list-group-item">Account Balance: <span className="account-list">{account.accountBalance} €</span></div>
        </li>
    )
}