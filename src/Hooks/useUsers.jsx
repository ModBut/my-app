import { useContext, useState, useEffect } from "react";
import { Auth } from "../Contexts/Auth";
import { Router } from "../Contexts/Router";
import { SERVER_URL } from '../Constants/main';
import axios from 'axios';

export default function useUsers() {

    const [users, setUsers] = useState(null);
    const [createUser, setCreateUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    const {user, logout} = useContext(Auth);
    const {show401Page} = useContext(Router);

    useEffect(_ => {

        if (null === user) {
            return;
        }

        const withTokenUrl = 
        user ? `${SERVER_URL}/users?token=${user.token}` : `${SERVER_URL}/users`;

        axios.get(withTokenUrl)
            .then(res => {
                setUsers(res.data);
                console.log(res.data);
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        if (err.response.data.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                }
            });
    }, []);

    useEffect(() => {
        if (null !== createUser) {
            axios.post(`${SERVER_URL}/users`, createUser)
                .then(() => {
                    setCreateUser(null);
                })
                .catch(() => {
                    setCreateUser(null);
                });
        }
    }, [createUser]);


    return {
        users, setUsers,
        createUser, setCreateUser,
        editUser, setEditUser,
        deleteUser, setDeleteUser

    }
}