import { ContactPreview } from './ContactPreview'

export const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <div className="contact-list simple-cards-grid">
      {contacts.map((contact) => (
        <ContactPreview key={contact._id} contact={contact} onRemoveContact={onRemoveContact} />
      ))}
    </div>
  )
}
