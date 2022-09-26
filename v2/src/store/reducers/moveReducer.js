const INITIAL_STATE = {
  moves: null,
  filterBy: null,
  move: null,
}

export function moveReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_MOVES':
      return {
        ...state,
        moves: action.moves,
      }

    case 'SET_MOVE':
      return {
        ...state,
        move: action.move,
      }

    case 'ADD_MOVE':
      return {
        ...state,
        moves: [...state.moves, action.savedMove],
      }

    case 'REMOVE_MOVE':
      return {
        ...state,
        moves: state.moves.filter((move) => move._id !== action.moveId),
      }

    case 'UPDATE_MOVE':
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
