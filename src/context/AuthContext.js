import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Loading from '../components/Loading';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState('');
    const [login, setLogin] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
    }, [])

    async function loginUser({values}) {
        try {
            const {data} = await api.post('/auth', values )
            setToken(data)
            localStorage.setItem('token', data)
            api.defaults.headers.common['Authorization'] = data;
            setLogin(true)
            navigate('../users')
        } catch (erro) {
            console.log(erro)
        }
    }

    function logoutUser(){
        localStorage.removeItem('token')
        setLogin(false)
        navigate('../login')
    }

    if(!loading){
        return (
            <Loading />
        )
    }
    return (
        <AuthContext.Provider value={{  loginUser, token, setToken, login, setLogin, logoutUser, setUsers, users }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;