import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { NiceButton } from '../cmps/NiceButton'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'
import { utilService } from '../services/utilService'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contactActions'
import { spendCoins } from '../store/actions/authActions'

export const ContactApp = () => {
  const { contacts, filterBy } = useSelector((state) => state.contactModule)
  const { loggedInUser } = useSelector((state) => state.authModule)
  const [localFilterBy, setLocalFilterBy] = useState(filterBy)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadContacts())
  }, [dispatch])

  useEffect(() => {
    if (!localFilterBy) return
    const onChangeFilterUpdate = async () => {
      await dispatch(setFilterBy({ ...localFilterBy }))
      await dispatch(loadContacts())
    }

    onChangeFilterUpdate()
  }, [localFilterBy, dispatch])

  const onRemoveContact = useCallback(
    (contactId) => {
      dispatch(removeContact(contactId))
    },
    [dispatch]
  )

  const onChangeFilter = useCallback((e) => {
    utilService.hookOnChange(e, setLocalFilterBy)
  }, [])

  const onSpendCoins = async () => {
    await dispatch(spendCoins(loggedInUser, 5))
  }

  if (!contacts) return <div>Loading...</div>
  console.log(contacts)
  const TextCmp = () => <span>Nice Button</span>
  const Icon = () => '🍇'
  // to="/contact/edit"
  return (
    <div className="contact-app">
      <ContactFilter onChangeFilter={onChangeFilter} filterBy={localFilterBy} />
      <Link to={'/contact/edit'}>Add Contact</Link>
      <ContactList onRemoveContact={onRemoveContact} contacts={contacts} />
      <NiceButton Icon={Icon} className="nice-button" onClick={() => console.log('nice button clicked')}>
        <TextCmp />
      </NiceButton>
      <NiceButton Icon={() => '💰'} className="nice-button" onClick={onSpendCoins}>
        Spend Coins
      </NiceButton>
    </div>
  )
}
