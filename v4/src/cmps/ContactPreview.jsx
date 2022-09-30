import { Link } from 'react-router-dom'

export const ContactPreview = ({ contact, onRemoveContact }) => {
  const contactStyle = { backgroundImage: `url(https://robohash.org/${contact._id})` }
  return (
    <div style={contactStyle} className="contact-preview">
      <Link to={`/contact/${contact._id}`} className="info">
        <h2>{contact.name}</h2>
        <h4>{contact.email}</h4>
        <h5>{contact.phone}</h5>
      </Link>
      <section className="actions">
        <button onClick={() => onRemoveContact(contact._id)}>Delete</button>
        <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
      </section>
    </div>
  )
}
