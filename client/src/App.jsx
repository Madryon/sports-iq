import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AiPanel from './components/ai/AiPanel';
import Home from './pages/Home';
import SportPage from './pages/SportPage';
import MatchDetail from './pages/MatchDetail';
import Facilities from './pages/Facilities';
import NotFound from './pages/NotFound';

/**
 * ScrollToTop helper that restores window scroll to 0,0 on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors selection:bg-blue-500 selection:text-white">
            <Header />

            <div className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sport/:sportKey" element={<SportPage />} />
                <Route path="/match/:id" element={<MatchDetail />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

            <Footer />
            <AiPanel />
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
