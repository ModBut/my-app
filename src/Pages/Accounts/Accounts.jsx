import { useContext } from 'react';
import { Router } from '../../Contexts/Router';
import Page404 from '../Page404';
import List from './List';
import Create from './Create';
import { AccountsProvider } from '../../Contexts/Accounts';

export default function Accounts() {

    const params = useContext(Router);

    let returnComponent = <Page404 />;

    if (params.length === 0) {
        returnComponent = <List />;

    } else if (params.length === 1 && params[0] === 'create') {
        returnComponent = <Create />;
    }

    return (
        <AccountsProvider>
            {returnComponent}
        </AccountsProvider>
    )
}