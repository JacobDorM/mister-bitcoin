import { FormTemplate } from './FormTemplate'

export const TransferFund = (props) => {
  const { contact, onTransferCoins, onChange, value } = props
  const selectedFormFields = ['amount']
  const onSubmit = { action: (e) => onTransferCoins(e), forHtml: 'Transfer' }
  if (!contact) return <div>Loading...</div>
  return <FormTemplate value={value} selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChange} />
}
