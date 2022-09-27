import { FormTemplate } from '../cmps/FormTemplate'
import { memo } from 'react'

export const ContactFilter = memo((props) => {
  const onChange = props.onChangeFilter
  const selectedFormFields = ['name', 'email', 'phone']
  const onSubmit = { action: null, forHtml: '' }
  return (
    <section>
      <FormTemplate value={props.filterBy} className="contact-filter" selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChange} />
    </section>
  )
})
