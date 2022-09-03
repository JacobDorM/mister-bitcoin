import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NiceButton } from '../cmps/NiceButton'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'
import { utilService } from '../services/utilService'
import { loadContacts, removeContact, setFilterBy, saveContact } from '../store/actions/contactActions'
import { spendCoins, saveLoggedInUser } from '../store/actions/authActions'
import { saveUser } from '../store/actions/userActions'

class _ContactApp extends Component {
  state = {
    filterBy: this.props.filterBy,
  }

  async componentDidMount() {
    await this.props.loadContacts()
  }

  onRemoveContact = async (contactId) => {
    await this.props.removeContact(contactId)
  }

  onChangeFilter = async (e) => {
    await utilService.onChange(e, this, 'filterBy')
    await this.props.setFilterBy({ ...this.state.filterBy })
    await this.props.loadContacts()
  }

  onSpendCoins = async () => {
    await this.props.spendCoins(5)
    await this.props.saveLoggedInUser(this.props.loggedInUser)
    await this.props.saveUser(this.props.loggedInUser)
  }

  render() {
    const { contacts } = this.props
    if (!contacts) return <div>Loading...</div>
    const TextCmp = () => <span>Nice Button</span>
    const Icon = () => '🍇'

    return (
      <div className="contact-app">
        <ContactFilter onChangeFilter={this.onChangeFilter} />
        <Link to="/contact/edit">Add Contact</Link>
        <ContactList history={this.props.history} onRemoveContact={this.onRemoveContact} contacts={contacts} />
        <NiceButton Icon={Icon} className="nice-button" onClick={() => console.log('nice button clicked')}>
          <TextCmp />
        </NiceButton>
        <NiceButton Icon={() => '💰'} className="nice-button" onClick={this.onSpendCoins}>
          Spend Coins
        </NiceButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
    filterBy: state.contactModule.filterBy,
    loggedInUser: state.authModule.loggedInUser,
  }
}

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
  spendCoins,
  saveContact,
  saveUser,
  saveLoggedInUser,
}

export const ContactApp = connect(mapStateToProps, mapDispatchToProps)(_ContactApp)
