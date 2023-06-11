import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './MainNavigation.module.css';

import { useSelector } from 'react-redux';

const MainNavigation = () => {
  const authCtx = useSelector(state=>state.auth)
  const expenseContext= useSelector(state=>state.expense.expense)
  const navigate=useNavigate();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler =()=>{
    authCtx.logout()
    expenseContext.emptyCart()
    navigate('./auth');
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn && (   
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;