  import React, { useState ,useEffect} from 'react';
  import Tilt from 'react-parallax-tilt';
  import { useTypewriter, Cursor } from 'react-simple-typewriter';
  import logo from '../resources/logo.png';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import "../style/login.css"

  const LoginForm = ({ setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    const [text] = useTypewriter({
      words: ['safeguard', 'detection', 'fortification'],
      loop: {},
      typeSpeed: 80,
      deleteSpeed: 50,
    });

    const navigate = useNavigate();
    useEffect(() => {
      // Add the 'login-body' class to the body element when the component mounts
      document.body.classList.add('login-body');

      // Remove the 'login-body' class when the component unmounts
      return () => {
        document.body.classList.remove('login-body');
      };
    }, []);

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        // Make API call to login endpoint
        await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/login`, {
          email,
          password,
        });

        // Handle successful login
        setLoggedIn(true);
      //   navigate('/DDOSPage');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
    console.error('Login failed:', error.response.data.message);
    setErrorMessage(error.response.data.message);
  } else {
    console.error('Login failed:', error.message);
    setErrorMessage('An error occurred while logging in');
  }
      }
    };

    return (
      <div className="mainDiv">
        <div className="logoAndContext">
          <img src={logo} alt="Logo" />
          <h1>
            We provide{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #efb45a, #7f7f7f)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              {text}
            </span>{' '}
            <span style={{ color: 'white' }}>
              <Cursor cursorStyle="|" />
            </span>
          </h1>
          <h2>Empower your online presence with cutting-edge network security solution</h2>
          <div className="rectangle">
            <p>Lets Get Started</p>
            <i className="bi bi-arrow-right"></i>
          </div>
        </div>

        <div className="loginForm">
          <Tilt>
            <section className='login-section'>
              <form onSubmit={handleLogin}>
                <h1>Login</h1>
                {errorMessage && <p style={{color:'red'}} className="error-message">{errorMessage}</p>}
                <div className="inputbox">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Email</label>
                </div>
                <div className="inputbox">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>
                <div className="forget">
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                  <a href="#">Forget Password</a>
                </div>
                <button tybpe="submit">Log in</button>
              </form>
            </section>
          </Tilt>
        </div>
      </div>
    );
  };

  export default LoginForm;
