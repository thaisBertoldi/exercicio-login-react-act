import { createContext, useState } from 'react'
import api from '../api/api';

export const UserContext = createContext();

function UserProvider({children}){
    const [ users, setUsers ] = useState([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState(false)
    const [isAtualizar, setIsAtualizar] = useState(false)
    const [valuesUser, setValuesUser] = useState({})

    async function getUsers() {
        try {
          const { data } = await api.get('/pessoa')
          setUsers(data)
          setLoading(false)
        }
        catch (error) {
          console.log(error)
          setLoading(false)
          setErro(true)
        }
      }

    return (
        <UserContext.Provider value={{getUsers, loading, erro, setErro, users, isAtualizar, setIsAtualizar, valuesUser, setValuesUser}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserProvider;