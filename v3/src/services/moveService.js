import { utilService } from './utilService'
import { storageService } from './async-storage-service.js'

export const moveService = {
  getByUsername,
  query,
  remove,
  save,
  getEmpty,
}

const MOVES_KEY = 'moves'

// _createMoves()

async function getEmpty() {
  return { _id: '', by: '', to: '', at: '', amount: '' }
}

async function query() {
  let moves = await storageService.query(MOVES_KEY)
  return utilService.sortBy(moves, 'amount')
}

function remove(id) {
  return storageService.remove(MOVES_KEY, id)
}

async function save(loggedInUser, contact, amount) {
  const { _id, fullname, username } = loggedInUser
  const newMove = await getEmpty()
  newMove.by = { _id, fullname, username }
  newMove.at = new Date()
  newMove.to = contact
  newMove.amount = amount
  return storageService.post(MOVES_KEY, newMove)
}

async function getByUsername(movename) {
  try {
    const moves = await query()
    let move = moves.find((move) => move.movename === movename)
    return move
  } catch (err) {
    throw err
  }
}

// async function _createMoves() {
//   let moves = await storageService.query(MOVES_KEY)
//   if (!moves || !moves.length) {
//     moves = [
//       {
//         _id: '',
//         username: 'd',
//         to: 'Faulkner Flore',
//         at: '',
//         amount: 3,
//       },
//       {
//         _id: '',
//         username: 'd',
//         to: 'Faulkner Flore',
//         at: '',
//         amount: 5,
//       },
//     ]
//     await storageService.postMany(MOVES_KEY, moves)
//   }
//   return moves
// }
