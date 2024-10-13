import { Route, Routes } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Connexion from './pages/Connexion/Connexion';
import Tendances from './pages/Tendances/Tendances';
import Inscription from './pages/Inscription/Inscription';
import SearchBar from './pages/SearchBar/SearchBar';
import ForYou from './pages/ForYou/ForYou';
import Category from './pages/Category/Category';

function App() {
  const [MovieName, setMovieName] = useState('');

  return (
    <AuthProvider>
      <div className="myApp">
        <Layout MovieName={MovieName} setMovieName={setMovieName}>
          <Routes>
            <Route
              path="/category/action"
              element={<Category category_id={28} />}
            />
            <Route
              path="/category/adventure"
              element={<Category category_id={12} />}
            />
            <Route
              path="/category/animation"
              element={<Category category_id={16} />}
            />
            <Route
              path="/category/comedy"
              element={<Category category_id={35} />}
            />
            <Route
              path="/category/crime"
              element={<Category category_id={80} />}
            />
            <Route
              path="/category/documentary"
              element={<Category category_id={99} />}
            />
            <Route
              path="/category/drama"
              element={<Category category_id={18} />}
            />
            <Route
              path="/category/family"
              element={<Category category_id={10751} />}
            />
            <Route
              path="/category/fantasy"
              element={<Category category_id={14} />}
            />
            <Route
              path="/category/horror"
              element={<Category category_id={27} />}
            />
            <Route
              path="/category/music"
              element={<Category category_id={10402} />}
            />
            <Route
              path="/category/romance"
              element={<Category category_id={10749} />}
            />
            <Route
              path="/category/sf"
              element={<Category category_id={878} />}
            />
            <Route
              path="/category/thriller"
              element={<Category category_id={53} />}
            />
            <Route path="/foryou" element={<ForYou />} />
            <Route
              path="/recherche"
              element={<SearchBar MovieName={MovieName} />}
            />
            <Route
              path="/home"
              element={
                <Home MovieName={MovieName} setMovieName={setMovieName} />
              }
            />
            <Route path="/subscribe" element={<Inscription />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route
              path="/"
              element={
                <Home MovieName={MovieName} setMovieName={setMovieName} />
              }
            />
            <Route path="counter" element={<Counter />} />
            <Route path="users" element={<Users />} />
            <Route path="about" element={<About />} />
            <Route path="tendances" element={<Tendances />} />
          </Routes>
        </Layout>
      </div>
    </AuthProvider>
  );
}

export default App;
