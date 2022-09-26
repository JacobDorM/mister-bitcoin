const INITIAL_STATE = {
  contacts: null,
  filterBy: null,
  contact: null,
}

export function contactReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.contacts,
      }

    case 'SET_CONTACT':
      return {
        ...state,
        contact: action.contact,
      }

    case 'ADD_CONTACT':
      console.log(state)
      return {
        ...state,
        contacts: [...state.contacts, action.savedContact],
      }

    case 'REMOVE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact._id !== action.contactId),
      }

    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((contact) => (contact._id === action.savedContact._id ? action.savedContact : contact)),
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
