import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import { FiArrowLeft, FiUserPlus, FiSave, FiLoader } from 'react-icons/fi';
import './AddContactPage.css';

export default function AddContactPage() {
  const navigate = useNavigate();
  const { addContact, loading } = useContacts();

  const [formData, setFormData] = useState({ firstName:'', lastName:'', email:'', phone:'', address:'' });
  const [errors,  setErrors]   = useState({});
  const [success, setSuccess]  = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = 'First name is required';
    if (!formData.lastName.trim())  e.lastName  = 'Last name is required';
    if (!formData.email.trim())     e.email     = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email address';
    if (!formData.phone.trim())     e.phone     = 'Phone is required';
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
    const result = await addContact(formData);
    if (result.success) { setSuccess(true); setTimeout(() => navigate('/'), 1500); }
  };

  return (
    <main className="add-page">
      <div className="add-page-card animate-fadeIn">
        <div className="add-page-header">
          <Link to="/" className="back-btn"><FiArrowLeft size={16} /> Back to Contacts</Link>
          <div className="add-title-area">
            <div className="add-page-icon"><FiUserPlus size={21} /></div>
            <div>
              <h1 className="add-page-title">Add New Contact</h1>
              <p className="add-page-sub">Fill in the details below to save a new contact</p>
            </div>
          </div>
        </div>

        {success && <div className="alert-success" style={{margin:'14px 28px 0'}}>✓ Contact added! Redirecting...</div>}

        <form onSubmit={handleSubmit} className="add-form" noValidate>
          <p className="section-label">Personal Information</p>
          <div className="form-row">
            <Field label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} placeholder="e.g. Rahul" />
            <Field label="Last Name *"  name="lastName"  value={formData.lastName}  onChange={handleChange} error={errors.lastName}  placeholder="e.g. Ahmed" />
          </div>

          <p className="section-label">Contact Details</p>
          <Field label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="example@gmail.com" />
          <Field label="Phone Number *"  name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="01711-234567" />

          <p className="section-label">Additional</p>
          <Field label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="City, Country (optional)" />

          <div className="add-form-footer">
            <button type="button" className="btn-clear" onClick={() => { setFormData({ firstName:'',lastName:'',email:'',phone:'',address:'' }); setErrors({}); }}>Clear</button>
            <div style={{ display:'flex', gap:'10px' }}>
              <Link to="/" className="btn-cancel">Cancel</Link>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? <FiLoader size={14} className="spin" /> : <FiSave size={14} />}
                {loading ? 'Saving...' : 'Save Contact'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({ label, name, type='text', value, onChange, error, placeholder }) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} className={`form-input ${error ? 'input-error' : ''}`} autoComplete="off" />
      {error && <p className="field-error">⚠ {error}</p>}
    </div>
  );
}
