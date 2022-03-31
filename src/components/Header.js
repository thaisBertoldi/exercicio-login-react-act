import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'

export default function Header() {
    const { logoutUser, login, setLogin } = useContext(AuthContext);

    if(localStorage.getItem('token')){
        setLogin(true)
    }

    return (
        <div>
            <header className={styles.header}>
                <div>
                    <a href="/" className={styles.headerLogo}>Logo</a>
                </div>
                
                <div className={styles.headerDivMenu}>
                    <nav>
                        <ul className={styles.headerUl}>
                            {!login && <Link to='/login' className={styles.headerLink}>Login</Link>}
                            {login && 
                            <div className={styles.headerUl}>
                            <Link to='/' className={styles.headerLink}>Home</Link>
                            <Link to='/users' className={styles.headerLink}>Users</Link>
                            <Link to='/address' className={styles.headerLink}>Address</Link>
                            <button className={styles.headerButton} onClick={logoutUser}>Logout</button>
                            </div>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
} 