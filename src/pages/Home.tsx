import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ProductCard from '@/components/shared/ProductCard';
import { PRODUCTS, SLIDER_ITEMS, CATEGORIES } from '@/data/products';

const HITS = PRODUCTS.filter(p => p.isHit).slice(0, 8);
const NEWS = PRODUCTS.filter(p => p.isNew).slice(0, 4);

export default function Home() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDER_ITEMS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const current = SLIDER_ITEMS[slide];

  return (
    <div>
      {/* HERO SLIDER */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        {SLIDER_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-4 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div key={slide} className="max-w-xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-bold uppercase tracking-widest mb-6 animate-fade-in-up ${
              current.accent === 'orange'
                ? 'gradient-orange text-white'
                : 'gradient-blue text-white'
            }`}>
              <Icon name="Zap" size={12} />
              {current.badge}
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-4 animate-fade-in-up delay-100" style={{ whiteSpace: 'pre-line' }}>
              {current.title.split('\n').map((line, i) => (
                <span key={i} className={i === 1 ? (current.accent === 'orange' ? 'gradient-text-orange' : 'gradient-text-blue') : ''}>
                  {line}{i === 0 ? '\n' : ''}
                </span>
              ))}
            </h1>
            <p className="text-gray-400 font-body text-lg mb-8 animate-fade-in-up delay-200">
              {current.subtitle}
            </p>
            <div className="flex gap-4 flex-wrap animate-fade-in-up delay-300">
              <Link to="/catalog" className="btn-primary flex items-center gap-2">
                {current.cta}
                <Icon name="ArrowRight" size={16} />
              </Link>
              <Link to="/about" className="btn-outline-orange flex items-center gap-2">
                О нас
              </Link>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDER_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === slide ? 'w-8 h-2 gradient-orange' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setSlide(s => (s - 1 + SLIDER_ITEMS.length) % SLIDER_ITEMS.length)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl glass-card flex items-center justify-center text-white hover:border-orange-500/40 transition-all z-10"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <button
          onClick={() => setSlide(s => (s + 1) % SLIDER_ITEMS.length)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl glass-card flex items-center justify-center text-white hover:border-orange-500/40 transition-all z-10"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </section>

      {/* CATEGORIES */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-bold text-white">
            КА<span className="gradient-text-orange">ТЕГОРИИ</span>
          </h2>
          <Link to="/catalog" className="text-orange-400 hover:text-orange-300 text-sm font-body flex items-center gap-1 transition-colors">
            Все категории <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="glass-card glass-card-hover rounded-2xl p-5 text-center group"
            >
              <span className="text-4xl mb-3 block">{cat.icon}</span>
              <span className="font-display text-white font-medium text-sm group-hover:text-orange-400 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* HITS */}
      <section className="section-padding bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-orange-400 font-body text-sm font-semibold uppercase tracking-widest mb-1 block">Топ продаж</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                ХИТЫ <span className="gradient-text-orange">ПРОДАЖ</span>
              </h2>
            </div>
            <Link to="/catalog" className="btn-outline-orange hidden md:flex items-center gap-2 text-sm">
              Смотреть всё <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HITS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
              Смотреть весь каталог <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1a0500 0%, #0A0A0A 60%, #001a33 100%)' }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FF6B1A 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3B82F6 0%, transparent 50%)' }} />
          <div className="relative z-10 px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-orange-400 text-xs font-body font-bold uppercase tracking-widest mb-3">Специальное предложение</div>
              <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
                СКИДКА <span className="gradient-text-orange">20%</span><br />
                НА ПЕРВЫЙ ЗАКАЗ
              </h3>
              <p className="text-gray-400 font-body">При подписке на рассылку и заказе от 50 000 ₽</p>
            </div>
            <Link to="/catalog" className="btn-primary whitespace-nowrap flex items-center gap-2 text-base px-8 py-4 shrink-0 neon-glow-orange">
              Воспользоваться скидкой
              <Icon name="Percent" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* NEW */}
      <section className="section-padding bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-blue-400 font-body text-sm font-semibold uppercase tracking-widest mb-1 block">Только появились</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                НО<span className="gradient-text-blue">ВИНКИ</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {NEWS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="section-padding max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-12">
          ПОЧЕМУ <span className="gradient-text-orange">ДОМЭЛИТ</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: 'Truck', title: 'Бесплатная доставка', desc: 'По Москве и МО при заказе от 50 000 ₽', color: 'orange' },
            { icon: 'Shield', title: 'Гарантия 5 лет', desc: 'На всю мебель собственного производства', color: 'blue' },
            { icon: 'Wrench', title: 'Сборка в подарок', desc: 'Профессиональная сборка при покупке от 80 000 ₽', color: 'orange' },
            { icon: 'RotateCcw', title: 'Возврат 30 дней', desc: 'Без вопросов, если что-то не подошло', color: 'blue' },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center group hover:border-orange-500/20 transition-all">
              <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${item.color === 'orange' ? 'gradient-orange neon-glow-orange' : 'gradient-blue neon-glow-blue'}`}>
                <Icon name={item.icon} size={24} className="text-white" fallback="Star" />
              </div>
              <h3 className="font-display text-white font-semibold text-base mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          ГОТОВЫ ОБНОВИТЬ <span className="gradient-text-orange">ИНТЕРЬЕР?</span>
        </h2>
        <p className="text-gray-400 font-body text-lg mb-8">
          Более 500 позиций в наличии. Бесплатный дизайн-проект при заказе от 200 000 ₽.
        </p>
        <Link to="/catalog" className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4 animate-pulse-glow">
          Смотреть весь каталог
          <Icon name="ArrowRight" size={18} />
        </Link>
      </section>
    </div>
  );
}
