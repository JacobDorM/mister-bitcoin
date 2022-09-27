import { contactService } from '../../services/contactService'

export function loadContacts() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().contactModule
      const contacts = await contactService.query(filterBy)
      dispatch({ type: 'SET_CONTACTS', contacts })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function loadContact(contactId) {
  return async (dispatch, getState) => {
    try {
      const contact = contactId ? await contactService.getById(contactId) : await contactService.getEmpty()
      dispatch({ type: 'SET_CONTACT', contact })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setContact(contact) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'SET_CONTACT', contact })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeContact(contactId) {
  return async (dispatch, getState) => {
    try {
      const contact = await contactService.remove(contactId)
      dispatch({ type: 'REMOVE_CONTACT', contactId })
      return contact
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveContact(contact) {
  return async (dispatch, getState) => {
    try {
      const savedContact = await contactService.save({ ...contact })
      contact._id ? dispatch({ type: 'UPDATE_CONTACT', savedContact }) : dispatch({ type: 'ADD_CONTACT', savedContact })
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
