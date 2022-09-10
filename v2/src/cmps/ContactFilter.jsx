import { connect } from 'react-redux'
import { FormTemplate } from '../cmps/FormTemplate'

const _ContactFilter = (props) => {
  const onChange = props.onChangeFilter
  const selectedFormFields = ['name', 'email', 'phone']
  const onSubmit = { action: null, forHtml: '' }
  const { filterBy } = props
  return (
    <section>
      <FormTemplate value={filterBy} className="contact-filter" selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChange} />
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    filterBy: state.contactModule.filterBy,
  }
}

export const ContactFilter = connect(mapStateToProps)(_ContactFilter)
