import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ProductCard from '@/components/shared/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { useApp } from '@/context/AppContext';

export default function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const { addToCart, toggleFavorite, isFavorite } = useApp();
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState<'delivery' | 'payment'>('delivery');
  const [added, setAdded] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviews, setReviews] = useState<{ name: string; rating: number; text: string; date: string }[]>([]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Icon name="PackageSearch" size={64} className="text-gray-700 mx-auto mb-4" fallback="Search" />
        <h1 className="font-display text-3xl text-white mb-4">Товар не найден</h1>
        <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">← Вернуться в каталог</Link>
      </div>
    );
  }

  const catName = CATEGORIES.find(c => c.id === product.category)?.name || 'Каталог';
  const images = product.images || [product.image];
  const similar = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviews(prev => [...prev, {
      name: reviewName,
      rating: reviewRating,
      text: reviewText,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    }]);
    setReviewText(''); setReviewName(''); setReviewRating(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[
        { label: 'Каталог', path: '/catalog' },
        { label: catName, path: `/catalog?category=${product.category}` },
        { label: product.name }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#0f0f0f] mb-3 relative group cursor-zoom-in">
            <img src={images[imgIdx]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {discount && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-body font-bold px-3 py-1 rounded-full">-{discount}%</span>
            )}
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === imgIdx ? 'border-orange-500' : 'border-transparent hover:border-white/20'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {product.isNew && <span className="gradient-blue text-white text-xs font-body font-bold px-2 py-0.5 rounded-full">Новинка</span>}
            {product.isHit && <span className="gradient-orange text-white text-xs font-body font-bold px-2 py-0.5 rounded-full">Хит продаж</span>}
            {!product.inStock && <span className="bg-red-500/20 text-red-400 text-xs font-body px-2 py-0.5 rounded-full border border-red-500/30">Нет в наличии</span>}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-gray-600 text-sm font-body mb-4">Арт. {product.article}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => (
                <Icon key={s} name="Star" size={16} className={s <= Math.round(product.rating) ? 'text-orange-400' : 'text-gray-700'} />
              ))}
            </div>
            <span className="text-gray-400 text-sm font-body">{product.rating} ({product.reviews} отзывов)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6">
            <span className="font-display text-4xl font-bold text-white">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.oldPrice && (
              <span className="text-gray-600 text-xl font-body line-through">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
            )}
            {discount && (
              <span className="text-red-400 text-lg font-body font-semibold">−{discount}%</span>
            )}
          </div>

          {/* Details */}
          <div className="glass-card rounded-2xl p-4 mb-6 grid grid-cols-2 gap-3">
            {[
              { label: 'Материал', value: product.material },
              { label: 'Цвет', value: product.color },
              { label: 'Размер', value: product.size },
              { label: 'В наличии', value: product.inStock ? 'Да' : 'Нет' },
            ].map(item => (
              <div key={item.label}>
                <span className="text-gray-600 text-xs font-body">{item.label}</span>
                <p className="text-white text-sm font-body font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Quantity + Cart */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center glass-card rounded-xl">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Icon name="Minus" size={16} />
              </button>
              <span className="w-10 text-center text-white font-body font-semibold">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Icon name="Plus" size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`flex-1 py-3 rounded-xl font-body font-semibold transition-all flex items-center justify-center gap-2 ${
                !product.inStock ? 'bg-gray-800 text-gray-600 cursor-not-allowed' :
                added ? 'bg-green-600 text-white' : 'btn-primary'
              }`}
            >
              <Icon name={added ? 'Check' : 'ShoppingCart'} size={18} />
              {added ? 'Добавлено в корзину!' : 'В корзину'}
            </button>

            <button
              onClick={() => toggleFavorite(product.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                isFavorite(product.id)
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'glass-card text-gray-400 hover:text-orange-400 hover:border-orange-500/40'
              }`}
            >
              <Icon name="Heart" size={20} />
            </button>
          </div>

          <p className="text-gray-600 text-sm font-body leading-relaxed">{product.description}</p>
        </div>
      </div>

      {/* Delivery tabs */}
      <div className="glass-card rounded-2xl p-6 mb-10">
        <div className="flex gap-2 mb-6">
          {(['delivery', 'payment'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-xl text-sm font-body font-medium transition-all ${tab === t ? 'gradient-orange text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              {t === 'delivery' ? 'Доставка' : 'Оплата'}
            </button>
          ))}
        </div>
        {tab === 'delivery' ? (
          <div className="space-y-3 text-sm font-body text-gray-400">
            <div className="flex items-start gap-3"><Icon name="Truck" size={18} className="text-orange-400 mt-0.5" /><div><p className="text-white font-medium mb-1">Курьерская доставка</p><p>По Москве в пределах МКАД — бесплатно при заказе от 50 000 ₽. Срок: 1–3 рабочих дня.</p></div></div>
            <div className="flex items-start gap-3"><Icon name="Package" size={18} className="text-orange-400 mt-0.5" /><div><p className="text-white font-medium mb-1">Транспортная компания</p><p>По всей России от 3–10 дней в зависимости от региона. Стоимость рассчитывается при оформлении.</p></div></div>
            <div className="flex items-start gap-3"><Icon name="Store" size={18} className="text-orange-400 mt-0.5" /><div><p className="text-white font-medium mb-1">Самовывоз</p><p>Москва, ул. Дизайнерская, 12. Ежедневно с 10:00 до 20:00. Бесплатно.</p></div></div>
          </div>
        ) : (
          <div className="space-y-3 text-sm font-body text-gray-400">
            <div className="flex items-start gap-3"><Icon name="CreditCard" size={18} className="text-blue-400 mt-0.5" /><div><p className="text-white font-medium mb-1">Банковская карта</p><p>Visa, MasterCard, МИР — онлайн или при получении. Безопасно через 3D-Secure.</p></div></div>
            <div className="flex items-start gap-3"><Icon name="Banknote" size={18} className="text-blue-400 mt-0.5" /><div><p className="text-white font-medium mb-1">Наличные при получении</p><p>Оплата курьеру или в шоу-руме. Чек и гарантийный талон выдаются сразу.</p></div></div>
            <div className="flex items-start gap-3"><Icon name="Building2" size={18} className="text-blue-400 mt-0.5" /><div><p className="text-white font-medium mb-1">Рассрочка 0%</p><p>На 6, 12 или 24 месяца через Сбербанк, Тинькофф или ПСБ. Одобрение за 5 минут.</p></div></div>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="mb-10">
        <h2 className="font-display text-2xl font-bold text-white mb-6">
          ОТЗЫВЫ <span className="text-gray-600 text-xl font-body">({product.reviews + reviews.length})</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Review form */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-white font-semibold mb-4">Оставить отзыв</h3>
            <form onSubmit={handleReview} className="space-y-4">
              <input
                required
                value={reviewName}
                onChange={e => setReviewName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-body placeholder:text-gray-600 outline-none focus:border-orange-500/50"
              />
              <div>
                <p className="text-gray-500 text-xs font-body mb-2">Оценка</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setReviewRating(s)}>
                      <Icon name="Star" size={24} className={s <= reviewRating ? 'text-orange-400' : 'text-gray-700'} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                required
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Поделитесь впечатлениями..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-body placeholder:text-gray-600 outline-none focus:border-orange-500/50 resize-none"
              />
              <button type="submit" className="btn-primary w-full">Отправить отзыв</button>
            </form>
          </div>

          {/* Reviews list */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {[...reviews].reverse().map((r, i) => (
              <div key={i} className="glass-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-body font-medium text-sm">{r.name}</span>
                  <span className="text-gray-600 text-xs font-body">{r.date}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={12} className={s <= r.rating ? 'text-orange-400' : 'text-gray-700'} />)}
                </div>
                <p className="text-gray-400 text-sm font-body">{r.text}</p>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="text-center py-8">
                <Icon name="MessageSquare" size={32} className="text-gray-700 mx-auto mb-2" />
                <p className="text-gray-600 text-sm font-body">Отзывов пока нет. Будьте первым!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-white mb-6">
            ПОХОЖИЕ <span className="gradient-text-orange">ТОВАРЫ</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similar.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
