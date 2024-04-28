import { useEffect, useState } from 'react';

const Home = ({leetUser}) => {
  const endpoints = {
    root: `http://127.0.0.1:3060/`,
    profile_info: `http://127.0.0.1:3060/user?user=${leetUser}`,
    solved: `http://127.0.0.1:3060/user?user=${leetUser}/solved`,
    submission: `http://127.0.0.1:3060/user?user=${leetUser}/submission`
  }
  const [userData, setUserData] = useState([]);
  /*
  use this to get more of the user's detail like session data and stuff or a lot of it could be passed in as a prop from login or signup!
  const [user, setUser] = useState(null);

  useEffect (() => {
    (async () => {
      const user = await supabase.auth.getUserIdentities();
      const leetUser = user.data.identities[0].identity_data.leetcodeUser;
      console.log(leetUser)
      setUser(leetUser);
    })();
  }, []);
  */
 
  const fetchApi = (url) => {
    useEffect (() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setUserData([data.data]))
        .catch(err => console.error(`There was an error ${err}`));
    }, []) // rerender on any change for now
  };

  fetchApi(endpoints.root); // call the endpoint url you desire

  //each of the routes will have to be handled properly when rendering below.
  return (
    <div className="w-[250px] h-[100px] bg-customBG">
      This is the home page, welcome {leetUser}, it's nice to have you!
      {userData.map(data => data)}
    </div>
  )
}

export default Home;