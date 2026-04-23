import { useContacts } from '../context/ContactContext';
import { FiSearch, FiFilter } from 'react-icons/fi';
import './SearchFilter.css';

const SORT_OPTIONS = [
  { value: 'default',       label: 'Default Order' },
  { value: 'firstName_asc', label: 'First Name (A → Z)' },
  { value: 'lastName_asc',  label: 'Last Name (A → Z)' },
  { value: 'oldest_first',  label: 'Oldest To First' },
];

export default function SearchFilter() {
  const { searchQuery, sortOption, setSearchQuery, setSortOption, contacts, filteredContacts } = useContacts();
  return (
    <div className="search-filter-bar">
      <div className="search-wrapper">
        <FiSearch className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear" onClick={() => setSearchQuery('')}>×</button>
        )}
      </div>
      <div className="filter-wrapper">
        <FiFilter size={14} className="filter-icon" />
        <select className="filter-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="count-badge">
        {filteredContacts.length} / {contacts.length} contacts
      </div>
    </div>
  );
}
