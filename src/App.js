import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Movie from "./pages/Movie"
import Person from "./pages/Person"
import Header from './component/Header';
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ login, signup, token, error }) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleFormData = (data) => {
    setFormData(data);
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = () => {
    login(username, password);
  };

  const handleSignup = () => {
    signup(username, password);
  };
  const toastContainerStyle = {
    width: "400px", // Set the desired width
  };

  const toastStyle = {
    fontSize: "20px", // Set the desired font size
  };
  return (
    <div className="App">
      <ToastContainer theme="colored"
        position="top-center"
        style={toastContainerStyle}
        toastStyle={toastStyle}></ToastContainer>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/movie/:id" element={<Movie />} />

          <Route path="/actor/:id" element={<Person />} />

          <Route path="/Favorites" element={<Favorites />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/signup" element={<Signup />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;