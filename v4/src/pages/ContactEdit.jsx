import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadContact } from '../store/actions/contactActions'
import { FormTemplate } from '../cmps/FormTemplate'
import { setContact, saveContact, loadContacts } from '../store/actions/contactActions'
import { useForm } from '../customHooks/useForm'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export const ContactEdit = (props) => {
  const { contact } = props

  const firstTimeRender = useRef(true)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChangeContact = () => {
    dispatch(setContact(localContact))
  }

  const [localContact, handleChange, setLocalContact] = useForm(contact, onChangeContact)

  useEffectUpdate(() => {
    if (firstTimeRender.current) {
      firstTimeRender.current = false
      setLocalContact(contact)
    }
  }, [contact, setLocalContact])

  useEffect(() => {
    dispatch(loadContact(params.id))
  }, [params.id, dispatch])

  const onSubmitContact = async (e) => {
    e.preventDefault()
    await dispatch(saveContact(localContact))
    await dispatch(loadContacts())
    navigate('/contacts')
  }

  const selectedFormFields = ['name', 'email', 'phone']
  const onSubmit = { action: (e) => onSubmitContact(e), forHtml: 'Save' }

  if (!contact) return <div>Loading...</div>
  return (
    <section className="contact-edit">
      <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
      <FormTemplate value={contact} selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={handleChange} />
    </section>
  )
}
