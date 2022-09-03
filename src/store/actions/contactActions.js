import { contactService } from '../../services/contactService'

export function loadContacts() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().contactModule
      console.log(filterBy)
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
      const contact = await contactService.getById(contactId)
      dispatch({ type: 'SET_CONTACT', contact })
      return contact
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
      const savedContact = await contactService.save(contact)
      contact.id ? dispatch({ type: 'UPDATE_CONTACT', savedContact }) : dispatch({ type: 'UPDATE_CONTACT', savedContact })
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
