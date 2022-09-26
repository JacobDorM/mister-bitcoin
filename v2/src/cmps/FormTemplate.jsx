import { useState, useEffect } from 'react'
import { formService } from '../services/formService'

export const FormTemplate = (props) => {
  const [formFields, setFormFields] = useState(null)
  const { selectedFormFields, onSubmit, onChange, className, value } = props

  useEffect(() => {
    getFormFields()
  }, [])

  const getFormFields = async () => {
    const allFormFields = await formService.query()
    setFormFields(allFormFields)
  }

  if (!formFields) return <div>Loading...</div>
  return (
    <form onSubmit={onSubmit.action} className={className}>
      {formFields.map((field) => {
        if (selectedFormFields.find((selectedField) => selectedField === field.name)) {
          return (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.forHtml}</label>
              <input value={value && value[field.name] ? value[field.name] : ''} onChange={onChange} type={field.type} name={field.name} placeholder={field.placeholder} id={field.name} min={field.min} />
            </div>
          )
        } else return ''
      })}
      {onSubmit.action ? <button>{onSubmit.forHtml}</button> : ''}
    </form>
  )
}
