import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { NiceButton } from '../cmps/NiceButton'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contactActions'
import { spendCoins } from '../store/actions/authActions'

export const ContactApp = () => {
  const { contacts, filterBy } = useSelector((state) => state.contactModule)
  const { loggedInUser } = useSelector((state) => state.authModule)
  const dispatch = useDispatch()

  const onChangeFilter = useCallback(
    async (localFilterBy) => {
      await dispatch(setFilterBy(localFilterBy))
      await dispatch(loadContacts())
    },
    [dispatch]
  )

  const onRemoveContact = useCallback(
    (contactId) => {
      dispatch(removeContact(contactId))
    },
    [dispatch]
  )

  const onSpendCoins = useCallback(() => {
    dispatch(spendCoins(loggedInUser, 5))
  }, [dispatch, loggedInUser])

  const onClickedLog = useCallback(() => {
    console.log('nice button clicked')
  }, [])

  const logIcon = useCallback(() => '🍇', [])
  const spendIcon = useCallback(() => '💰', [])
  // const TextCmp = memo(() => <span>Nice Button</span>)

  if (!contacts) return <div>Loading...</div>

  return (
    <div className="contact-app">
      <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />
      <Link to={'/contact/edit'}>Add Contact</Link>
      <ContactList onRemoveContact={onRemoveContact} contacts={contacts} />
      <NiceButton Icon={logIcon} className="nice-button" onClick={onClickedLog}>
        Nice Button
      </NiceButton>
      <NiceButton Icon={spendIcon} className="nice-button" onClick={onSpendCoins}>
        Spend Coins
      </NiceButton>
    </div>
  )
}
