import { authService } from '../../services/authService'
import { saveUser } from './userActions'

export function getLoggedInUser() {
  return async (dispatch, getState) => {
    try {
      const loggedInUser = await authService.getLoggedInUser()
      dispatch({ type: 'SET_LOGGED_IN_USER', loggedInUser })
    } catch (err) {
      console.log(`couldn't getLoggedInUser: ${err}`)
    }
  }
}

export function login(user) {
  return async (dispatch, getState) => {
    try {
      const loggedInUser = await authService.login(user)
      dispatch({ type: 'SET_LOGGED_IN_USER', loggedInUser })
    } catch (err) {
      console.log(`couldn't login: ${err}`)
    }
  }
}

export function logout() {
  return async (dispatch, getState) => {
    try {
      await authService.logout()
      dispatch({ type: 'REMOVE_LOGGED_IN_USER' })
    } catch (err) {
      console.log(`couldn't logout: ${err}`)
    }
  }
}

export function signup(user) {
  return async (dispatch, getState) => {
    try {
      await authService.signup(user)
      dispatch(saveUser(user))
    } catch (err) {
      console.log(`couldn't signup: ${err}`)
    }
  }
}
