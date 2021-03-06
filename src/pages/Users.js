import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";
import api from "../api/api";
import Loading from "../components/Loading";
import Error from "../components/Error";
import "./Users.css";

export default function Users() {
  const navigate = useNavigate();
  const { getUsers, loading, erro, users, setIsAtualizar, setValuesUser } =
    useContext(UserContext);

  const getToken = localStorage.getItem("token");
  const deletedAlert = () => toast("Usuário deletado.");

  function isLogged() {
    if (!getToken) {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (!isLogged()) {
      navigate("/login");
    } else {
      api.defaults.headers.common["Authorization"] = getToken;
      getUsers();
      setIsAtualizar(false)
    }
    //eslint-disable-next-line
  }, []);

  function formatCpf(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  async function navigateAtualizar(id) {
    try {
      const { data } = await api.get(`/pessoa/{idPessoa}?idPessoa=${id}`);
      setValuesUser(data);
      navigate(`/create-user/${id}`);
      setIsAtualizar(true);
    } catch (erro) {
      console.log(erro);
    }
  }

  function deletarUsuario(id) {
    try {
      confirmAlert({
        title: "Confirm to submit",
        message: "Tem certeza que deseja coletar?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await api.delete(`/pessoa/${id}`);
              deletedAlert();
            },
          },
          {
            label: "No",
            onClick: () => console.log("usuario nao quis deletar"),
          },
        ],
      });
    } catch (erro) {
      console.log("Erro ao tentar acessar a api usuario" + erro);
    }
  }

  if (loading) {
    return (
      <div className="userContainerLoading">
        <Loading />;
      </div>
    );
  }
  if (erro) {
    return <Error />;
  }

  return (
    <div>
      <h1>Page User</h1>
      <Link to="/create-user">Cadastrar usuário</Link>
      <div className="usersList">
        {users.map((user) => (
          <div key={user.idPessoa} className="userListBloco">
            <h3>{user.nome}</h3>
            <p>{user.emal}</p>
            <p>{formatCpf(user.cpf)}</p>
            <p>{moment(user.dataNascimento).format("DD/MM/YYYY")}</p>
            <button onClick={() => deletarUsuario(user.idPessoa)}>
              Deletar
            </button>
            <button onClick={() => navigateAtualizar(user.idPessoa)}>
              Atualizar
            </button>
            <ToastContainer />
          </div>
        ))}
      </div>
    </div>
  );
}
