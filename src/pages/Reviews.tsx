import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { REVIEWS } from '@/data/products';

export default function Reviews() {
  const [newReview, setNewReview] = useState({ name: '', rating: 5, product: '', text: '' });
  const [userReviews, setUserReviews] = useState<typeof REVIEWS>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserReviews(prev => [...prev, {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      text: newReview.text,
      product: newReview.product,
      avatar: newReview.name.slice(0, 2).toUpperCase(),
    }]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setNewReview({ name: '', rating: 5, product: '', text: '' });
  };

  const allReviews = [...userReviews, ...REVIEWS];
  const avgRating = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: 'Отзывы' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-orange-400 font-body text-sm font-semibold uppercase tracking-widest mb-2 block">Мнения покупателей</span>
          <h1 className="font-display text-5xl font-bold text-white">
            ОТ<span className="gradient-text-orange">ЗЫВЫ</span>
          </h1>
        </div>
        <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-4">
          <div className="text-center">
            <div className="font-display text-4xl font-bold gradient-text-orange">{avgRating}</div>
            <div className="flex gap-0.5 justify-center mt-1">
              {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={14} className="text-orange-400" />)}
            </div>
          </div>
          <div className="text-left">
            <p className="text-white font-body font-semibold text-sm">Средняя оценка</p>
            <p className="text-gray-500 text-xs font-body">{allReviews.length} отзывов</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reviews grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {allReviews.map(review => (
              <div key={review.id} className="glass-card glass-card-hover rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center shrink-0">
                      <span className="font-display text-white font-bold text-sm">{review.avatar}</span>
                    </div>
                    <div>
                      <p className="text-white font-body font-semibold text-sm">{review.name}</p>
                      <p className="text-gray-600 text-xs font-body">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={13} className={s <= review.rating ? 'text-orange-400' : 'text-gray-700'} />)}
                  </div>
                </div>
                {review.product && (
                  <p className="text-orange-400/70 text-xs font-body mb-2">Товар: {review.product}</p>
                )}
                <p className="text-gray-400 text-sm font-body leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-white mb-5">ОСТАВИТЬ ОТЗЫВ</h2>
            {submitted ? (
              <div className="text-center py-8">
                <Icon name="CheckCircle" size={48} className="text-green-400 mx-auto mb-3" />
                <p className="text-white font-body font-semibold mb-1">Отзыв отправлен!</p>
                <p className="text-gray-500 text-sm font-body">Спасибо за обратную связь</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs font-body mb-1.5 block">Ваше имя *</label>
                  <input
                    required
                    value={newReview.name}
                    onChange={e => setNewReview(r => ({ ...r, name: e.target.value }))}
                    placeholder="Иван Иванов"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-body placeholder:text-gray-600 outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-body mb-1.5 block">Товар</label>
                  <input
                    value={newReview.product}
                    onChange={e => setNewReview(r => ({ ...r, product: e.target.value }))}
                    placeholder="Название товара (необязательно)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-body placeholder:text-gray-600 outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-body mb-2 block">Оценка</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} type="button" onClick={() => setNewReview(r => ({ ...r, rating: s }))}>
                        <Icon name="Star" size={28} className={s <= newReview.rating ? 'text-orange-400' : 'text-gray-700 hover:text-orange-300'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-body mb-1.5 block">Текст отзыва *</label>
                  <textarea
                    required
                    value={newReview.text}
                    onChange={e => setNewReview(r => ({ ...r, text: e.target.value }))}
                    placeholder="Поделитесь впечатлениями о покупке..."
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-body placeholder:text-gray-600 outline-none focus:border-orange-500/50 resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full text-center py-3">
                  Отправить отзыв
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
