import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import styles from './LoginComp.module.css'

export default function LoginComp() {
    const { loginUser } = useContext(AuthContext);
    const getToken = localStorage.getItem('token')

    if(!getToken) {
        return (
            <div className={styles.login}>
                <h1>Exercicio Login</h1>
                <Formik
                    initialValues={{
                        usuario: '',
                        senha: '',
                    }}
                    onSubmit={async (values) => {
                        await loginUser({ values });
                    }}
                >
                    <Form className={styles.form}>
                        <div className={styles.labelInput}>
                            <label htmlFor="usuario">Name user:</label>
                            <Field id="usuario" name="usuario" placeholder="Enter your name user" />
                        </div>
    
                        <div className={styles.labelInput}>
                            <label htmlFor="senha">Password:</label>
                            <Field id="senha" type='password' name="senha" placeholder="Enter your password" />
                        </div>
                        <div>
                            <button className={styles.buttonSubmit} type="submit">Submit</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        )
    }
    return (
        <h1>Você já está logado.</h1>
    )
}