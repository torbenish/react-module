import React, { useState, useCallback, FormEvent } from "react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from '../../components/Loader'
import { Container } from "./style";
import { api } from "../../services/api";

interface IData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const [data, setData] = useState<IData>({} as IData);
  const [load, setLoad] = useState(false);

  const history = useHistory();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoad(true);
      api
        .post('session', data)
        .then( response => {
          const sessionToken = JSON.stringify(response.data.token)
          localStorage.setItem('@gamaServiceToken', sessionToken)
          setLoad(false);
          toast.success("Cadastro realizado com sucesso!", {
            hideProgressBar: false,
            onClose: () => history.push('dashboard'),
          });
        })
        .catch(e => {
          toast.error("Oops, algo deu errado");
          setLoad(false);
        });
    },
    [data, history]
  );

  if (load) {
    return (
      <Loader/>
    );
  }

  return (
    <Container>
      <div className="card">
        <h5>
          <b>Logar no sistema</b>
        </h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Informe seu email"
            onChange={e => setData({ ...data, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Informe sua senha"
            onChange={e => setData({ ...data, password: e.target.value })}
          />
          <input type="submit" value="Logar" />
        </form>
        <Link to="/signup"> 
        Clique aqui para cadastrar.
        </Link>
      </div>
    </Container>
  );
};

export default SignIn;
