const Redux = require('redux')


const storeReducer =(state={counter:0}, action)=>{
     switch (action.type) {
        case 'INCREMENT':
            return{
              counter:state.counter+1
            }
            
        case 'DECREMENT' :
            return{
                counter:state.counter-1
              }
           
        default:
            return{
                counter:state.counter
            }
     }
}

const store = Redux.createStore(storeReducer)


const component =()=>{
    const stateChange = store.getState()
    console.log(stateChange)
}


store.subscribe(component)

store.dispatch({type:'INCREMENT'})
store.dispatch({type:'INCREMENT'})
store.dispatch({type:'INCREMENT'})
store.dispatch({type:'INCREMENT'})
store.dispatch({type:'INCREMENT'})
store.dispatch({type:'DECREMENT'})