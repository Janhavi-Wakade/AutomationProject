import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/auth`);
      const users = response.data;

      users.forEach(user => {
        console.log(`Username: ${user.username}, Password: ${user.password}`);
        if(username===user.username && password===user.password)
          {
            onLogin();
            navigate('/wingA');
          }
        else 
        setError('Invalid credentials');
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    
    <div class="outerDiv">
      <div className='flex-container'>
      <form class="formdesign" onSubmit={handleSubmit}>
        <div className='leftform'>
        <div><h2>Login</h2></div>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <h4>{error}</h4>}
        <button type="submit">Login</button>
        </div>
        <div className='bulb'></div>
      </form>
    </div>

{/* Div1 */}






    {/* <div className='flex-container'>
      <form class="formdesign" onSubmit={handleSubmit}>
        <div><h2>Login</h2></div>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div> */}
  



{/* div2 */}

{/* <div class="RightDiv"> */}
{/* <img src=''></img> */}
</div>
    // </div>
    

    
    
    

    
  );
};

export default Login;
