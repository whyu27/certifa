import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Issue from './pages/Issue';
import Verify from './pages/Verify';

export default function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#fafafa] text-neutral-900 selection:bg-neutral-900 selection:text-white">
        {/* Navigation Bar */}
        <Navbar 
          isWalletConnected={isWalletConnected}
          setIsWalletConnected={setIsWalletConnected}
          isAuthorized={isAuthorized}
          setIsAuthorized={setIsAuthorized}
        />

        {/* Main Content Body */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/issue" 
              element={
                <Issue 
                  isWalletConnected={isWalletConnected}
                  setIsWalletConnected={setIsWalletConnected}
                  isAuthorized={isAuthorized}
                  setIsAuthorized={setIsAuthorized}
                />
              } 
            />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
