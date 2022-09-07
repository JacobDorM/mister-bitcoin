import { Component } from 'react'
import { FormTemplate } from './FormTemplate'

export class TransferFund extends Component {
  state = {}

  async componentDidMount() {}

  async onTransferCoins() {}

  render() {
    const { contact, onTransferCoins, onChange, value } = this.props
    const selectedFormFields = ['amount']
    const onSubmit = { action: (e) => onTransferCoins(e), forHtml: 'Transfer' }
    if (!contact) return <div>Loading...</div>
    return <FormTemplate value={value} selectedFormFields={selectedFormFields} onSubmit={onSubmit} onChange={onChange} />
  }
}
