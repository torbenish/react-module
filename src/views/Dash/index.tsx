import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import addNewUser from '../../store/modules/user/action'
import Loader from '../../components/Loader';
import { api } from '../../services/api';

import { Container } from './style';

interface ICollaborator{
  id: number;
  name: string;
  email: string;
  photo: {
    path: string;
  }
}

const Dash: React.FC = () => {
  const [ data, setData ] = useState<ICollaborator[]>([]);
  const [ isLoad, setIsLoad ] = useState(false);
  const token = localStorage.getItem('@gamaServiceToken')?.replace(/["]/g, '')


  const dispatch = useDispatch();
  useEffect(() => {
    api.get('collaborator', { 
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then( response => {
      setIsLoad(true)
      setData(response.data)
    }).finally( () => setIsLoad(false));
  }, [token])

  useEffect(() => {
    data?.map( user => dispatch((addNewUser(user))) ) 
  }, [data, dispatch])


  if (isLoad) {
    return <Loader />
  }
    return (
      <Container>
          
          <div className="wrapper">
            <h1>Dashboard</h1>
            <div>
              { data?.map( el => (
                <div key={el.id} className="card">
                  <img src="https://wokejournal.com/wp-content/uploads/2020/08/b293c26e2d3431e58d1b23e3d5a3c658-1.jpg" alt="img" width="100px" height="100px"/>
                  <div className="content-information">
                   <p>Nome: {el.name}</p>
                   <p>Email: {el.email}</p>
                  </div>
                </div>                
              ))}
            </div>
            <Link to="/">Retornar para home</Link>
          </div>
      </Container>
  );
}

export default Dash;