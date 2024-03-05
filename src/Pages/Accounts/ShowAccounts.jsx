import Gate from "../Auth/Gate";
import { SERVER_URL } from "../../Constants/main";

export default function ShowAccounts({account}) {


    return (

        <li className={`account-box bg-white shadow-sm mb-3 ${account.blocked ? 'blocked' : ''}`}>
            <div className="row mt-4">
            <div className="col-9">
            <div className="list-group-item">First Name: <span className="account-list">{account.firstName}</span></div>
            <div className="list-group-item">Last Name: <span className="account-list">{account.lastName}</span></div>
            <div className="list-group-item">Account Number: <span className="account-list">{account.accountNumber}</span></div>
            <div className="list-group-item">Account Balance: <span className="account-list">{account.accountBalance.toFixed(2)} €</span></div>
            <div className="button right">
            <Gate roles='admin|user'><button><a href={'#accounts/edit/' + account.id}>{account.blocked ? 'Unblock Account' : 'Edit Account'}</a></button></Gate>
            <Gate roles='admin'><button><a href={'#accounts/delete/' + account.id}>Delete Account</a></button></Gate>
            </div>
            </div>
            <div className="col-3">
                {
                    account.image && <img src={account.image} alt='card' className="img-fluid"/>
                }
                {
                    !account.image && <img src={SERVER_URL + '/images/NoFound.jpg'} alt="noimage" className="img-fluid"/>
                }
            </div>
            </div>
        </li>
    )
}