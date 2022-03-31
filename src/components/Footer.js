import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import styles from './Footer.module.css'

export default function Footer() {
    const{ login} = useContext(AuthContext)
  return (
    <footer className={styles.footer}>
        {!login && <Link to="/login" className={styles.footerLink}>Login</Link>}
        {login && <p className={styles.footerLink}>Footer</p>}
    </footer>
  )
}