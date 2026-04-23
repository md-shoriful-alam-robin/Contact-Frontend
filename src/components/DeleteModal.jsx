import { useContacts } from '../context/ContactContext';
import { FiX, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';
import './Modal.css';

export default function DeleteModal() {
  const { deleteModal, selectedContact, closeAllModals, deleteContact, loading } = useContacts();
  if (!deleteModal || !selectedContact) return null;

  const handleDelete = async () => {
    const result = await deleteContact(selectedContact.id);
    if (result.success) closeAllModals();
  };

  return (
    <div className="modal-overlay" onClick={closeAllModals}>
      <div className="modal-box modal-box--sm animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeAllModals} style={{ position:'absolute', top:14, right:14 }}>
          <FiX size={17} />
        </button>
        <div className="delete-warning-icon"><FiAlertTriangle size={26} /></div>
        <h2 className="delete-title">Delete Contact?</h2>
        <p className="delete-desc">
          Are you sure you want to delete <strong>{selectedContact.firstName} {selectedContact.lastName}</strong>?
          This action <strong>cannot be undone</strong>.
        </p>
        <div className="modal-footer modal-footer--center">
          <button className="btn-secondary" onClick={closeAllModals} disabled={loading}>Cancel</button>
          <button className="btn-danger"    onClick={handleDelete}   disabled={loading}>
            <FiTrash2 size={14} />{loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
