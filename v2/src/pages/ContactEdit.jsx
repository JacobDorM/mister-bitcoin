import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadContact, loadContacts } from '../store/actions/contactActions'
import { FormTemplate } from '../cmps/FormTemplate'

const _ContactEdit = (props) => {
  const params = useParams()

  const loadContact = async (contactId) => {
    await props.loadContacts()
    contactId ? await props.loadContact(contactId) : await props.loadContact()
  }

  useEffect(() => {
    loadContact(params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const { contact, onChange, onSubmitContact } = props
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
