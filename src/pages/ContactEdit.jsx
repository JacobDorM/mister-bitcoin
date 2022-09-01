import { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { contactService } from '../services/contactService'
import { loadContact } from '../store/actions/contactActions'

class _ContactEdit extends Component {
  inputRef = createRef()
  // Todo: fix load/add and getEmpty
  async componentDidMount() {
    const contactId = this.props.match.params.id
    contactId ? this.props.loadContact(contactId) : this.props.loadContact()
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState((prevState) => ({ contact: { ...prevState.contact, [field]: value } }))
  }

  onSaveContact = async (ev) => {
    ev.preventDefault()
    await contactService.save({ ...this.state.contact })
    this.props.history.push('/contacts')
  }

  inputRefFunc = (elInput) => {
    elInput && elInput.focus()
  }

  render() {
    const { contact } = this.props
    if (!contact) return <div>Loading...</div>

    return (
      <section className="contact-edit">
        <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
        <form onSubmit={this.onSaveContact}>
          <label htmlFor="name">Name</label>
          <input ref={this.inputRefFunc} value={contact.name} onChange={this.handleChange} type="text" name="name" id="name" />
          <label htmlFor="email">Email</label>
          <input ref={this.inputRefFunc} value={contact.email} onChange={this.handleChange} type="text" name="email" id="email" />
          <label htmlFor="phone">Phone</label>
          <input ref={this.inputRefFunc} value={contact.phone} onChange={this.handleChange} type="text" name="phone" id="phone" />

          <button>Save</button>
        </form>
      </section>
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
  // saveContact,
}

export const ContactEdit = connect(mapStateToProps, mapDispatchToProps)(_ContactEdit)
