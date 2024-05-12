import Header from '../components/header';
import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const History = () => {
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState(null);
    const [submissions, setSubmissions] = useState([]);

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

    useEffect(() => {
        chrome.storage.local.get(['submissions']).then((result) => {
            console.log(result)
            if (result.submissions)
                setSubmissions(result.submissions);
        });
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
            <div className="w-full flex justify-center">
                <h3 className='text-3xl text-customDark dark:text-customBG'>
                    History Page for {user}
                </h3>
            </div>
            <div className="text-xl flex flex-col gap-3">
                {submissions.map((submission, index) => (
                    <div key={index}>
                        {submission.question} - {submission.timestamp}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default History;