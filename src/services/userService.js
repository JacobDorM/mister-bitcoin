import { utilService } from './utilService'
import { storageService } from './async-storage-service.js'

export const userService = {
  addMove,
  getByUsername,
  query,
  remove,
  save,
  getEmpty,
}

const USERS_KEY = 'users'

_createUsers()

function addMove(contact, amount) {
  return
}

async function getEmpty() {
  return { _id: '', fullname: '', username: '', password: '', coins: 100, moves: [] }
}

async function query() {
  let users = await storageService.query(USERS_KEY)
  return utilService.sortBy(users, 'fullname')
}

function remove(id) {
  return storageService.remove(USERS_KEY, id)
}

function save(user) {
  if (user._id) return storageService.put(USERS_KEY, user)
  else return storageService.post(USERS_KEY, user)
}

async function getByUsername(username) {
  try {
    const users = await query()
    let user = users.find((user) => user.username === username)
    return user
  } catch (err) {
    throw err
  }
}

async function _createUsers() {
  let users = await storageService.query(USERS_KEY)
  if (!users || !users.length) {
    users = [
      {
        _id: '',
        fullname: 'dor',
        username: 'dd',
        password: '1234',
        coins: 100,
        moves: [],
      },
      {
        _id: '',
        fullname: 'or',
        username: 'rr',
        password: '12',
        coins: 100,
        moves: [],
      },
    ]
    await storageService.postMany(USERS_KEY, users)
  }
  return users
}

// async function getLoggedInUser() {
//   return {
//     name: 'Dominique Sote',
//     coins: 200,
//     moves: [],
//   }
// }
