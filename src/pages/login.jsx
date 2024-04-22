import { useState } from 'react'
import { Link, goTo, goBack } from 'react-chrome-extension-router';
import SignUp from "./signup";
import Home from "./home";
import supabase from '../supabaseClient';

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    leetcodeUser: "",
    password: "",
    confirmPassword: "",
  });

  const[invalidCredentials, setCredentials] = useState({
    failedLogin: false,
    failedMessage: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => { //maybe switch to using useEffect here since we have external dependencies
    e.preventDefault();
    // TODO: Implement form submission

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setCredentials({
        failedLogin: true,
        failedMessage: error.message,
      });
    }
    else {
      if (invalidCredentials.failedLogin) { //resetting the invalid creds state
        setCredentials({
          failedLogin: false,
          failedMessage: '',
        })
      }

      let leetUser = data.user.user_metadata.leetcodeUser;
      goTo(Home, {leetUser});
    }
    
  };
  
  return (
    <div className="w-[450px] h-[400px] bg-customBG">
      <div className="text-customMain text-5xl font-bold w-[250px] p-3">TrackLeet</div>
      <div className="flex flex-col justify-center items-center text-customDark">
        <div className="text-4xl font-bold mt-4 mb-2">Log In</div>
        <form className="flex flex-col items-left w-[350px]">
          <label
            className="text-xl font-semibold text-left"
            htmlFor="email">Email</label>
          <input
            className="w-full bg-white border-2 border-customDark rounded-md p-1 mb-3"
            id="email"
            name="email"
            type="email"
            placeholder=""
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label
            className="text-xl font-semibold text-left"
            htmlFor="password">Password</label>
          <input
            className="w-full bg-white border-2 border-customDark rounded-md p-1 mb-3"
            id="password"
            name="password"
            type="password"
            placeholder=""
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </form>
        <button onClick={handleSubmit} className="w-48 mt-2 h-9 flex justify-center items-center rounded-md bg-customDark text-customBG hover:text-customBG hover:bg-customMain transition-colors duration-300">
          <p className="font-bold text-base md:text-xl">Log In</p>
        </button>
        <div className="text-base mt-3 font-light">Don't have an account? <Link component={SignUp} className="text-customAccent hover:text-customMain font-semibold">Sign Up</Link></div>
        {invalidCredentials.failedLogin && <div className="mt-2 bg-red-500 px-2 py-2 rounded text-gray-100">{invalidCredentials.failedMessage + ": email or password is incorrect"}</div>}
      </div>
    </div>
  )
}

export default Login;