import { Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import api from "../api/api";
import { UserContext } from "../context/UserContext";
import Error from "../components/Error";

export default function CreateUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAtualizar, setIsAtualizar, valuesUser, erro, setErro } =
    useContext(UserContext);
  const [dadosAtualizadosUsuario, setDadosAtualizadosUsuario] = useState({});
  const createAlert = () => toast("Usuário cadastrado.");

  console.log(valuesUser.nome);

  function howSubmit(values) {
    if (!isAtualizar) {
      createNewUser(values);
    } else {
      atualizarUsuario(values);
    }
  }

  async function createNewUser(values) {
    try {
      values.dataNascimento = moment(
        values.dataNascimento,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      const { data } = await api.post("/pessoa", values);
      if (data) {
        createAlert();
        navigate("/users");
      } else {
        alert("Algum valor está errado. Tente novamente");
      }
    } catch (error) {
      console.log(error);
      setErro(true);
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
      if (
        dadosAtualizadosUsuario.cpf.length !== 11 ||
        dadosAtualizadosUsuario.dataNascimento.length !== 10
      ) {
        alert("Não deu, sorry");
      } else {
        api.put(`/pessoa/${idUsuario}`, dadosAtualizadosUsuario);
        alert("usuário alterado!");
        setIsAtualizar(false);
        navigate("/users");
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  if (erro) {
    return <Error />;
  }

  return (
    <div className="formUser">
      <h1>Sign Up</h1>
      <Formik
        initialValues={
          isAtualizar
            ? {
                cpf: valuesUser.cpf,
                dataNascimento: valuesUser.dataNascimento,
                email: valuesUser.email,
                nome: valuesUser.nome,
              }
            : {
                cpf: "",
                dataNascimento: "",
                email: "",
                nome: "",
              }
        }
        onSubmit={async (values) => {
          howSubmit(values);
        }}
      >
        {(props) => (
          <Form className="formListUser">
            <div className="formItemUser">
              <label htmlFor="nome">Nome:</label>
              <Field id="nome" name="nome" placeholder="Digite seu nome" />
            </div>

            <div className="formItemUser">
              <label htmlFor="email">Email:</label>
              <Field
                id="email"
                name="email"
                placeholder="Digite seu email"
                type="email"
              />
            </div>

            <div className="formItemUser">
              <label htmlFor="dataNascimento">Data de nascimento:</label>
              <Field
                id="dataNascimento"
                name="dataNascimento"
                placeholder="Digite sua data de nascimento"
              />
            </div>

            <div className="formItemUser">
              <label htmlFor="cpf">CPF:</label>
              <Field id="cpf" name="cpf" placeholder="Digite seu cpf" />
            </div>

            <div>
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
