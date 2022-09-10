import { authService } from '../../services/authService'
import { saveUser } from './userActions'
import { saveMove } from './moveActions'

export function getLoggedInUser() {
  return async (dispatch) => {
    try {
      const loggedInUser = await authService.getLoggedInUser()
      dispatch({ type: 'SET_LOGGED_IN_USER', loggedInUser })
    } catch (err) {
      console.log(`couldn't getLoggedInUser: ${err}`)
    }
  }
}

export function saveLoggedInUser(loggedInUser) {
  return async (dispatch, getState) => {
    try {
      authService.save(loggedInUser)
      dispatch({ type: 'UPDATE_LOGGED_IN_USER', loggedInUser })
    } catch (err) {
      console.log(`couldn't getLoggedInUser: ${err}`)
    }
  }
}

export function login(user) {
  return async (dispatch, getState) => {
    try {
      const loggedInUser = await authService.login(user)
      dispatch(saveLoggedInUser(loggedInUser))
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

export function spendCoins(loggedInUser, amount) {
  return async (dispatch) => {
    try {
      loggedInUser = await authService.spendCoins(loggedInUser, amount)
      await dispatch(saveLoggedInUser(loggedInUser))
      await dispatch(saveUser(loggedInUser))
    } catch (err) {
      console.log(`couldn't spendCoins: ${err}`)
    }
  }
}

export function addMove(amount) {
  return async (dispatch, getState) => {
    try {
      const { contact } = getState().contactModule
      let { loggedInUser } = getState().authModule
      if (loggedInUser.coins - amount >= 0 && amount) {
        const move = await dispatch(saveMove(loggedInUser, contact, amount))
        loggedInUser = await authService.addMove(loggedInUser, move)
        dispatch(spendCoins(loggedInUser, amount))
      } else return Promise.reject("you Does't have enough coins or didnt choose amount of coins")
    } catch (err) {
      console.log(`couldn't addMove: ${err}`)
    }
  }
}
