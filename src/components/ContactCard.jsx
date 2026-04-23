import { useContacts } from '../context/ContactContext';
import { FiEye, FiEdit2, FiTrash2, FiMail, FiPhone } from 'react-icons/fi';
import './ContactCard.css';

function getAvatarColor(name = '') {
  const colors = ['#4f8ef7','#22c55e','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316','#ec4899'];
  return colors[name.charCodeAt(0) % colors.length];
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ContactCard({ contact, index }) {
  const { openViewModal, openEditModal, openDeleteModal } = useContacts();
  const avatarColor = getAvatarColor(contact.firstName);
  const initials = `${contact.firstName?.[0] || ''}${contact.lastName?.[0] || ''}`.toUpperCase();

  return (
    <div className="contact-card animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="contact-avatar" style={{ background: avatarColor }}>{initials}</div>
      <div className="contact-info">
        <p className="contact-name">{contact.firstName} {contact.lastName}</p>
        <div className="contact-meta">
          <span className="meta-item"><FiMail size={12} />{contact.email}</span>
          <span className="meta-item"><FiPhone size={12} />{contact.phone}</span>
        </div>
      </div>
      <div className="contact-date">
        <span className="date-label">Added</span>
        <span className="date-value">{formatDate(contact.createdAt)}</span>
      </div>
      <div className="contact-actions">
        <button className="action-btn view-btn"   title="View"   onClick={() => openViewModal(contact)}><FiEye size={15} /></button>
        <button className="action-btn edit-btn"   title="Edit"   onClick={() => openEditModal(contact)}><FiEdit2 size={14} /></button>
        <button className="action-btn delete-btn" title="Delete" onClick={() => openDeleteModal(contact)}><FiTrash2 size={14} /></button>
      </div>
    </div>
  );
}
