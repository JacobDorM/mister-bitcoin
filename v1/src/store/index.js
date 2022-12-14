import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { contactReducer } from './reducers/contactReducer'
import { userReducer } from './reducers/userReducer'
import { authReducer } from './reducers/authReducer'
import { moveReducer } from './reducers/moveReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  contactModule: contactReducer,
  userModule: userReducer,
  authModule: authReducer,
  moveModule: moveReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
window.gStore = store
