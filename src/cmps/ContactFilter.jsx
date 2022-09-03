import { Component } from 'react'
import { FormTemplate } from '../cmps/FormTemplate'

export class ContactFilter extends Component {
  state = {
    // name: '',
    // email: '',
    // phone: '',
    // filterBy: '',
  }

  // handleChange = ({ target }) => {
  //   const field = target.name
  //   const value = target.type === 'number' ? +target.value || '' : target.value
  //   this.setState({ [field]: value }, () => {
  //     this.props.onChangeFilter({ ...this.state })
  //   })
  // }

  render() {
    const onChange = this.props.onChangeFilter
    // const onSubmit = utilService.onSubmit
    // this.props.onChangeFilter({ ...this.state })
    const selectedFormFields = ['name', 'email', 'phone']
    const onSubmit = { action: null, forHtml: '' }
    const value = { ...this.state }

    // const { name, email, phone } = this.state
    return (
      <section>
        <FormTemplate value={value} className="contact-filter" selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChange} />
      </section>
      /* <form className="contact-filter">
        <section>
          <label htmlFor="name">Name</label>
          <input value={name} onChange={this.handleChange} type="text" name="name" id="name" placeholder="Search name..." />
        </section>
        <section>
          <label htmlFor="email">Email</label>
          <input value={email} onChange={this.handleChange} type="text" name="email" id="email" placeholder="Search email..." />
        </section>
        <section>
          <label htmlFor="phone">Phone</label>
          <input value={phone} onChange={this.handleChange} type="number" name="phone" id="phone" placeholder="Search phone..." />
        </section>
      </form> */
    )
  }
}
