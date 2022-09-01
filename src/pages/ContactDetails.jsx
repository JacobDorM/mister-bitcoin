import { Component } from 'react'
// import { Link } from 'react-router-dom'
import { contactService } from '../services/contactService'

export class ContactDetails extends Component {
  state = {
    contact: null,
  }

  componentDidMount() {
    this.loadContact()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }
  }

  async loadContact() {
    const contactId = this.props.match.params.id
    const contact = await contactService.getById(contactId)
    this.setState({ contact })
  }

  onBack = () => {
    this.props.history.push('/contacts')
    // this.props.history.goBack()
  }

  render() {
    const { contact } = this.state
    if (!contact) return <div>Loading...</div>
    return (
      <div className="contact-details">
        {Object.entries(contact).map(([key, value]) => {
          return (
            <section key={key}>
              <h3>{key === '_id' ? '' : `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</h3>
            </section>
          )
        })}
        <img src={`https://robohash.org/${contact._id}`} alt="" />
        <button onClick={this.onBack}>Back</button>
        {/* <Link to="/contact/r3">Next Contact</Link> */}
      </div>
    )
  }
}
