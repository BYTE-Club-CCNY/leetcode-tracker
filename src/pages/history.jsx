import Header from '../components/header';
import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const History = () => {
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState(null);
    const endpoints = {
        root: `http://127.0.0.1:3060/`,
        profile_info: `http://127.0.0.1:3060/user?user=${user}`,
        solved: `http://127.0.0.1:3060/user?user=${user}/solved`,
        submission: `http://127.0.0.1:3060/user?user=${user}/submission`
      }

    useEffect (() => {
        (async () => {
          const {data, error} = await supabase.auth.getSession();
          const leetUser = data.session.user.user_metadata.leetcodeUser;
          setUser(leetUser);
        })();
    }, []);

    // const fetchApi = (url) => {
    //   useEffect (() => {
        
    //     fetch(url)
    //       .then(res => res.json())
    //       .then(data => setUserData(data))
    //       .catch(err => console.error(`There was an error ${err}`));
    //   }, [user]) // rerender on any change for now
    // };
    // fetchApi(endpoints.solved);
    // console.log(userData)


    return (
        <div className="w-[600px] h-[300px] bg-customBG dark:bg-customDarkBG">
            <Header />
            <div className="w-full h-5/6 flex justify-center items-center">
                <h3 className='text-customDark dark:text-customBG'>
                    Welcome to the temporary history page {user}
                </h3>
            </div>
        </div>
    )
}

export default History;