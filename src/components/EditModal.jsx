import { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import { FiX, FiSave, FiLoader } from 'react-icons/fi';
import './Modal.css';

export default function EditModal() {
  const { editModal, selectedContact, closeAllModals, updateContact, loading } = useContacts();
  const [formData, setFormData] = useState({ firstName:'', lastName:'', email:'', phone:'', address:'' });
  const [errors,  setErrors]   = useState({});
  const [success, setSuccess]  = useState(false);

  useEffect(() => {
    if (selectedContact) {
      setFormData({
        firstName: selectedContact.firstName || '',
        lastName:  selectedContact.lastName  || '',
        email:     selectedContact.email     || '',
        phone:     selectedContact.phone     || '',
        address:   selectedContact.address   || '',
      });
      setErrors({}); setSuccess(false);
    }
  }, [selectedContact]);

  if (!editModal || !selectedContact) return null;

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = 'Required';
    if (!formData.lastName.trim())  e.lastName  = 'Required';
    if (!formData.email.trim())     e.email     = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.phone.trim())     e.phone     = 'Required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }
    const result = await updateContact(selectedContact.id, { ...selectedContact, ...formData });
    if (result.success) { setSuccess(true); setTimeout(() => closeAllModals(), 1200); }
  };

  return (
    <div className="modal-overlay" onClick={closeAllModals}>
      <div className="modal-box animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Contact</h2>
          <button className="modal-close" onClick={closeAllModals}><FiX size={17} /></button>
        </div>
        {success && <div className="alert-success">✓ Updated successfully!</div>}
        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-row">
            <Field label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} placeholder="First name" />
            <Field label="Last Name *"  name="lastName"  value={formData.lastName}  onChange={handleChange} error={errors.lastName}  placeholder="Last name" />
          </div>
          <Field label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="Email address" />
          <Field label="Phone *" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="Phone number" />
          <Field label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Address (optional)" />
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={closeAllModals}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <FiLoader size={14} className="spin" /> : <FiSave size={14} />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type='text', value, onChange, error, placeholder }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`form-input ${error ? 'input-error' : ''}`} />
      {error && <p className="field-error">⚠ {error}</p>}
    </div>
  );
}
