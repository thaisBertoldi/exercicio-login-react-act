import React from 'react'
import styles from '../components/NotFound.module.css'
import notFoundImage from '../image/not-found-page.gif'

export default function NotFound() {
  return (
      <div className={styles.notfound}>
          <h1>Not Found Page</h1>
          <img src={notFoundImage} className={styles.notfoundImg}></img>
      </div>
  )
}
