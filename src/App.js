import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrationForm from './component/registration';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [screen, setScreen] = useState('profile')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/profile'); 
        setUserData(response.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-2xl font-bold text-center bg-red-500">Hello, Tailwind CSS!</h1>
    
      <button onClick={()=>setScreen("register")}>Register</button>
      {screen ==='register' && <RegistrationForm/>}
      {userData && (
        <div>
          <h2>User Data:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
