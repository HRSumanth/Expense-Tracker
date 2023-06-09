import React, {Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './HomePage.module.css';
import ExpenseTracker from '../components/ExpenseTracker/ExpenseTracker';


const HomePage = () => {
  const navigate= useNavigate()

  const profileHandler = ()=>{
    navigate('./profile')
  }
  return (
    <Fragment>
    <section className={classes.starting}>
     <p>Welcome on Expense Tracker!</p>
     <div className={classes.profile}>
     <p>your Profile is incomplete.</p>
     <button className={classes.profilebtn} onClick={profileHandler}>Complete Now</button>
     </div>
    </section>
    <ExpenseTracker></ExpenseTracker>
    </Fragment>

  )
  
};

export default HomePage;
