import Header from '../components/header';

const Settings = () => {
    return (
        <div className="w-[600px] h-[300px] bg-customBG rounded-lg">
            <Header />
            <div className="w-full h-5/6 flex justify-center items-center">
                Welcome to the temporary settings page
            </div>
        </div>
    )
}

export default Settings;