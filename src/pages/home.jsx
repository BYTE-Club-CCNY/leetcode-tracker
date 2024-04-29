import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Header from '../components/header';

const Home = ({leetUser}) => {
  // const endpoints = {

  //   root: `http://127.0.0.1:3060/`,
  //   profile_info: `http://127.0.0.1:3060/user?user=${leetUser}`,
  //   solved: `http://127.0.0.1:3060/user?user=${leetUser}/solved`,
  //   submission: `http://127.0.0.1:3060/user?user=${leetUser}/submission`
  // }
  // const [userData, setUserData] = useState([]);
  // /*
  // use this to get more of the user's detail like session data and stuff or a lot of it could be passed in as a prop from login or signup!
  // const [user, setUser] = useState(null);

  // useEffect (() => {
  //   (async () => {
  //     const user = await supabase.auth.getUserIdentities();
  //     const leetUser = user.data.identities[0].identity_data.leetcodeUser;
  //     console.log(leetUser)
  //     setUser(leetUser);
  //   })();
  // }, []);
  // */
 
  // const fetchApi = (url) => {
  //   useEffect (() => {
    
  //     fetch(url)
  //       .then(res => res.json())
  //       .then(data => setUserData([data.data]))
  //       .catch(err => console.error(`There was an error ${err}`));

  //   }, []) // rerender on any change for now
  // };

  // fetchApi(endpoints.root); // call the endpoint url you desire

  //each of the routes will have to be handled properly when rendering below.
  
  const timerStartedRef = useRef(false);
  const intervalID = useRef();
  const [remainingTime, setTime] = useState(3600);
  const [displayPlayButton, setPlayButton] = useState(true);

  function startTimer() {
    intervalID.current = setInterval(() => {
      setTime(remainingTime => remainingTime - 1);
    }, 1000);
  }

  useEffect(() => {

    //if the user clciks on the play button, it sets timerStartedRef to true which starts the countdown to the timer
    if (timerStartedRef.current) {
      startTimer();
    }

    //cleanup function when in development, can remove when in production without strict mode
    return () => {                     
      clearInterval(intervalID.current);
    }

  }, [timerStartedRef.current]);

  //when the remaining time state reaches 0 we can stop the repeating interval function that decrements the timer by passing the id into clearInterval and also update the timerStartedRef to false for future use (indicates the timer didn't start and can be set to true again wehn pressing on restart button)
  if (remainingTime === 0) {
    clearInterval(intervalID.current);
    timerStartedRef.current = false;
  }

  const minutes = Math.floor(remainingTime / 60); 
  const seconds = Math.floor(remainingTime % 60); 

  return (
    <div className="w-[600px] h-[300px] bg-customBG rounded-lg">
      <Header />
      <div className="w-full h-5/6 flex justify-center items-center gap-4">
        <div style={{ width:200, height:200 }}>
        <CircularProgressbarWithChildren 
          value={remainingTime} 
          text={remainingTime === 3600 || seconds === 0 ? `${minutes}:${seconds}0` : `${minutes}:${seconds}`} 
          minValue={0} 
          maxValue={3600} 
          styles={buildStyles({ textColor:'#274156', pathColor:'#274156' })}
        >
          <div className="flex justify-center items-center gap-5">
            {
              !displayPlayButton ?
              ''
              :
              <FontAwesomeIcon onClick={() => {
                //when the timer starts we remove the play button state and update the current property of timerStartedRef to true such that the interval function can run in useEffect
                setPlayButton(false);
                timerStartedRef.current = true;
              }} style={{marginTop:"60px"}} icon={faPlay} className="cursor-pointer"/>
            }
              <FontAwesomeIcon onClick={() => {
                //restart the timer by updating the remainingTime state back to 3600 seconds (1 hour) and update timerStartedRef.current to true to restart the interval count down again
                setTime(3600);
                timerStartedRef.current = true;
                }} style={{marginTop:"60px"}} icon={faArrowsRotate} className="cursor-pointer"/>
          </div>
        </CircularProgressbarWithChildren>
        </div>
        <textarea placeholder="Type your notes here..." className="w-[350px] h-[200px] resize-none text-gray-500 rounded-lg overflow-auto p-2"/>
      </div>
    </div>
  )
}

export default Home;