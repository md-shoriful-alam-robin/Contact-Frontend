import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import SearchFilter from '../components/SearchFilter';
import ContactCard  from '../components/ContactCard';
import ViewModal    from '../components/ViewModal';
import EditModal    from '../components/EditModal';
import DeleteModal  from '../components/DeleteModal';
import { FiUserPlus, FiUsers, FiWifiOff } from 'react-icons/fi';
import './HomePage.css';

export default function HomePage() {
  const { filteredContacts, loading, error, fetchContacts, searchQuery } = useContacts();

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  return (
    <main className="home-page">
      <div className="page-header animate-fadeIn">
        <div>
          <h1 className="page-title"><FiUsers size={22} className="title-icon" />My Contacts</h1>
          <p className="page-subtitle">Manage all your personal and professional contacts</p>
        </div>
        <Link to="/add" className="btn-add-page">
          <FiUserPlus size={16} /> Add New Contact
        </Link>
      </div>

      <SearchFilter />

      {/* Loading */}
      {loading && (
        <div className="skeleton-list">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="empty-state">
          <div className="empty-icon empty-icon--error"><FiWifiOff size={26} /></div>
          <h3>Connection Error</h3>
          <p>Could not connect to server. Make sure backend is running.</p>
          <button className="btn-retry" onClick={fetchContacts}>Retry</button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredContacts.length === 0 && (
        <div className="empty-state animate-fadeIn">
          <div className="empty-icon"><FiUsers size={28} /></div>
          <h3>No Contact Information</h3>
          <p>
            {searchQuery
              ? `No contacts found for "${searchQuery}".`
              : 'You have no contacts yet. Add your first one!'}
          </p>
          {!searchQuery && (
            <Link to="/add" className="btn-add-page" style={{ marginTop: 8 }}>
              <FiUserPlus size={15} /> Add First Contact
            </Link>
          )}
        </div>
      )}

      {/* List */}
      {!loading && !error && filteredContacts.length > 0 && (
        <div className="contact-list animate-fadeIn">
          {filteredContacts.map((contact, index) => (
            <ContactCard key={contact.id} contact={contact} index={index} />
          ))}
        </div>
      )}

      <ViewModal />
      <EditModal />
      <DeleteModal />
    </main>
  );
}
