import Header from '../components/header';
import { useEffect, useState } from 'react';

const Settings = () => {
    // since we have tailwind offers selector mode all we have to do is mutate the html method in the route to being 
    // either dark class or something else and change places to dark:... for wherver we want it to render differently
    const [darkMode, setDarkMode] = useState(localStorage.getItem('mode') || 'light');
    const [sliderValue, setSliderValue] = useState("")
    const min = "0", mid = "1800", max = "3600"

    const handleClick =  () => darkMode === 'dark' ? setDarkMode('light') : setDarkMode('dark')
    const handleSliderChange = (e) => {
        if(Number(e.target.value) >= Number(max)){
            setSliderValue(max)
        }
        else if(Number(e.target.value) <= Number(min) & e.target.value){
            setSliderValue(min)
        }
        else{
            setSliderValue(e.target.value)
        }
    }

    //handling click of 
    const setMax = () => setSliderValue(max)
    const setMid = () => setSliderValue(mid)
    const setMin = () => setSliderValue(min)

    useEffect(() => { 
        localStorage.setItem('mode', darkMode); // using localStorage to remember the setting
        const html_tag =  document.getElementById('html_tag'); // manipulate the html element in DOM
        html_tag.setAttribute("class", localStorage.getItem('mode')); //set the class to either dark or light mode
    }, [darkMode])

    return (
        <div className="w-[600px] h-[300px] bg-customBG dark:bg-customDarkBG">
            <Header />
            <div className="w-full h-5/6 flex justify-center flex flex-col items-center">
                <button className='w-48 mt-2 h-9 flex justify-center items-center rounded-md bg-customDark dark:bg-customAccent text-customBG hover:bg-customMain transition-colors duration-300' onClick={handleClick}>
                    {darkMode === 'dark'? 'Light Mode' : 'Dark Mode'}
                </button><br/><br/>

                <h3 class="text-customDark dark:text-customBG">
                    Set timer: <input type="text" value={sliderValue} min="0" max="3600" class="text-customDarkAccent bg-customBG  dark:text-customBG dark:bg-customAccent w-[55px] text-center border-2 border-customDark rounded-md" onChange={handleSliderChange}/> seconds
                </h3>

                <div class="relative mb-6">
                    <label for="labels-range-input" class="sr-only">Timer slider</label>
                    <input id="labels-range-input" type="range" value={sliderValue} min="0" max="3600" class="w-[300px] h-2 bg-customDark dark:bg-customBG rounded-lg appearance-none cursor-pointer" onChange={handleSliderChange}/>
                    <span class="text-sm text-customDark dark:text-customAccent absolute start-0 -bottom-6 cursor-pointer" onClick={setMin}>Min ({min})</span>
                    <span class="text-sm text-customDark dark:text-customAccent absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 cursor-pointer" onClick={setMid}>{mid}</span>
                    <span class="text-sm text-customDark dark:text-customAccent absolute end-0 -bottom-6 cursor-pointer" onClick={setMax}>Max ({max})</span>
                </div>
            </div>
        </div>
    )
}

export default Settings;