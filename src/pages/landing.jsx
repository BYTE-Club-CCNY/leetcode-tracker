import SignUp from './signup'
import Home from './home';
import { Link } from 'react-chrome-extension-router';


const Landing = () => {
  return (
    <div className="w-[250px] h-[100px] bg-customBG flex flex-col justify-center items-center">
      <Link component={SignUp}>
        <button className="w-48 mt-2 h-9 flex justify-center items-center rounded-md bg-customDark text-customBG hover:text-customBG hover:bg-customMain transition-colors duration-300">
          <p className="font-bold text-base md:text-xl">Get Started</p>
        </button>
      </Link>
    </div>
  )
}

export default Landing;
