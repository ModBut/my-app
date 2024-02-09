import TopNav from "../TopNav";
import Gate from "../Auth/Gate";
import { useContext } from "react";
import { Auth } from "../../Contexts/Auth";

export default function Profile() {

    const {user} = useContext(Auth);

    return (
        <div>
            <TopNav/>
            <div className="content">
                <p>Welcome to the home page</p>
                <p>Click on the links above to navigate</p>
                <Gate roles="user|animal"><a href={'#users/delete/' + user?.id}>Delete account</a></Gate>
            </div>
        </div>
    )
}