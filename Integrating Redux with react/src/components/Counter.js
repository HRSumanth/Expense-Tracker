import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';


const Counter = () => {
  const dispatch=useDispatch()
  const counter = useSelector(state=>state.counter)
  console.log(counter)
  const toggleCounterHandler = () => {
   // useDispatch({type:'INCREMENT'})
  };

  const incrementHandler = ()=>{
     dispatch({type:"INCREMENT"})
  }
  const decrementHandler = ()=>{
    dispatch({type:"DECREMENT"})
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter} </div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
