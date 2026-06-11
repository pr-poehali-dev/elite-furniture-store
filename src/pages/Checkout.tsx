import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { useApp } from '@/context/AppContext';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useApp();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', comment: '' });
  const [delivery, setDelivery] = useState('courier');
  const [payment, setPayment] = useState('card');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!/^\+?[0-9\s\-()]{10,}$/.test(form.phone)) e.phone = 'Введите корректный телефон';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Введите корректный email';
    if (delivery === 'courier' && !form.address.trim()) e.address = 'Введите адрес доставки';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      clearCart();
    }
  };

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="max-w-lg mx-auto text-center py-20">
          <div className="w-24 h-24 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '0 0 40px rgba(22,163,74,0.4)' }}>
            <Icon name="CheckCircle" size={48} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-3">ЗАКАЗ ПРИНЯТ!</h1>
          <p className="text-gray-400 font-body mb-2">Номер заказа: <span className="text-orange-400 font-semibold">#DE-{Date.now().toString().slice(-6)}</span></p>
          <p className="text-gray-500 font-body mb-8">Мы свяжемся с вами в течение 30 минут для подтверждения. Спасибо за покупку!</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
            На главную <Icon name="Home" size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const Field = ({ label, name, type = 'text', placeholder }: { label: string; name: keyof typeof form; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-gray-400 text-sm font-body mb-1.5">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-gray-600 outline-none transition-colors ${errors[name] ? 'border-red-500' : 'border-white/10 focus:border-orange-500/50'}`}
      />
      {errors[name] && <p className="text-red-400 text-xs font-body mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: 'Корзина', path: '/cart' }, { label: 'Оформление заказа' }]} />
      <h1 className="font-display text-4xl font-bold text-white mb-8">
        ОФОРМЛЕНИЕ <span className="gradient-text-orange">ЗАКАЗА</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Personal */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-white font-bold mb-5 text-lg">КОНТАКТНЫЕ ДАННЫЕ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Имя и фамилия *" name="name" placeholder="Иван Иванов" />
                <Field label="Телефон *" name="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                <div className="sm:col-span-2">
                  <Field label="Email *" name="email" type="email" placeholder="ivan@example.com" />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-white font-bold mb-5 text-lg">СПОСОБ ДОСТАВКИ</h2>
              <div className="space-y-3 mb-5">
                {[
                  { id: 'courier', label: 'Курьерская доставка', desc: 'По Москве 1–3 дня, бесплатно от 50 000 ₽', icon: 'Truck' },
                  { id: 'pickup', label: 'Самовывоз', desc: 'ул. Дизайнерская, 12. Бесплатно', icon: 'Store' },
                  { id: 'transport', label: 'Транспортная компания', desc: 'Россия, 3–10 дней', icon: 'Package' },
                ].map(opt => (
                  <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${delivery === opt.id ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 hover:border-white/20'}`}>
                    <input type="radio" name="delivery" value={opt.id} checked={delivery === opt.id} onChange={e => setDelivery(e.target.value)} className="hidden" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${delivery === opt.id ? 'border-orange-500' : 'border-gray-600'}`}>
                      {delivery === opt.id && <div className="w-2.5 h-2.5 rounded-full gradient-orange" />}
                    </div>
                    <Icon name={opt.icon} size={20} className={delivery === opt.id ? 'text-orange-400' : 'text-gray-600'} fallback="Package" />
                    <div>
                      <p className="text-white text-sm font-body font-medium">{opt.label}</p>
                      <p className="text-gray-500 text-xs font-body">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              {delivery === 'courier' && (
                <Field label="Адрес доставки *" name="address" placeholder="Улица, дом, квартира, город" />
              )}
            </div>

            {/* Payment */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-white font-bold mb-5 text-lg">СПОСОБ ОПЛАТЫ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Банковская карта', icon: 'CreditCard' },
                  { id: 'cash', label: 'Наличные', icon: 'Banknote' },
                  { id: 'credit', label: 'Рассрочка 0%', icon: 'Building2' },
                ].map(opt => (
                  <button key={opt.id} type="button" onClick={() => setPayment(opt.id)} className={`p-4 rounded-xl border transition-all text-center ${payment === opt.id ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 hover:border-white/20'}`}>
                    <Icon name={opt.icon} size={24} className={`mx-auto mb-2 ${payment === opt.id ? 'text-orange-400' : 'text-gray-600'}`} fallback="CreditCard" />
                    <p className={`text-sm font-body font-medium ${payment === opt.id ? 'text-white' : 'text-gray-400'}`}>{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-white font-bold mb-5 text-lg">КОММЕНТАРИЙ</h2>
              <textarea
                value={form.comment}
                onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                placeholder="Особые пожелания, уточнения к заказу..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-gray-600 outline-none focus:border-orange-500/50 resize-none"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="font-display text-white font-bold mb-5 text-lg">ВАШ ЗАКАЗ</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img src={item.product.image} alt="" className="w-12 h-10 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-body line-clamp-1">{item.product.name}</p>
                      <p className="text-gray-600 text-xs font-body">×{item.quantity}</p>
                    </div>
                    <span className="text-white text-sm font-display font-bold shrink-0">{(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between font-display text-white">
                  <span className="text-lg">ИТОГО</span>
                  <span className="text-xl gradient-text-orange">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full text-base py-3 text-center neon-glow-orange flex items-center justify-center gap-2">
                <Icon name="CheckCircle" size={18} />
                Подтвердить заказ
              </button>
              <p className="text-gray-700 text-xs font-body mt-3 text-center">Нажимая кнопку, вы соглашаетесь с условиями оферты</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
