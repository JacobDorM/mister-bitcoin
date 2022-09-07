import { userService } from './userService'
export const authService = {
  signup,
  login,
  getLoggedInUser,
  logout,
  save,
  addMove,
  spendCoins,
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

async function signup(userInfo) {
  try {
    if (!userInfo.username || !userInfo.password || !userInfo.fullname) return Promise.reject('Missing required signup information')
    const userExist = await userService.getByUsername(userInfo.username)
    if (userExist) return Promise.reject('Username already taken')
  } catch (err) {
    console.log(`couldn't signup: ${err}`)
  }
}

async function login(userInfo) {
  try {
    if (!userInfo.username || !userInfo.password) return Promise.reject('Missing required login information')
    const user = await userService.getByUsername(userInfo.username)
    if (user && user.password === userInfo.password) {
      return user
    } else return Promise.reject('Username or password is inncorect')
  } catch (err) {
    console.log(`couldn't login: ${err}`)
  }
}

function getLoggedInUser() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
  } catch (err) {
    console.log(`can't get loggedInUser data: ${err}`)
  }
}

async function logout() {
  try {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  } catch (err) {
    console.log(`can't delete loggInUser from session: ${err}`)
  }
}

function save(user) {
  try {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    // return user
  } catch (err) {
    console.log(`can't save loggInUser to session: ${err}`)
  }
}

function spendCoins(loggedInUser, amount) {
  if (loggedInUser.coins - amount >= 0) {
    loggedInUser.coins -= amount
    return loggedInUser
  } else return Promise.reject("loggedInUser doesn't have enough coins")
}

async function addMove(loggedInUser, move) {
  loggedInUser.moves.push(move)
  return loggedInUser
}
