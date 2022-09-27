import { useState, useEffect } from 'react'
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
    const onSetContacts = async () => {
      await dispatch(setFilterBy({ ...localFilterBy }))
      await dispatch(loadContacts())
    }

    onSetContacts()
  }, [localFilterBy, dispatch])

  const onRemoveContact = async (contactId) => {
    await dispatch(removeContact(contactId))
  }

  const onSpendCoins = async () => {
    await dispatch(spendCoins(loggedInUser, 5))
  }

  if (!contacts) return <div>Loading...</div>
  const TextCmp = () => <span>Nice Button</span>
  const Icon = () => '🍇'
  // to="/contact/edit"
  return (
    <div className="contact-app">
      <ContactFilter onChangeFilter={(e) => utilService.hookOnChange(e, setLocalFilterBy)} filterBy={localFilterBy} />
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
