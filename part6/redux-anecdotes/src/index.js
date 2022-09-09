import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import searchFilterReducer from './reducers/searchFilterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: searchFilterReducer
  }
})


console.log(store.getState())


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
