import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NiceButton } from '../cmps/NiceButton'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contactActions'
import { spendBalance } from '../store/actions/userActions'

class _ContactApp extends Component {
  async componentDidMount() {
    await this.props.loadContacts()
  }

  onRemoveContact = async (contactId) => {
    await this.props.removeContact(contactId)
  }

  onChangeFilter = (filterBy) => {
    this.props.setFilterBy(filterBy)
    this.props.loadContacts()
  }

  onSpendBalance = () => {
    this.props.spendBalance(5)
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
        <NiceButton Icon={() => '💰'} className="nice-button" onClick={this.onSpendBalance}>
          Spend Balance
        </NiceButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
  }
}

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
  spendBalance,
}

export const ContactApp = connect(mapStateToProps, mapDispatchToProps)(_ContactApp)
