import React from 'react'
import imageSpinner from '../image/book-spinner.gif'

export default function Loading() {
    return (
        <>
            <h1>Listando</h1>
            <img src={imageSpinner}></img>
        </>
    )
}
