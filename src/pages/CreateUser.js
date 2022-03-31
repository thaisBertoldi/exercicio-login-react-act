import { Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import api from "../api/api";
import styles from "../components/Address.module.css";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { UserContext } from "../context/UserContext";

export default function CreateUser() {
  const location = useLocation();
  const {isAtualizar, valuesUser, setValuesUser } = useContext(UserContext)
  const createAlert = () => toast("Usuário cadastrado.");
  
  function howSubmit(values) {
      if(!isAtualizar) {
        createNewUser(values)
      } else {
        atualizarUsuario()
      }
  }

  //   locationTal = location.pathname.substring()
  async function createNewUser(values) {
    try {
      const { data } = await api.post("/pessoa", values);
      if (data) {
        createAlert();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function atualizarUsuario() {
      console.log('olá, cheguei aqui')
    setValuesUser([])
  }

  return (
    <div className={styles.form}>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          cpf: valuesUser.map(el => el.cpf),
          dataNascimento: valuesUser.map(el => el.dataNascimento),
          email: valuesUser.map(el => el.email),
          nome: valuesUser.map(el => el.nome),
        }}
        onSubmit={async (values) => {
            howSubmit(values)
        }}
      >
        {(props) => (
          <Form>
            <label htmlFor="nome">Nome:</label>
            <Field id="nome" name="nome" placeholder="Digite seu nome" />

            <label htmlFor="email">Email:</label>
            <Field
              id="email"
              name="email"
              placeholder="Digite seu email"
              type="email"
            />

            <label htmlFor="dataNascimento">Data de nascimento:</label>
            <Field
              id="dataNascimento"
              name="dataNascimento"
              placeholder="Digite sua data de nascimento"
            />

            <label htmlFor="cpf">CPF:</label>
            <Field id="cpf" name="cpf" placeholder="Digite seu cpf" />

            {!isAtualizar && <button type="submit">Cadastrar</button>}
            <ToastContainer />
            {isAtualizar && <button type="submit" >Atualizar</button>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
