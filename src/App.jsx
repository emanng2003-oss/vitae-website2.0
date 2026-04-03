
import { NavLink, Route, Routes } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import TechnologyPage from './pages/TechnologyPage.jsx';
import DesignPage from './pages/DesignPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import CustomisePage from './pages/CustomisePage.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/technology', label: 'Technology' },
  { to: '/design', label: 'Design' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/customise', label: 'Customise' },
];

function Logo() {
  return (
    <div className="logo-wrap">
      <div className="logo-word">VITAE</div>
      <div className="logo-tag">One Core. Designed for Every Moment.</div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="site-shell">
      <div className="container">
        <header className="site-header">
          <div className="header-row">
            <Logo />
            <nav className="desktop-nav">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <button className="icon-button mobile-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          {mobileOpen && (
            <div className="mobile-nav">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/customise" element={<CustomisePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
