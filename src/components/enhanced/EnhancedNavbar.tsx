import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  User, 
  Menu, 
  X, 
  Home, 
  Search, 
  Calendar, 
  Settings,
  MapPin,
  Package,
  Brain,
  ChevronDown,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ThemeToggle } from '../ui/ThemeToggle';

const EnhancedNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    const mockUser = {
      id: 1,
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user' as const,
      createdAt: new Date().toISOString()
    };
    useStore.getState().setUser(mockUser);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navigation = [
    { 
      name: 'Home', 
      href: '/', 
      icon: Home,
      active: location.pathname === '/'
    },
    { 
      name: 'Destinations', 
      href: '/destinations', 
      icon: MapPin,
      dropdown: [
        { name: 'Hyderabad', href: '/search?destination=Hyderabad' },
        { name: 'Paris', href: '/search?destination=Paris' },
        { name: 'Tokyo', href: '/search?destination=Tokyo' },
        { name: 'Dubai', href: '/search?destination=Dubai' },
      ]
    },
    { 
      name: 'Hotels', 
      href: '/search', 
      icon: Search,
      active: location.pathname === '/search'
    },
    { 
      name: 'Packages', 
      href: '/packages', 
      icon: Package,
      dropdown: [
        { name: 'Heritage Tours', href: '/packages/heritage' },
        { name: 'Temple Trails', href: '/packages/temples' },
        { name: 'Adventure Tours', href: '/packages/adventure' },
      ]
    },
    { 
      name: 'Smart Features', 
      href: '/ai-features', 
      icon: Brain,
      dropdown: [
        { name: 'AI Recommendations', href: '/ai-recommendations' },
        { name: 'Safety Analysis', href: '/safety-analysis' },
        { name: 'Price Optimization', href: '/price-optimization' },
      ]
    },
  ];

  const userNavigation = [
    { name: 'My Bookings', href: '/bookings', icon: Calendar },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Admin', href: '/admin', icon: Settings, adminOnly: true },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-white dark:bg-gray-900'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gradient-to-r from-primary-900 to-secondary-600 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-display bg-gradient-to-r from-primary-900 to-secondary-600 bg-clip-text text-transparent">
              Tourdim
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <motion.button
                  onClick={() => {
                    if (item.dropdown) {
                      setActiveDropdown(activeDropdown === item.name ? null : item.name);
                    } else {
                      navigate(item.href);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    item.active 
                      ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <motion.button
                          key={dropdownItem.name}
                          onClick={() => {
                            navigate(dropdownItem.href);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          whileHover={{ x: 4 }}
                        >
                          {dropdownItem.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-4">
                {/* User Navigation */}
                <div className="flex items-center gap-2">
                  {userNavigation.map((item) => {
                    if (item.adminOnly && (!user || user.role !== 'admin')) return null;
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={item.name}
                      >
                        <item.icon className="h-5 w-5" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-xl">
                    <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <motion.button
                  onClick={handleLogin}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </motion.button>
                <motion.button
                  onClick={handleLogin}
                  className="btn-primary text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </motion.button>
              </div>
            )}

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200"
                    whileHover={{ x: 4 }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </motion.button>
                ))}

                {isAuthenticated ? (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                      {userNavigation.map((item) => {
                        if (item.adminOnly && (!user || user.role !== 'admin')) return null;
                        return (
                          <motion.button
                            key={item.name}
                            onClick={() => {
                              navigate(item.href);
                              setIsMenuOpen(false);
                            }}
                            className="flex items-center gap-3 w-full text-left px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200"
                            whileHover={{ x: 4 }}
                          >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                          </motion.button>
                        );
                      })}
                    </div>
                    <motion.button
                      onClick={handleLogout}
                      className="w-full bg-red-600 text-white px-4 py-3 rounded-xl hover:bg-red-700 transition-colors duration-200 text-sm font-medium mt-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 space-y-2">
                    <motion.button
                      onClick={handleLogin}
                      className="w-full btn-secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </motion.button>
                    <motion.button
                      onClick={handleLogin}
                      className="w-full btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </motion.nav>
  );
};

export default EnhancedNavbar;