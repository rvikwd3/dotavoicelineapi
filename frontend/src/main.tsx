import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { AuthUrlContext } from './context/AuthUrlContext';
import './index.css'

/* To be provided by HTML template */
declare var twitchAuthUrl: string;

let authUrl;
try {
  authUrl = twitchAuthUrl;
} catch (error) {
  if (error instanceof ReferenceError) {
    console.error(
      "ERROR: No twitchAuthUrl was passed to this page from the server."
    );
    // (probably a local dev environment)
    // Use .env provided values instead
    authUrl = "about:blank";
  } else {
    throw error;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthUrlContext.Provider value={authUrl}>
      <App />
    </AuthUrlContext.Provider>
  </React.StrictMode>,
)