import Page404 from '../Page404';
import { AccountsProvider } from '../../Contexts/Accounts';
import AccountStatistic from './AccountStatistic';


export default function Home({to}) {

    let returnComponent = <Page404 />;

    if (to === 'accountstatistic') {
        returnComponent = <AccountStatistic/>
    }

    return (
     
        <AccountsProvider>
        {returnComponent}
        </AccountsProvider>
    )
}