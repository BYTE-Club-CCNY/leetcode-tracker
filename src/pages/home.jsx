import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowsRotate, faPause } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Header from '../components/header';

const Home = ({leetUser}) => {
  
  const timerStartedRef = useRef(false);
  const intervalID = useRef();
  const [remainingTime, setTime] = useState(3600);
  const [togglePlayButton, setPlayButton] = useState(true);

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
  // change the color of the path and text for the proress bar
  const progBarColors = localStorage.getItem('mode') === 'dark' ? "#8134DF" : "#274156" 

  return (
    <div className="w-[600px] h-[300px] bg-customBG dark:bg-customDarkBG">
      <Header />
      <div className="w-full h-5/6 flex justify-center items-center gap-4">
        <div style={{ width:200, height:200 }}>
        <CircularProgressbarWithChildren 
          value={remainingTime} 
          text={remainingTime === 3600 || seconds === 0 ? `${minutes}:${seconds}0` : `${minutes}:${seconds}`} 
          minValue={0} 
          maxValue={3600} 
          styles={buildStyles({textColor: progBarColors, pathColor:progBarColors})}
          counterClockwise={true}
        >
          <div className="flex justify-center items-center gap-5">
            {
              togglePlayButton ?
              <FontAwesomeIcon 
              onClick={() => {
                //when the timer starts we remove the play button state and update the current property of timerStartedRef to true such that the interval function can run in useEffect
                setPlayButton(false);
                timerStartedRef.current=true;
              }} 
              style={{marginTop:"60px"}} 
              icon={faPlay} 
              className="cursor-pointer"
              />
              :
              <FontAwesomeIcon 
              onClick={() => {
                setPlayButton(true);
                timerStartedRef.current=false;
              }}
              style={{marginTop:"60px"}} 
              icon={faPause} 
              className="cursor-pointer"
              />
            }
              <FontAwesomeIcon 
              onClick={() => {
                  //restart the timer by updating the remainingTime state back to 3600 seconds (1 hour) and update timerStartedRef.current to true to restart the interval count down again
                  setTime(3600);
                  timerStartedRef.current = true;
                }} 
                style={{marginTop:"60px"}} 
                icon={faArrowsRotate} 
                className="cursor-pointer"
                />
          </div>
        </CircularProgressbarWithChildren>
        </div>
        <textarea placeholder="Type your notes here..." className="w-[350px] h-[200px] resize-none text-gray-500 rounded-lg overflow-auto p-2 dark:bg-customDarkAccent"/>
      </div>
    </div>
  )
}

export default Home;