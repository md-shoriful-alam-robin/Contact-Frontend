import { useContacts } from '../context/ContactContext';
import { FiX, FiEdit2, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser } from 'react-icons/fi';
import './Modal.css';

function getAvatarColor(name = '') {
  const colors = ['#4f8ef7','#22c55e','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316','#ec4899'];
  return colors[name.charCodeAt(0) % colors.length];
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function ViewModal() {
  const { viewModal, selectedContact, closeAllModals, openEditModal } = useContacts();
  if (!viewModal || !selectedContact) return null;

  const avatarColor = getAvatarColor(selectedContact.firstName);
  const initials = `${selectedContact.firstName?.[0] || ''}${selectedContact.lastName?.[0] || ''}`.toUpperCase();

  return (
    <div className="modal-overlay" onClick={closeAllModals}>
      <div className="modal-box animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Contact Details</h2>
          <button className="modal-close" onClick={closeAllModals}><FiX size={17} /></button>
        </div>
        <div className="view-profile">
          <div className="view-avatar" style={{ background: avatarColor }}>{initials}</div>
          <div>
            <h3 className="view-name">{selectedContact.firstName} {selectedContact.lastName}</h3>
            <p className="view-sub">Contact</p>
          </div>
        </div>
        <div className="view-details">
          <Row icon={<FiUser size={14} />}     label="First Name" value={selectedContact.firstName} />
          <Row icon={<FiUser size={14} />}     label="Last Name"  value={selectedContact.lastName} />
          <Row icon={<FiMail size={14} />}     label="Email"      value={selectedContact.email} />
          <Row icon={<FiPhone size={14} />}    label="Phone"      value={selectedContact.phone} />
          <Row icon={<FiMapPin size={14} />}   label="Address"    value={selectedContact.address || '—'} />
          <Row icon={<FiCalendar size={14} />} label="Added On"   value={formatDate(selectedContact.createdAt)} />
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={closeAllModals}>Close</button>
          <button className="btn-primary"   onClick={() => openEditModal(selectedContact)}>
            <FiEdit2 size={14} /> Edit Contact
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }) {
  return (
    <div className="detail-row">
      <div className="detail-icon">{icon}</div>
      <div>
        <span className="detail-label">{label}</span>
        <span className="detail-value" style={{ display: 'block' }}>{value}</span>
      </div>
    </div>
  );
}
