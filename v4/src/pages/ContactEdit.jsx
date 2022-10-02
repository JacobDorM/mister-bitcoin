import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadContact } from '../store/actions/contactActions'
import { FormTemplate } from '../cmps/FormTemplate'
import { setContact, saveContact } from '../store/actions/contactActions'
import { utilService } from '../services/utilService'

export const ContactEdit = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const contactId = params.id
    dispatch(loadContact(contactId))
  }, [params.id, dispatch])

  const [localContact, setLocalContact] = useState(null)

  const onChangeContact = async (e) => {
    setLocalContact(contact)
    await utilService.hookOnChange(e, setLocalContact)
  }

  useEffect(() => {
    dispatch(setContact(localContact))
  }, [localContact, dispatch])

  const onSubmitContact = async (e) => {
    e.preventDefault()
    await dispatch(saveContact(localContact))
    navigate('/contacts')
  }

  const { contact } = props
  const selectedFormFields = ['name', 'email', 'phone']
  const onSubmit = { action: (e) => onSubmitContact(e), forHtml: 'Save' }

  if (!contact) return <div>Loading...</div>
  return (
    <section className="contact-edit">
      <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
      <FormTemplate value={contact} selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChangeContact} />
    </section>
  )
}
