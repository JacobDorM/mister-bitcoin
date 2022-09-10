import { Component } from 'react'
import { connect } from 'react-redux'
import { loadContact } from '../store/actions/contactActions'
import { TransferFund } from '../cmps/TransferFund'
import { MoveList } from '../cmps/MoveList'
class _ContactDetails extends Component {
  async componentDidMount() {
    const contactId = this.props.match.params.id
    await this.props.loadContact(contactId)
  }

  onBack = () => {
    this.props.history.push('/contacts')
    // this.props.history.goBack()
  }

  render() {
    const { contact, onTransferCoins, onChangefunds, funds, loggedInUser } = this.props

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
        <button onClick={this.onBack}>Back</button>
        {/* <Link to="/contact/r3">Next Contact</Link> */}
        <TransferFund contact={contact} onTransferCoins={onTransferCoins} onChange={onChangefunds} value={funds} />
        <MoveList moves={moves} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.contactModule.contact,
  }
}

const mapDispatchToProps = {
  loadContact,
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)
