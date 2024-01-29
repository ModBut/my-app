import { createContext, useEffect, useState } from "react";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Accounts from "../Pages/Accounts/Accounts";
import Page404 from "../Pages/Page404";

export const Router = createContext();

export const RouterProvider = ({ children }) => {

    const [route, setRoute] = useState('#home');
    const [params, setParams] = useState([]);

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
    ];

    const routeComponent = routes.find(r => r.path === route)?.component || <Page404/>;

    return (
        <Router.Provider value={params}>
            {routeComponent}
        </Router.Provider>
    )
}