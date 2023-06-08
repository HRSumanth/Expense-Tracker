import { useNavigate } from 'react-router-dom';
import classes from './HomePage.module.css';

const HomePage = () => {
  const navigate= useNavigate()

  const profileHandler = ()=>{
    navigate('./profile')
  }
  return <section className={classes.starting}>
     <p>Welcome on Expense Tracker!</p>
     <div className={classes.profile}>
     <p>your Profile is incomplete.</p>
     <button onClick={profileHandler}>Complete Now</button>
     </div>
     
    </section>
};

export default HomePage;
