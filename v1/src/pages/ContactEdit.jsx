import { Component } from 'react'
import { connect } from 'react-redux'
import { loadContact, loadContacts } from '../store/actions/contactActions'
import { FormTemplate } from '../cmps/FormTemplate'

class _ContactEdit extends Component {
  async componentDidMount() {
    await this.props.loadContacts()
    const contactId = this.props.match.params.id
    contactId ? await this.props.loadContact(contactId) : await this.props.loadContact()
  }

  render() {
    const { contact, onChange, onSubmitContact } = this.props
    if (!contact) return <div>Loading...</div>
    const selectedFormFields = ['name', 'email', 'phone']
    const onSubmit = { action: (e) => onSubmitContact(e), forHtml: 'Save' }
    return (
      <section className="contact-edit">
        <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
        <FormTemplate value={contact} selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChange} />
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
  loadContacts,
}

export const ContactEdit = connect(mapStateToProps, mapDispatchToProps)(_ContactEdit)
