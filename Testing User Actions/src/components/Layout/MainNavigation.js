import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Store/AuthContext';
import { emptyCart } from '../../Store/ExpenseReducer';
import classes from './MainNavigation.module.css';

import { useDispatch, useSelector } from 'react-redux';

const MainNavigation = () => {
  const dispatch = useDispatch()
  const authCtx = useSelector(state=>state.auth)
  const navigate=useNavigate();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler =()=>{
    dispatch(logout())
    dispatch(emptyCart())
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