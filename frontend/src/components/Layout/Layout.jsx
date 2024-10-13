import './Layout.css';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu/Menu';
import AuthContext from '../../context/AuthContext';

const Layout = ({ children, MovieName, setMovieName }) => {
  return (
    <div className="Layout-container">
      <Menu MovieName={MovieName} setMovieName={setMovieName} />
      <div className="Layout-content">{children}</div>
    </div>
  );
};

export default Layout;
