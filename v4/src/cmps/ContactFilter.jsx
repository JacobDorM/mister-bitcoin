import { FormTemplate } from '../cmps/FormTemplate'
import { memo } from 'react'
import { useForm } from '../customHooks/useForm'

export const ContactFilter = memo((props) => {
  const { onChangeFilter, filterBy } = props
  const [localFilterBy, handleChange] = useForm(filterBy, onChangeFilter)

  const selectedFormFields = ['name', 'email', 'phone']
  const onSubmit = { action: null, forHtml: '' }
  console.log('render contactFilter')
  return (
    <section>
      <FormTemplate value={localFilterBy} className="contact-filter" selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={handleChange} />
    </section>
  )
})
