import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { useEffect, useState } from 'react'

const Root = () => {
  const [checkMode, setMode] = useState(localStorage.getItem('mode') || 'light');

  useEffect(() => {
    const html_tag = document.getElementById('html_tag');
    html_tag.setAttribute('class', localStorage.getItem('mode') || 'light');
  }, [checkMode])

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}



ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
