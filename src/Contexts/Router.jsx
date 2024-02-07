import { createContext, useEffect, useState } from "react";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Accounts from "../Pages/Accounts/Accounts";
import Register from "../Pages/Register/Register";
import Page404 from "../Pages/Page404";
import Page401 from "../Pages/Page401";


export const Router = createContext();

export const RouterProvider = ({ children }) => {

    const page401 = <Page401/>

    const [route, setRoute] = useState(() => {
        const hash = window.location.hash || '#home';
        return hash.split('/').shift();
    });
    const [params, setParams] = useState(() => {
        const hash = window.location.hash.split('/');
        hash.shift();
        return hash;
    });

    const [notAuthorized, setNotAuthorized] = useState(null);

    const show401Page = () => {
        setNotAuthorized(page401);
    }

    useEffect(() => {
        setNotAuthorized(null);
    }, [route, setNotAuthorized])

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.split('/');
            setRoute(hash.shift());
            setParams(hash);
        }

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const routes = [
        {path: '#home', component: <Home/>},
        {path: '#accounts', component: <Accounts/>},
        {path: '#login', component: <Login/>},
        {path: '#register', component: <Register/>}
    ];

    const routeComponent = routes.find(r => r.path === route)?.component || <Page404/>;

    return (
        <Router.Provider value={{params, show401Page}}>
            {notAuthorized ?? routeComponent}
        </Router.Provider>
    )
}