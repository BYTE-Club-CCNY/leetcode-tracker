import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { goTo } from 'react-chrome-extension-router';
import Login from './login';

const Home = ({leetUser}) => {
  const endpoints = {
    root: `http://127.0.0.1:3060/`,
    profile_info: `http://127.0.0.1:3060/user?user=${leetUser}`,
    solved: `http://127.0.0.1:3060/user?user=${leetUser}/solved`,
    submission: `http://127.0.0.1:3060/user?user=${leetUser}/submission`
  }
  const [userData, setUserData] = useState([]);
 
  const fetchApi = (url) => {
    useEffect (() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setUserData([data.data]))
        .catch(err => console.error(`There was an error ${err}`));
    }, []) // rerender on any change for now
  };

  fetchApi(endpoints.root); // call the endpoint url you desire

  const handleLogout = () => { //handle logout in the homepage since there will probably be a navbar or something
    supabase.auth.signOut(); //signout globally from all tabs and windows.
    goTo(Login);
  };

  return (
    <div className="w-[250px] h-[100px] bg-customBG">
      This is the home page, welcome {leetUser}, it's nice to have you!<br/><br/>
      <button className='logoutButton' onClick={handleLogout} style={{color: 'Red', background:"pink"}}>Logout</button>{/*for testing only...*/}
      {userData.map(data => data)}
    </div>
  )
}

export default Home;
