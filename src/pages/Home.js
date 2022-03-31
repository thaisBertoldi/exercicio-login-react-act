import React, {  useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from '../components/Home.module.css'

export default function Home() {
    const navigate = useNavigate();
    const getToken = localStorage.getItem('token')

    function isLogged() {
        if(!getToken) {
           return false 
        } else {
            return true;
        }
    }

    useEffect(() => {
        if(!isLogged()){
            navigate('/login')
        } else {
            console.log('olá, teste')
        }
    },[])

    return (
        <div className={styles.home}>Home</div>
    )
}