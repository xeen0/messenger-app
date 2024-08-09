import { createRoot } from 'react-dom/client'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App.jsx'
import './index.css'

import {ApolloClientProvider} from './ApolloClient.jsx'

createRoot(document.getElementById('root')).render(
  <ApolloClientProvider>
    <Router>
      <Routes>
        <Route path="/chat/:userId/:receiverId" element={<App />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  </ApolloClientProvider>
  
)
