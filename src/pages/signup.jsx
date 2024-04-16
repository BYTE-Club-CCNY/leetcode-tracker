import { useState } from 'react'
import Login from './login'
import Home from './home';
import { Link, goTo } from 'react-chrome-extension-router';
import supabase from '../supabaseClient';

const SignUp = () => {

  const [formData, setFormData] = useState({
    email: "",
    leetcodeUser: "",
    password: "",
    confirmPassword: "",
  });

  const[failedReqs, setReqs] = useState({
    failedSignUp: false,
    failedMessage: '',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //insert user data to auth.Users table
    const {data, error} = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options:{
        data:{
          leetcodeUser: formData.leetcodeUser,
        }
      }
    });
    
    if(error) {
      setReqs({
        failedSignUp: true,
        failedMessage: error.message,
      });
    }
    else {
      if (failedReqs.failedSignUp) {
        setReqs({
          failedSignUp: false, 
          failedMessage: '',
        });
      }

      const user = await supabase.auth.getUserIdentities();
      const leetUser = user.data.identities[0].identity_data.leetcodeUser;
      goTo(Home, {leetUser});
    }
  };
  
  return (
    <div className="w-[450px] h-[550px] bg-customBG">
      <div className="text-customMain text-5xl font-bold w-[250px] p-3">TrackLeet</div>
      <div className="flex flex-col justify-center items-center text-customDark">
        <div className="text-4xl font-bold mt-4 mb-2">Sign Up</div>
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
            htmlFor="leetcodeUser">Leetcode Username</label>
          <input
            className="w-full bg-white border-2 border-customDark rounded-md p-1 mb-3"
            id="leetcodeUser"
            name="leetcodeUser"
            type="text"
            placeholder=""
            value={formData.name}
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
          <label
            className="text-xl font-semibold text-left"
            htmlFor="password">Confirm Password</label>
          <input
            className="w-full bg-white border-2 border-customDark rounded-md p-1 mb-3"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder=""
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </form>
        <button onClick={handleSubmit} className="w-48 mt-2 h-9 flex justify-center items-center rounded-md bg-customDark text-customBG hover:text-customBG hover:bg-customMain transition-colors duration-300">
          <p className="font-bold text-base md:text-xl">Sign Up</p>
        </button>
        <div className="text-base mt-3 font-light">Already have an account? <Link component={Login} className="text-customAccent hover:text-customMain font-semibold">Log In</Link></div>
        {failedReqs.failedSignUp && <div className="mt-2 bg-red-500 px-2 py-2 rounded text-gray-100">{failedReqs.failedMessage}</div>}
      </div>
    </div>
  )
}

export default SignUp;
