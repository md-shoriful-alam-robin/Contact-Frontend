# 📱 ContactVault — React Contact Manager

A modern, full-featured contact management application built with **React**, **Vite**, and **Context API**. Deployed on **Netlify** (frontend) and **Render** (backend).

## 🌐 Live Demo

- **Frontend:** https://reaactcontact.netlify.app
- **Backend API:** https://contact-backend-71pp.onrender.com/contacts

## ✨ Features

✅ **Complete CRUD Operations**
- Add new contacts
- View contact details
- Edit existing contacts
- Delete contacts with confirmation

✅ **Search Functionality**
- Search by first name, last name, email, or phone number
- Real-time filtering

✅ **Sort & Filter Options**
- Sort by First Name (A → Z)
- Sort by Last Name (A → Z)
- Sort by Oldest First

✅ **Beautiful UI**
- Responsive design (Mobile, Tablet, Desktop)
- Modal dialogs for add/edit/view
- Loading states & error handling
- Empty state messages

✅ **State Management**
- Global state with Context API
- Reducer pattern for predictable state updates

✅ **API Integration**
- RESTful API calls to json-server backend
- Real-time data synchronization

##  <img width="498" height="413" alt="DeveloperGIF" src="https://github.com/user-attachments/assets/67c621f1-912d-4324-8195-d4eb5180052b" />
Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Routing** | React Router DOM v6 |
| **State Management** | Context API + useReducer |
| **Icons** | React Icons |
| **Styling** | CSS (Custom Design System) |
| **Backend** | json-server |
| **Hosting** | Netlify (Frontend) + Render (Backend) |

## 📁 Project Structure

```
frontend/
├── src/
│   ├── context/
│   │   └── ContactContext.jsx      # Global state management
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ContactCard.jsx
│   │   ├── SearchFilter.jsx
│   │   ├── ViewModal.jsx
│   │   ├── EditModal.jsx
│   │   ├── DeleteModal.jsx
│   │   └── Modal.css
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── AddContactPage.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── netlify.toml
├── .env
└── .env.production
```

## <img width="498" height="498" alt="WallpaperEngineSettingsIconGIF" src="https://github.com/user-attachments/assets/17c45c7d-9ff0-4733-b014-384da9ffea70" />

 Getting Started

### Prerequisites
- Node.js (v16+)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

**Local (.env)**
```
VITE_API_URL=http://localhost:3001
```

**Production (.env.production)**
```
VITE_API_URL=https://contact-backend-71pp.onrender.com
```

## 📝 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/contacts` | Fetch all contacts |
| POST | `/contacts` | Create new contact |
| PUT | `/contacts/:id` | Update contact |
| DELETE | `/contacts/:id` | Delete contact |

## 🌐 Deployment

### Frontend (Netlify)
1. Connect GitHub repository
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Set Environment Variable: `VITE_API_URL`

## 👤 Author

**MD Shoriful Alam Robin**
- GitHub: [@md-shoriful-alam-robin](https://github.com/md-shoriful-alam-robin)
- Email: typicalrobin@gmail.com

---
Made with ❤️ using React and Context API
