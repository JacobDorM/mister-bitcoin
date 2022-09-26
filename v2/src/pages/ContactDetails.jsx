import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadContact } from '../store/actions/contactActions'
import { TransferFund } from '../cmps/TransferFund'
import { MoveList } from '../cmps/MoveList'

export const ContactDetails = (props) => {
  let params = useParams()
  const { contact } = useSelector((state) => state.contactModule)
  const dispatch = useDispatch()
  const history = useHistory()

  const { onTransferCoins, onChangefunds, funds, loggedInUser } = props

  useEffect(() => {
    dispatch(loadContact(params.id))
  }, [params.id, dispatch])

  const onBack = () => {
    history.push('/contacts')
  }

  if (!contact || !loggedInUser) return <div>Loading...</div>
  const moves = loggedInUser.moves.filter((move) => move.to._id === contact._id)
  return (
    <div className="contact-details">
      {Object.entries(contact).map(([key, value]) => {
        return (
          <section key={key}>
            <h3>{key === '_id' ? '' : `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</h3>
          </section>
        )
      })}
      <img src={`https://robohash.org/${contact._id}`} alt="" />
      <button onClick={onBack}>Back</button>
      {/* <Link to="/contact/r3">Next Contact</Link> */}
      <TransferFund contact={contact} onTransferCoins={onTransferCoins} onChange={onChangefunds} value={funds} />
      <MoveList moves={moves} />
    </div>
  )
}
