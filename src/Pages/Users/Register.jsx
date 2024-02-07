import Page404 from '../Page404';
import { UsersProvider } from '../../Contexts/Users';
import Create from './Create';

export default function Register({ to }) {

    let returnComponent = <Page404 />;

    if (to === 'register') {
        returnComponent = <Create/>
    }

    return (
        <UsersProvider>
            {returnComponent}
        </UsersProvider>
    )
}