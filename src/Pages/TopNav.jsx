import { useContext } from "react";
import { CiLogin } from "react-icons/ci";
import { Auth } from "../Contexts/Auth";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { AiOutlineSearch } from "react-icons/ai";
import Gate from "./Auth/Gate";

export default function TopNav() {

    const {user, logout} = useContext(Auth);

    return (
        <>
        <nav sticky="top" className="bg-white shadow-sm mb-3">
            <div className="menu">
            <div>
            <span>DemoBank</span>
            <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" fill="#000000" viewBox="0 0 576 512"height="40px" width="50px" >
			<path d="M76.802,409.602c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h85.333c4.71,0,8.533-3.823,8.533-8.533     s-3.823-8.533-8.533-8.533h-8.533v-204.8h8.533c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533H76.802     c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h8.533v204.8H76.802z M102.402,204.802h34.133v204.8h-34.133V204.802z"/>
			<path d="M8.535,170.668h494.933c3.814,0,7.159-2.526,8.209-6.195c1.041-3.661-0.469-7.578-3.712-9.591L260.499,1.282     c-2.756-1.707-6.238-1.707-8.994,0L4.038,154.882c-3.243,2.014-4.753,5.931-3.712,9.591     C1.375,168.142,4.721,170.668,8.535,170.668z M256.002,18.579l217.54,135.023H38.461L256.002,18.579z"/>
			<path d="M34.135,452.268c0,4.71,3.823,8.533,8.533,8.533h426.667c4.71,0,8.533-3.823,8.533-8.533c0-4.71-3.823-8.533-8.533-8.533     H42.668C37.958,443.735,34.135,447.558,34.135,452.268z"/>
			<path d="M503.468,477.868H8.535c-4.71,0-8.533,3.823-8.533,8.533v17.067c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533     v-8.533h477.867v8.533c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-17.067     C512.002,481.691,508.179,477.868,503.468,477.868z"/>
			<path d="M213.335,409.602c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h85.333c4.71,0,8.533-3.823,8.533-8.533     s-3.823-8.533-8.533-8.533h-8.533v-204.8h8.533c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-85.333     c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h8.533v204.8H213.335z M238.935,204.802h34.133v204.8h-34.133V204.802z     "/>
			<path d="M349.868,409.602c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h85.333c4.71,0,8.533-3.823,8.533-8.533     s-3.823-8.533-8.533-8.533h-8.533v-204.8h8.533c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-85.333     c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h8.533v204.8H349.868z M375.468,204.802h34.133v204.8h-34.133V204.802z     "/>
            </svg>
            </div>
            <div>
                {
                    user && <span><a href='#profile'><CiUser className="icon"/>{user.user}</a></span>
                }
                {
                    user && <span> | </span>
                }
                {
                    user && <i onClick={logout}>Logout<CiLogout /></i>
                }
                {
                    !user && <a href='#register'>Register</a>
                }
                {
                    !user && <span> | </span>
                }
                {
                    !user && <a href="#login">Login<CiLogin /></a>
                }
                </div>
            </div>
            <div className="login">
            <div className="menu-bar">
            <a href="#home">Home</a>
            <Gate roles='admin|user|animal'><a href="#accounts">Accounts</a></Gate>
            <Gate roles='admin|user'><a href="#accounts/create">Add Account</a></Gate>
            <Gate roles='admin'><a href="#users">Users</a></Gate>
            <a href="#statistic">Accounts Statistic</a>
            <a href="#contacts">Contacts</a>
            </div>
            <div className='searchInput'>
                <AiOutlineSearch className='icon'/>
                <input type='text' placeholder='Search for anything...'/>
            </div>
            </div>
        </nav>
        </>
    )
}