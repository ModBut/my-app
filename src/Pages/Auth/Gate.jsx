import { useContext } from "react"
import { Auth } from "../../Contexts/Auth"

export default function Gate({ children, roles }) {

    const { user } = useContext(Auth);

    const hasRole = () => {
        const rolesArray = roles.split('|');
        return user && rolesArray.includes(user.role);
    }

    return (
        <>
            {
                hasRole() && children
            }
        </>
    );
}