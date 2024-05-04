import * as React from 'react';
import { Router } from 'react-chrome-extension-router'; 
import Landing from './pages/landing';
import Home from './pages/home';
import supabase from './supabaseClient';
import { useEffect, useState } from 'react';


const App = () => {
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    (async () => {
      let {data, error} = await supabase.auth.getSession();
      !error ? setSession(data.session) : setSession(null);
    })();
  }, [])

  return (
    <Router>
      {session ? <Home leetUser={session.user.user_metadata.leetcodeUser}/> : <Landing />}
    </Router>
  );
};

export default App;