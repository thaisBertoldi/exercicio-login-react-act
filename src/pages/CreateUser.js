import { Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import styles from "../components/Address.module.css";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { UserContext } from "../context/UserContext";

export default function CreateUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAtualizar, setIsAtualizar, valuesUser, setValuesUser } =
    useContext(UserContext);
  const [dadosAtualizadosUsuario, setDadosAtualizadosUsuario] = useState({});
  const createAlert = () => toast("Usuário cadastrado.");
  const updateAlert = () => toast("Usuário alterado.");

  function howSubmit(values) {
    if (!isAtualizar) {
      createNewUser(values);
    } else {
      atualizarUsuario(values);
    }
  }

  async function createNewUser(values) {
    try {
      values.dataNascimento = moment(values.dataNascimento, "DD/MM/YYYY").format(
            "YYYY-MM-DD")
      const { data } = await api.post("/pessoa", values);
      if (data) {
        createAlert();
        navigate("/users");
      } else {
        alert("Algum valor está errado. Tente novamente");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function dadosAtualizados(values) {
    setDadosAtualizadosUsuario({
      cpf: values.cpf,
      dataNascimento: moment(values.dataNascimento, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      ),
      email: values.email,
      nome: values.nome,
    });
  }

  async function atualizarUsuario(values) {
    const idUsuario = location.pathname.substring(13);
    try {
      if (dadosAtualizadosUsuario.cpf.length !== 11 || dadosAtualizadosUsuario.dataNascimento.length !== 10) {
        alert("Não deu, sorry");
      } else {
        api.put(
          `/pessoa/${idUsuario}`,
          dadosAtualizadosUsuario
        );
        alert("usuário alterado!");
        setIsAtualizar(false);
        navigate("/users");
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <div className={styles.form}>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          cpf: valuesUser.cpf,
          dataNascimento: valuesUser.dataNascimento,
          email: valuesUser.email,
          nome: valuesUser.nome,
        }}
        onSubmit={async (values) => {
          howSubmit(values);
        }}
      >
        {(props) => (
          <Form>
            <label htmlFor="nome">Nome:</label>
            <Field id="nome" name="nome" placeholder="Digite seu nome" />

            <label htmlFor="email">Email:</label>
            <Field id="email" name="email" placeholder="Digite seu email" type="email"/>

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
            {isAtualizar && (
              <button
                type="submit"
                onClick={() => dadosAtualizados(props.values)}
              >
                Atualizar
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
