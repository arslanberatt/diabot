import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container  max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Diyobot</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="text-gray-900 hover:text-blue-600 transition font-medium"
            >
              Ana Sayfa
            </Link>
            <Link
              to="/diyabet-nedir"
              onClick={handleLinkClick}
              className="text-gray-900 hover:text-blue-600 transition font-medium"
            >
              Diyabet Nedir?
            </Link>
            <Link
              to="/blog"
              onClick={handleLinkClick}
              className="text-gray-900 hover:text-blue-600 transition font-medium"
            >
              Blog
            </Link>
            <Link
              to="/diyabet-analizi"
              onClick={handleLinkClick}
              className="text-gray-900 hover:text-blue-600 transition font-medium"
            >
              Diyabet Analizi
            </Link>
          </nav>
          <button
            className="md:hidden text-gray-900 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="text-gray-900 hover:text-blue-600 transition font-medium py-2"
              >
                Ana Sayfa
              </Link>
              <Link
                to="/diyabet-nedir"
                onClick={handleLinkClick}
                className="text-gray-900 hover:text-blue-600 transition font-medium py-2"
              >
                Diyabet Nedir?
              </Link>
              <Link
                to="/blog"
                onClick={handleLinkClick}
                className="text-gray-900 hover:text-blue-600 transition font-medium py-2"
              >
                Blog
              </Link>
              <Link
                to="/diyabet-analizi"
                onClick={handleLinkClick}
                className="text-gray-900 hover:text-blue-600 transition font-medium py-2"
              >
                Diyabet Analizi
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
