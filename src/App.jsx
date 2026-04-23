import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext';
import Navbar         from './components/Navbar';
import HomePage       from './pages/HomePage';
import AddContactPage from './pages/AddContactPage';
import './styles/global.css';

export default function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"    element={<HomePage />} />
          <Route path="/add" element={<AddContactPage />} />
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  );
}
