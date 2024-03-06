import { useContext } from 'react';
import { Router } from '../../Contexts/Router';
import Page404 from '../Page404';
import List from './List';
import Create from './Create';
import { AccountsProvider } from '../../Contexts/Accounts';
import Edit from './Edit';
import Delete from './Delete';
import PageGate from '../Auth/PageGate';
import BlockAccount from './BlockAccount';
import { StatisticProvider } from '../../Contexts/Statistic';


export default function Accounts() {

    const {params} = useContext(Router);

    let returnComponent = <Page404 />;

    if (params.length === 0) {
        returnComponent = <List />;

    } else if (params.length === 1 && params[0] === 'create') {
        returnComponent = <PageGate roles='admin|user'><Create /></PageGate>;

    } else if (params.length === 2 && params[0] === 'edit') {
        returnComponent = <PageGate roles='admin|user'><Edit /></PageGate>

    } else if (params.length === 2 && params[0] === 'delete') {
        returnComponent = <PageGate roles='admin'><Delete /></PageGate>

    } else if (params.length === 2 && params[0] === 'block') {
        returnComponent = <PageGate roles='admin'><BlockAccount /></PageGate>
    }

    return (
        <StatisticProvider>
        <AccountsProvider>
            {returnComponent}
        </AccountsProvider>
        </StatisticProvider>
    )
}