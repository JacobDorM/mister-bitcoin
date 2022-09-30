import { ContactPreview } from './ContactPreview'
import { memo } from 'react'

export const ContactList = memo(({ contacts, onRemoveContact }) => {
  return (
    <div className="contact-list simple-cards-grid">
      {contacts.map((contact) => (
        <ContactPreview key={contact._id} contact={contact} onRemoveContact={onRemoveContact} />
      ))}
    </div>
  )
})
