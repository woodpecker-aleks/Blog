import { useMemo } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import postsReducer from '@redux/postsReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  posts: postsReducer,
})

let store

function initStore(preloadedState) {
  return createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(thunk)))
}

export const initializeStore = (preloadedState = {}) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (typeof window === 'undefined') return _store

  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
