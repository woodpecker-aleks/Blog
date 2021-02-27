import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import postsReducer from './postsReducer'

const initialState = {}
const middleware = [thunk]

const reducers = combineReducers({
  posts: postsReducer,
})

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
