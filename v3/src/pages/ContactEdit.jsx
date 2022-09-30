import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadContact } from '../store/actions/contactActions'
import { FormTemplate } from '../cmps/FormTemplate'

export const ContactEdit = (props) => {
  const params = useParams()
  const { contact } = useSelector((state) => state.contactModule)
  const dispatch = useDispatch()

  const { onChange, onSubmitContact } = props
  const selectedFormFields = ['name', 'email', 'phone']
  const onSubmit = { action: (e) => onSubmitContact(e), forHtml: 'Save' }

  useEffect(() => {
    const contactId = params.id
    dispatch(loadContact(contactId))
  }, [params.id, dispatch])

  if (!contact) return <div>Loading...</div>
  return (
    <section className="contact-edit">
      <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
      <FormTemplate value={contact} selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChange} />
    </section>
  )
}
