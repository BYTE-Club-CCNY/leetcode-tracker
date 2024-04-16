import supabase from '../supabaseClient';
import { useEffect, useState } from 'react';

const Home = ({leetUser}) => {
  /*

  use this to get more of the user's detail like session data and stuff or a lot of it could be passed in as a prop!
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

  //TODO: render some data here from the api with fetch api
  return (
    <div className="w-[250px] h-[100px] bg-customBG">
      This is the home page, welcome {leetUser}, it's nice to have you!
    </div>
  )
}

export default Home;
