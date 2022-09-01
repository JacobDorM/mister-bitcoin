import { Component } from 'react'
import { formService } from '../services/formService'

export class FormTemplate extends Component {
  state = {
    formFields: null,
  }

  async componentDidMount() {
    const formFields = await formService.query()
    this.setState({ formFields })
  }

  render() {
    const { selectedFormFields, onSubmit, onChange } = this.props
    const { formFields } = this.state
    if (!formFields) return <div>Loading...</div>
    return (
      <section>
        <form onSubmit={onSubmit.action}>
          {formFields.map((field) => {
            if (selectedFormFields.find((selectedField) => selectedField === field.name)) {
              return (
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.forHtml}</label>
                  <input onChange={onChange} type="text" name={field.name} placeholder={field.placeholder} id={field.name} />
                </div>
              )
            } else return ''
          })}
          <button>{onSubmit.forHtml}</button>
        </form>
      </section>
    )
  }
}
