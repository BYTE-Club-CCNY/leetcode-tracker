import Header from '../components/header';
import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { getRemoteSubmissions, pushRemoteSubmission } from '../submissions';

const History = () => {
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState(null);
    const [submissions, setSubmissions] = useState([]);

    // What is this?
    const endpoints = {
        root: `http://127.0.0.1:3060/`,
        profile_info: `http://127.0.0.1:3060/user?user=${user}`,
        solved: `http://127.0.0.1:3060/user?user=${user}/solved`,
        submission: `http://127.0.0.1:3060/user?user=${user}/submission`
      }

    useEffect (async () => {
        const {data, error} = await supabase.auth.getSession();
        const leetUser = data.session.user.user_metadata.leetcodeUser;
        setUser(leetUser);
        const userID = data.session.user.id;
        const remoteSubmissions = await getRemoteSubmissions(userID);
        chrome.storage.session.get(['userSubmissions']).then((result) => {
        if (result.userSubmissions) {
            result.userSubmissions.forEach(submission => {
                pushRemoteSubmission(userID, submission);
            });
            setSubmissions([...remoteSubmissions, ...result.userSubmissions]);
        } else {
            setSubmissions(remoteSubmissions);
        }
        });
        chrome.storage.session.remove('userSubmissions');
    }, []);

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
                        {submission.problem_name} 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default History;