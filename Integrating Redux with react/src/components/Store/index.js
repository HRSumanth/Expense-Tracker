import {createStore} from 'redux'


const storeReducer =(state={counter:0}, action)=>{
     switch (action.type) {
        case 'INCREMENT':
            return{
              counter:state.counter+2
            }
            
        case 'DECREMENT' :
            return{
                counter:state.counter-2
              }
           
        default:
            return{
                counter:state.counter
            }
     }
}

const store = createStore(storeReducer)

export default store
