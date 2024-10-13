import { NavLink, useNavigate } from 'react-router-dom';
import './Connexion.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function Connexion() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [errorMessage, SetErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function sendData() {
      if (submit) {
        try {
          const formValues = {
            email: username,
            password: password,
          };

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/connection`,
            formValues
          );
          if (response.data === 'The password is incorrect') {
            SetErrorMessage(response.data);
          } else if (
            response.data ===
            "This email address doesn't correspond to any user"
          ) {
            SetErrorMessage(response.data);
          } else {
            console.log(response.data);
            login(response.data);
            navigate('/');
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    sendData();
    setSubmit(false);
  }, [submit]);

  return (
    <div className="container-connexion">
      <div id="error">{errorMessage}</div>
      <div className="connexion">
        <form
          className="form-connection"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="identifiant">Username :</label>
          <br />
          <input
            className="identifiant"
            type="text"
            placeholder="email"
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <label htmlFor="pwd">Password :</label>
          <br />
          <input
            className="pwd"
            type="text"
            placeholder="enter your password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <input
            type="submit"
            value="Connection"
            className="btn"
            onClick={() => setSubmit(true)}
          />
        </form>
        <div className="tosubscribe">
          <div className="not-yet-sub">You have not subscribed yet ?</div>
          <NavLink to="/subscribe" id="subscribe-here">
            Subscribe here !
          </NavLink>
        </div>
      </div>
    </div>
  );
}
