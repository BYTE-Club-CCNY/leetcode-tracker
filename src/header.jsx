import { goTo } from 'react-chrome-extension-router';
import Home from './pages/home';
import Settings from './pages/settings';
import History from './pages/history';
import Landing from './pages/landing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
    return (
        <div className="w-full h-1/6 bg-customDark">
        <div className="flex justify-between h-full">
          <div onClick={()=>{ goTo(Home); }} className="text-customBG text-4xl font-bold cursor-pointer pt-1">
            TrackLeet
          </div>
          <div className="flex gap-6 text-customBG text-lg pt-4">
            <div>
            <FontAwesomeIcon onClick= {()=>{ goTo(History); } }icon={faBars} className="mr-1 cursor-pointer"/>
              History
            </div>
            <div>
            <FontAwesomeIcon onClick = {() => { goTo(Settings); }} icon={faGear} className="mr-1 cursor-pointer"/>
              Settings
            </div>
            <div>
            <FontAwesomeIcon onClick = {() => { goTo(Landing); }} icon={faArrowRightFromBracket} className="mr-1 cursor-pointer"/>
              Log Out
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header;