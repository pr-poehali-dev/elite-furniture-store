import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';

const NAV_LINKS = [
  { path: '/', label: 'Главная' },
  { path: '/catalog', label: 'Каталог' },
  { path: '/delivery', label: 'Доставка и оплата' },
  { path: '/about', label: 'О нас' },
  { path: '/reviews', label: 'Отзывы' },
  { path: '/blog', label: 'Блог' },
  { path: '/vacancies', label: 'Вакансии' },
];

export default function Header() {
  const location = useLocation();
  const { cartCount, favorites } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5">
      {/* Top bar */}
      <div className="border-b border-white/5 py-2 px-4 md:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-gray-500 font-body">
          <span>Москва, ул. Дизайнерская, 12 — <span className="text-orange-400">+7 (495) 123-45-67</span></span>
          <div className="flex gap-6">
            <span>Пн–Пт: 10:00–20:00</span>
            <span>Сб–Вс: 11:00–19:00</span>
            <Link to="/delivery" className="text-orange-400 hover:text-orange-300 transition-colors">Бесплатная доставка от 50 000 ₽</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center neon-glow-orange">
            <span className="font-display font-bold text-white text-sm">ДЭ</span>
          </div>
          <span className="font-display text-xl font-bold text-white tracking-wide">
            ДОМ<span className="gradient-text-orange">ЭЛИТ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'text-orange-400 bg-orange-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/10">
              <Icon name="Search" size={16} className="text-gray-400" />
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск мебели..."
                className="bg-transparent text-white text-sm outline-none w-40 font-body placeholder:text-gray-500"
                onBlur={() => { setSearchOpen(false); setSearchQuery(''); }}
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Icon name="Search" size={18} />
            </button>
          )}

          <Link to="/favorites" className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Icon name="Heart" size={18} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 gradient-orange rounded-full text-white text-[10px] flex items-center justify-center font-body font-bold">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Icon name="ShoppingCart" size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 gradient-orange rounded-full text-white text-[10px] flex items-center justify-center font-body font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/login" className="hidden md:flex btn-primary text-sm py-2 px-4 items-center gap-2">
            <Icon name="User" size={15} />
            <span>Войти</span>
          </Link>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/98 border-t border-white/5 px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                location.pathname === link.path
                  ? 'text-orange-400 bg-orange-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 btn-primary text-center"
          >
            Войти в кабинет
          </Link>
        </div>
      )}
    </header>
  );
}
