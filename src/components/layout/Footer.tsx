import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 mt-20">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center">
              <span className="font-display font-bold text-white text-sm">ДЭ</span>
            </div>
            <span className="font-display text-xl font-bold text-white">
              ДОМ<span className="gradient-text-orange">ЭЛИТ</span>
            </span>
          </Link>
          <p className="text-gray-500 text-sm font-body leading-relaxed mb-6">
            Премиальная мебель для тех, кто ценит качество и стиль. Работаем с 2012 года.
          </p>
          <div className="flex gap-3">
            {[
              { icon: 'Instagram', label: 'Instagram', href: '#' },
              { icon: 'Youtube', label: 'YouTube', href: '#' },
              { icon: 'MessageCircle', label: 'Telegram', href: '#' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/30 transition-all"
                title={s.label}
              >
                <Icon name={s.icon} size={16} fallback="Link" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-white font-semibold mb-4 text-base tracking-wide uppercase">Навигация</h4>
          <ul className="space-y-2">
            {[
              { path: '/', label: 'Главная' },
              { path: '/catalog', label: 'Каталог' },
              { path: '/delivery', label: 'Доставка и оплата' },
              { path: '/about', label: 'О нас' },
              { path: '/reviews', label: 'Отзывы' },
              { path: '/blog', label: 'Блог' },
              { path: '/vacancies', label: 'Вакансии' },
            ].map(l => (
              <li key={l.path}>
                <Link to={l.path} className="text-gray-500 hover:text-orange-400 text-sm font-body transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="font-display text-white font-semibold mb-4 text-base tracking-wide uppercase">Контакты</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm font-body">
              <Icon name="MapPin" size={16} className="text-orange-400 mt-0.5 shrink-0" />
              <span className="text-gray-500">Москва, ул. Дизайнерская, 12, офис 301</span>
            </li>
            <li className="flex items-center gap-2 text-sm font-body">
              <Icon name="Phone" size={16} className="text-orange-400 shrink-0" />
              <a href="tel:+74951234567" className="text-gray-500 hover:text-white transition-colors">+7 (495) 123-45-67</a>
            </li>
            <li className="flex items-center gap-2 text-sm font-body">
              <Icon name="Mail" size={16} className="text-orange-400 shrink-0" />
              <a href="mailto:info@domelite.ru" className="text-gray-500 hover:text-white transition-colors">info@domelite.ru</a>
            </li>
            <li className="flex items-start gap-2 text-sm font-body">
              <Icon name="Clock" size={16} className="text-orange-400 mt-0.5 shrink-0" />
              <span className="text-gray-500">Пн–Пт: 10:00–20:00<br />Сб–Вс: 11:00–19:00</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-display text-white font-semibold mb-4 text-base tracking-wide uppercase">Рассылка</h4>
          <p className="text-gray-500 text-sm font-body mb-4">Получайте первыми акции и новинки коллекций.</p>
          {subscribed ? (
            <div className="glass-card rounded-xl p-4 text-center">
              <Icon name="CheckCircle" size={24} className="text-orange-400 mx-auto mb-2" />
              <p className="text-white text-sm font-body">Вы подписались!</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ваш@email.ru"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-body placeholder:text-gray-600 outline-none focus:border-orange-500/50 transition-colors"
              />
              <button type="submit" className="btn-primary text-sm text-center">
                Подписаться
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-600 font-body">
          <span>© 2024 ДомЭлит. Все права защищены.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">Политика конфиденциальности</Link>
            <Link to="/terms" className="hover:text-gray-400 transition-colors">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
