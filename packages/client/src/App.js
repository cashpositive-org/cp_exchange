import React from 'react';

import logo from './logo.png';

import Test from './components/Test';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <main className="app-main">
        <p>A Demo MERN App - CP Exchange</p>
        <Test />
      </main>
      <footer className="app-footer">
        <a href="https://www.cashpositive.in" target="_blank" rel="noopener noreferrer">
          CashPositive
        </a>
      </footer>
    </div>
  );
}

export default App;
