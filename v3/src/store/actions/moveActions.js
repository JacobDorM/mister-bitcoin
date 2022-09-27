import { moveService } from '../../services/moveService'

export function loadMoves() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().moveModule
      const moves = await moveService.query(filterBy)
      dispatch({ type: 'SET_MOVES', moves })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function loadMove(moveId) {
  return async (dispatch, getState) => {
    try {
      const move = moveId ? await moveService.getById(moveId) : await moveService.getEmpty()
      dispatch({ type: 'SET_MOVE', move })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setMove(move) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'SET_MOVE', move })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeMove(moveId) {
  return async (dispatch, getState) => {
    try {
      const move = await moveService.remove(moveId)
      dispatch({ type: 'REMOVE_MOVE', moveId })
      return move
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveMove(loggedInUser, contact, amount) {
  return async (dispatch, getState) => {
    try {
      console.log('loggedInUser', loggedInUser)
      console.log('contact', contact)
      console.log('amount', amount)
      const savedMove = await moveService.save(loggedInUser, contact, amount)
      console.log('savedMove', savedMove)
      dispatch({ type: 'ADD_MOVE', savedMove })
      return savedMove
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}
