import SignUp from './signup'
import Login from './login';
import { goTo } from 'react-chrome-extension-router';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
  return (
    <div className="w-[360px] h-[310px] bg-customBG rounded-md">
      <div className="w-10/12 h-full mx-auto pt-2">
        <h1 className="text-customMain text-3xl font-bold">TrackLeet</h1>
        <p className="text-gray-500 text-2xl font-semibold">Practice The Right Way.</p>
        <p className="text-customAccent text-2xl font-semibold">Right Away.</p>
        <p className="text-customDark text-xl font-bold pt-2 pb-1">Sign in to unlock the following:</p>
        <ul>
          <li className="text-customDark text-base font-simibold">
            <FontAwesomeIcon style={{ color: "#8134DF" }} size="1x" icon={faThumbtack} className="mr-1" />
            Automated Tracking
          </li>
          <li className="text-customDark text-base font-simibold">
            <FontAwesomeIcon style={{ color: "#8134DF" }} icon={faBell} className="mr-1" />
            Convenient Reminders
          </li>
          <li className="text-customDark text-base font-simibold">
            <FontAwesomeIcon style={{ color: "#8134DF" }} icon={faNoteSticky} className="mr-1" />
            Note Taking Capabilities
          </li>
        </ul>
        <button className="w-48 mt-2 h-9 rounded-md bg-customDark text-customBG hover:text-customBG hover:bg-customMain transition-colors duration-300"
          onClick={() => {
            goTo(Login);
          }}
        >
          <p className="font-bold text-base md:text-xl">Sign In</p>
        </button>
        <p className="text-gray-500 text-sm mt-2">
          Don't have an account?
          <button className="text-customMain text-sm font-semibold pl-1"
            onClick={() => {
              goTo(SignUp);
            }}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Landing;
