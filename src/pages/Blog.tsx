import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { BLOG_POSTS } from '@/data/products';

const EXTRA_POSTS = [
  {
    id: 4,
    title: 'Как организовать хранение в маленькой квартире',
    excerpt: 'Компактные решения для хранения: встроенные шкафы, диваны с ящиками и многофункциональная мебель.',
    date: '25 октября 2024',
    category: 'Интерьер',
    readTime: '4 мин',
    image: 'https://cdn.poehali.dev/projects/f2b06d1e-800b-4137-8596-e02cfa0cfcdf/files/286ba6c1-a8db-4b4a-acae-4131ce0eda88.jpg',
  },
  {
    id: 5,
    title: 'Дерево vs металл: что выбрать для современного интерьера',
    excerpt: 'Сравниваем два популярных материала по прочности, внешнему виду и цене. Помогаем принять решение.',
    date: '18 октября 2024',
    category: 'Советы',
    readTime: '6 мин',
    image: 'https://cdn.poehali.dev/projects/f2b06d1e-800b-4137-8596-e02cfa0cfcdf/files/fa4c298c-4ffb-43d3-b5f2-283b50eee90a.jpg',
  },
  {
    id: 6,
    title: 'Тренд 2024: бархат в интерьере — как не переборщить',
    excerpt: 'Бархатные диваны и кресла снова на пике популярности. Рассказываем, как использовать их органично.',
    date: '10 октября 2024',
    category: 'Тренды',
    readTime: '5 мин',
    image: 'https://cdn.poehali.dev/projects/f2b06d1e-800b-4137-8596-e02cfa0cfcdf/files/75735f59-6015-40bd-8d25-ffcbbc1b2a0c.jpg',
  },
];

const ALL_POSTS = [...BLOG_POSTS, ...EXTRA_POSTS];
const CATEGORIES = ['Все', 'Тренды', 'Советы', 'Стиль', 'Интерьер'];

const CAT_COLORS: Record<string, string> = {
  'Тренды': 'gradient-orange',
  'Советы': 'gradient-blue',
  'Стиль': 'bg-purple-600',
  'Интерьер': 'bg-teal-600',
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Все');

  const filtered = activeCategory === 'Все'
    ? ALL_POSTS
    : ALL_POSTS.filter(p => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: 'Блог' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-orange-400 font-body text-sm font-semibold uppercase tracking-widest mb-2 block">Вдохновение и советы</span>
          <h1 className="font-display text-5xl font-bold text-white">
            БЛ<span className="gradient-text-orange">ОГ</span>
          </h1>
        </div>
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all border ${
                activeCategory === cat
                  ? 'gradient-orange text-white border-transparent'
                  : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Icon name="FileText" size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 font-body">Статей в этой категории пока нет</p>
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <div className="glass-card glass-card-hover rounded-3xl overflow-hidden mb-8 group cursor-pointer">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className={`${CAT_COLORS[featured.category] || 'gradient-orange'} text-white text-xs font-body font-bold px-3 py-1 rounded-full`}>
                      {featured.category}
                    </span>
                    <span className="text-gray-600 text-xs font-body flex items-center gap-1">
                      <Icon name="Clock" size={12} /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-400 font-body mb-6 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm font-body">{featured.date}</span>
                    <span className="text-orange-400 text-sm font-body font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Читать <Icon name="ArrowRight" size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other posts */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(post => (
                <div key={post.id} className="glass-card glass-card-hover rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`${CAT_COLORS[post.category] || 'gradient-orange'} text-white text-[10px] font-body font-bold px-2.5 py-0.5 rounded-full`}>
                        {post.category}
                      </span>
                      <span className="text-gray-600 text-xs font-body flex items-center gap-1">
                        <Icon name="Clock" size={11} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-white font-bold text-base mb-2 leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-body mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-xs font-body">{post.date}</span>
                      <span className="text-orange-400 text-xs font-body font-semibold flex items-center gap-1">
                        Читать <Icon name="ArrowRight" size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Newsletter */}
      <div className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0500 0%, #0A0A0A 60%, #001a33 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #FF6B1A 0%, transparent 50%), radial-gradient(circle at 70% 50%, #3B82F6 0%, transparent 50%)' }} />
        <div className="relative z-10">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            ПОДПИШИТЕСЬ НА <span className="gradient-text-orange">РАССЫЛКУ</span>
          </h2>
          <p className="text-gray-400 font-body mb-6">Новые статьи, скидки и новинки коллекций — первыми в вашей почте</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="ваш@email.ru"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-gray-600 outline-none focus:border-orange-500/50"
            />
            <button className="btn-primary whitespace-nowrap">Подписаться</button>
          </div>
        </div>
      </div>
    </div>
  );
}
