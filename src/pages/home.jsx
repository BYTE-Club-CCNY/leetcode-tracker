import Header from '../components/header';
import Body from '../components/body';

const Home = ({leetUser}) => {
  return (
    <div className="w-[600px] h-[300px] bg-customBG dark:bg-customDarkBG">
      <Header />
      <Body />
    </div>
  )
}

export default Home;