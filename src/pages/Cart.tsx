import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { useApp } from '@/context/AppContext';

const PROMOS: Record<string, number> = {
  'ELITE20': 20,
  'FIRST10': 10,
  'SAVE15': 15,
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useApp();
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState('');
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate();

  const discount = PROMOS[promoApplied] || 0;
  const discountAmount = Math.round(cartTotal * discount / 100);
  const total = cartTotal - discountAmount;

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (PROMOS[code]) {
      setPromoApplied(code);
      setPromoError('');
    } else {
      setPromoError('Промокод не найден');
      setPromoApplied('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Breadcrumbs crumbs={[{ label: 'Корзина' }]} />
        <div className="text-center py-20">
          <div className="w-24 h-24 gradient-orange rounded-3xl flex items-center justify-center mx-auto mb-6 neon-glow-orange">
            <Icon name="ShoppingCart" size={40} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Корзина пуста</h1>
          <p className="text-gray-500 font-body mb-8">Добавьте товары из нашего каталога</p>
          <Link to="/catalog" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
            Перейти в каталог <Icon name="ArrowRight" size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: 'Корзина' }]} />
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl font-bold text-white">КОР<span className="gradient-text-orange">ЗИНА</span></h1>
        <button onClick={clearCart} className="text-gray-500 hover:text-red-400 text-sm font-body flex items-center gap-1.5 transition-colors">
          <Icon name="Trash2" size={15} /> Очистить
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="glass-card rounded-2xl p-4 flex gap-4 items-center">
              <Link to={`/product/${item.product.id}`}>
                <img src={item.product.image} alt={item.product.name} className="w-20 h-16 object-cover rounded-xl flex-shrink-0" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-display text-white font-medium text-sm hover:text-orange-400 transition-colors line-clamp-1">{item.product.name}</h3>
                </Link>
                <p className="text-gray-600 text-xs font-body">{item.product.material} · {item.product.color}</p>
              </div>
              <div className="flex items-center glass-card rounded-xl">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <Icon name="Minus" size={13} />
                </button>
                <span className="w-8 text-center text-white text-sm font-body">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <Icon name="Plus" size={13} />
                </button>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-white font-bold">{(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                <p className="text-gray-600 text-xs font-body">{item.product.price.toLocaleString('ru-RU')} ₽/шт</p>
              </div>
              <button onClick={() => removeFromCart(item.product.id)} className="text-gray-700 hover:text-red-400 transition-colors shrink-0">
                <Icon name="X" size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-6 sticky top-24">
            <h2 className="font-display text-white text-xl font-bold mb-6">ИТОГО</h2>

            <div className="space-y-3 mb-6 text-sm font-body">
              <div className="flex justify-between text-gray-400">
                <span>Товары ({cart.reduce((s, i) => s + i.quantity, 0)} шт)</span>
                <span>{cartTotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Промокод -{discount}%</span>
                  <span>−{discountAmount.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>Доставка</span>
                <span className={cartTotal >= 50000 ? 'text-green-400' : 'text-white'}>
                  {cartTotal >= 50000 ? 'Бесплатно' : 'от 2 000 ₽'}
                </span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-display text-white font-bold text-lg">К оплате</span>
                <span className="font-display text-orange-400 font-bold text-xl">{total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            {/* Promo */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  value={promo}
                  onChange={e => { setPromo(e.target.value); setPromoError(''); }}
                  placeholder="Промокод"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-body placeholder:text-gray-600 outline-none focus:border-orange-500/50"
                />
                <button onClick={applyPromo} className="btn-primary text-sm py-2 px-4">
                  OK
                </button>
              </div>
              {promoError && <p className="text-red-400 text-xs font-body mt-1">{promoError}</p>}
              {promoApplied && <p className="text-green-400 text-xs font-body mt-1">✓ Промокод применён!</p>}
              <p className="text-gray-700 text-xs font-body mt-1">Попробуйте: ELITE20, FIRST10, SAVE15</p>
            </div>

            <button onClick={() => navigate('/checkout')} className="btn-primary w-full text-center text-base py-3 flex items-center justify-center gap-2 neon-glow-orange">
              Оформить заказ <Icon name="ArrowRight" size={18} />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 text-xs font-body">
              <Icon name="Shield" size={13} />
              <span>Безопасная оплата · SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
