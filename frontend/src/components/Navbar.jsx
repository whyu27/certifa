import { Link, useLocation, useNavigate } from 'react-router-dom';
import certifaLogo from '../assets/logo-certifa.svg';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={certifaLogo} alt="Certifa Logo" className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-200" />
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none text-neutral-900 tracking-tight">Certifa</span>
            <span className="text-[10px] font-medium text-neutral-500 tracking-wide uppercase">Blockchain Registry</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden sm:flex items-center gap-1 bg-neutral-100/70 p-1 border border-neutral-200/60 absolute left-1/2 -translate-x-1/2">
          <a
            href="#what-is-certifa"
            onClick={(e) => handleScrollTo(e, 'what-is-certifa')}
            className="px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200"
          >
            What is Certifa?
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleScrollTo(e, 'how-it-works')}
            className="px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200"
          >
            How It Works
          </a>
          <a
            href="#why-certifa"
            onClick={(e) => handleScrollTo(e, 'why-certifa')}
            className="px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200"
          >
            Why Certifa?
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/issue"
            className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 shadow-sm active:scale-95"
          >
            Launch App
          </Link>
        </div>
      </div>
    </header>
  );
}
