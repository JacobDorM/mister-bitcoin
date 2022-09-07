const INITIAL_STATE = {
  moves: null,
  filterBy: null,
  move: null,
}

export function moveReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        moves: action.moves,
      }

    case 'SET_CONTACT':
      return {
        ...state,
        move: action.move,
      }

    case 'ADD_CONTACT':
      return {
        ...state,
        moves: [...state.moves, action.savedMove],
      }

    case 'REMOVE_CONTACT':
      return {
        ...state,
        moves: state.moves.filter((move) => move._id !== action.moveId),
      }

    case 'UPDATE_CONTACT':
      return {
        ...state,
        moves: state.moves.map((move) => (move._id === action.savedMove._id ? action.savedMove : move)),
      }

    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }

    default:
      return state
  }
}
