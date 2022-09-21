import { useSelector } from 'react-redux'
import { FormTemplate } from '../cmps/FormTemplate'

export const ContactFilter = (props) => {
  const onChange = props.onChangeFilter
  const selectedFormFields = ['name', 'email', 'phone']
  const onSubmit = { action: null, forHtml: '' }
  const { filterBy } = useSelector((state) => state.contactModule)
  return (
    <section>
      <FormTemplate value={filterBy} className="contact-filter" selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChange} />
    </section>
  )
}
