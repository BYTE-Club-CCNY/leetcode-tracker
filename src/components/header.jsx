import { goTo } from 'react-chrome-extension-router';
import Home from '../pages/home';
import Settings from '../pages/settings';
import History from '../pages/history';
import Login from '../pages/login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import supabase from '../supabaseClient';


const Header = () => {

  function handleLogOut() {
    supabase.auth.signOut();
    goTo(Login);
  }

    return (
        <div className="w-full h-1/6 bg-customDark">
        <div className="flex justify-between h-full items-center p-2">
          <div onClick={()=>{ goTo(Home); }} className="text-customBG text-4xl font-bold cursor-pointer">
            TrackLeet
          </div>
          <div className="flex gap-6 text-customBG text-lg items-center">
            <div onClick= {()=>{ goTo(History); } } className="cursor-pointer">
            <FontAwesomeIcon icon={faBars} className="mr-1"/>
              History
            </div>
            <div onClick = {() => { goTo(Settings); }} className="cursor-pointer">
            <FontAwesomeIcon icon={faGear} className="mr-1"/>
              Settings
            </div>
            <div onClick = {() => { handleLogOut() }} className="cursor-pointer">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-1"/>
              Log Out
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header;