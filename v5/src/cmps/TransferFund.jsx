import { FormTemplate } from './FormTemplate'

export const TransferFund = (props) => {
  const { contact, onTransferCoins, onChangefunds, funds } = props
  const selectedFormFields = ['amount']
  const onSubmit = { action: (e) => onTransferCoins(e), forHtml: 'Transfer' }

  if (!contact) return <div>Loading...</div>
  return <FormTemplate value={funds} selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChangefunds} />
}
