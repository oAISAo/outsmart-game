// ⚠️ Never commit secrets (API keys, credentials, etc.). Use .env.local for private data if needed.

export const environment = {
  production: false,
  apiUrl: 'https://api.dev.example.com',
  syncRealtime: true,
  firebase: {
    apiKey: "AIzaSyDSbnAj73wMycSWCAfQ0FrqhWUatSKy84c",
    authDomain: "outsmart-game.firebaseapp.com",
    projectId: "outsmart-game",
    storageBucket: "outsmart-game.firebasestorage.app",
    messagingSenderId: "325812510708",
    appId: "1:325812510708:web:03f9e3afbf36566dc5a3a1",
    measurementId: "G-PTR47Z3PFM"
  }
};
