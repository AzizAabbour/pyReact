import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Sparkles, LogOut, User, LayoutDashboard, Settings, ShieldAlert } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Generate', path: '/generator' },
    { name: 'Explore', path: '/explore' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-border-glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            PromptForge<span className="text-text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-surface-100 dark:hover:bg-surface-800 ${
                isActive(link.path)
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-950/20'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              {/* Profile Trigger */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full gradient-bg-accent flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt={user.username} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    user?.username?.substring(0, 2).toUpperCase() || 'PF'
                  )}
                </div>
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-56 rounded-2xl border border-border-color bg-bg-secondary p-2 shadow-xl z-50 animate-scale-in">
                    <div className="px-4 py-3 border-b border-border-color/50 mb-1.5">
                      <p className="text-xs font-semibold text-text-tertiary">Signed in as</p>
                      <p className="text-sm font-bold text-text-primary truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <Link
                      to="/dashboard/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-danger hover:text-danger-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors mt-1.5 border-t border-border-color/50 pt-2.5 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button variant="gradient" size="sm" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-text-secondary"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-xl text-text-secondary hover:text-text-primary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-border-glass absolute w-full top-16 left-0 p-6 flex flex-col gap-4 animate-slide-down">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 text-base font-semibold border-b border-border-color/50 ${
                isActive(link.path) ? 'text-primary-600 dark:text-primary-400' : 'text-text-secondary'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-text-secondary hover:text-text-primary font-semibold"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 py-2 text-danger hover:text-red-600 text-left font-semibold cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>
                Sign In
              </Button>
              <Button variant="gradient" onClick={() => { setMobileMenuOpen(false); navigate('/register'); }}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
