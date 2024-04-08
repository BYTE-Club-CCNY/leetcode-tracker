import { useState, useEffect } from 'react'
import supabase from './supabaseClient'
import './App.css'
import Signup from './components/auth/signup';

function App() {

  const [userLeet, setUserLeet] = useState([]);
  
  return (
    <>
    <Signup />
    </>
  )
}

export default App
