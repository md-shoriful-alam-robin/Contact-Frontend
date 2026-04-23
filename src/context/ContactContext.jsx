import { createContext, useContext, useReducer, useCallback } from 'react';

// ✅ Render backend URL — .env থেকে নেবে
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/contacts`;

const initialState = {
  contacts:        [],
  loading:         false,
  error:           null,
  searchQuery:     '',
  sortOption:      'default',
  selectedContact: null,
  viewModal:       false,
  editModal:       false,
  deleteModal:     false,
};

const ACTIONS = {
  SET_LOADING:       'SET_LOADING',
  SET_ERROR:         'SET_ERROR',
  FETCH_CONTACTS:    'FETCH_CONTACTS',
  ADD_CONTACT:       'ADD_CONTACT',
  UPDATE_CONTACT:    'UPDATE_CONTACT',
  DELETE_CONTACT:    'DELETE_CONTACT',
  SET_SEARCH:        'SET_SEARCH',
  SET_SORT:          'SET_SORT',
  OPEN_VIEW_MODAL:   'OPEN_VIEW_MODAL',
  OPEN_EDIT_MODAL:   'OPEN_EDIT_MODAL',
  OPEN_DELETE_MODAL: 'OPEN_DELETE_MODAL',
  CLOSE_ALL_MODALS:  'CLOSE_ALL_MODALS',
};

function contactReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.FETCH_CONTACTS:
      return { ...state, contacts: action.payload, loading: false, error: null };
    case ACTIONS.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload], loading: false };
    case ACTIONS.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(c => c.id === action.payload.id ? action.payload : c),
        loading: false,
        selectedContact: action.payload,
      };
    case ACTIONS.DELETE_CONTACT:
      return { ...state, contacts: state.contacts.filter(c => c.id !== action.payload), loading: false };
    case ACTIONS.SET_SEARCH:
      return { ...state, searchQuery: action.payload };
    case ACTIONS.SET_SORT:
      return { ...state, sortOption: action.payload };
    case ACTIONS.OPEN_VIEW_MODAL:
      return { ...state, selectedContact: action.payload, viewModal: true,  editModal: false, deleteModal: false };
    case ACTIONS.OPEN_EDIT_MODAL:
      return { ...state, selectedContact: action.payload, editModal: true,  viewModal: false, deleteModal: false };
    case ACTIONS.OPEN_DELETE_MODAL:
      return { ...state, selectedContact: action.payload, deleteModal: true, viewModal: false, editModal: false };
    case ACTIONS.CLOSE_ALL_MODALS:
      return { ...state, viewModal: false, editModal: false, deleteModal: false, selectedContact: null };
    default:
      return state;
  }
}

const ContactContext = createContext(null);

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const fetchContacts = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch contacts');
      const data = await res.json();
      dispatch({ type: ACTIONS.FETCH_CONTACTS, payload: data });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
    }
  }, []);

  const addContact = useCallback(async (contactData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactData, createdAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error('Failed to add contact');
      const data = await res.json();
      dispatch({ type: ACTIONS.ADD_CONTACT, payload: data });
      return { success: true };
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      return { success: false };
    }
  }, []);

  const updateContact = useCallback(async (id, contactData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      if (!res.ok) throw new Error('Failed to update contact');
      const data = await res.json();
      dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: data });
      return { success: true };
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      return { success: false };
    }
  }, []);

  const deleteContact = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete contact');
      dispatch({ type: ACTIONS.DELETE_CONTACT, payload: id });
      return { success: true };
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      return { success: false };
    }
  }, []);

  const openViewModal   = (c) => dispatch({ type: ACTIONS.OPEN_VIEW_MODAL,   payload: c });
  const openEditModal   = (c) => dispatch({ type: ACTIONS.OPEN_EDIT_MODAL,   payload: c });
  const openDeleteModal = (c) => dispatch({ type: ACTIONS.OPEN_DELETE_MODAL, payload: c });
  const closeAllModals  = ()  => dispatch({ type: ACTIONS.CLOSE_ALL_MODALS });
  const setSearchQuery  = (q) => dispatch({ type: ACTIONS.SET_SEARCH, payload: q });
  const setSortOption   = (o) => dispatch({ type: ACTIONS.SET_SORT,   payload: o });

  const getFilteredContacts = () => {
    let result = [...state.contacts];
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(c =>
        c.firstName?.toLowerCase().includes(q) ||
        c.lastName?.toLowerCase().includes(q)  ||
        c.email?.toLowerCase().includes(q)     ||
        c.phone?.toLowerCase().includes(q)
      );
    }
    switch (state.sortOption) {
      case 'firstName_asc': result.sort((a, b) => a.firstName.localeCompare(b.firstName)); break;
      case 'lastName_asc':  result.sort((a, b) => a.lastName.localeCompare(b.lastName));   break;
      case 'oldest_first':  result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
      default: break;
    }
    return result;
  };

  return (
    <ContactContext.Provider value={{
      ...state,
      filteredContacts: getFilteredContacts(),
      fetchContacts, addContact, updateContact, deleteContact,
      openViewModal, openEditModal, openDeleteModal, closeAllModals,
      setSearchQuery, setSortOption,
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContacts must be used within ContactProvider');
  return ctx;
}

export default ContactContext;
