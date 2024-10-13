import './Inscription.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function Inscription() {
  const { login } = useContext(AuthContext);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [errorMessage, SetErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function sendData() {
      if (submit) {
        try {
          const formValues = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password,
          };

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/signin`,
            formValues
          );
          if (response.data === 'This email address is already used') {
            SetErrorMessage(response.data);
          } else {
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
    <div className="inscription">
      <div id="error">{errorMessage}</div>
      <div className="inscription-container">
        <div className="incription-title">Inscription</div>
        <img
          src="https://vectorified.com/images/unknown-avatar-icon-7.jpg"
          className="avatar"
          alt="avatar"
        />
        <br />
        <form
          className="form-connection"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="prenom">First Name :</label>
          <input
            className="prenom"
            type="text"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label htmlFor="nom">Last Name :</label>
          <input
            className="nom"
            type="text"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <label htmlFor="email">Email :</label>
          <input
            className="email"
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="pwd-sub">Password :</label>
          <input
            className="pwd-sub"
            type="text"
            placeholder="Choose a new password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="submit"
            value="Subscribe"
            className="subscribe-btn"
            onClick={() => setSubmit(true)}
          />
        </form>
      </div>
    </div>
  );
}
