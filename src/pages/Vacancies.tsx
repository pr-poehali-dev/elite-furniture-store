import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { VACANCIES } from '@/data/products';

export default function Vacancies() {
  const [selected, setSelected] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleApply = (id: number) => setSelected(id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setSelected(null); setForm({ name: '', phone: '', email: '', message: '' }); }, 3000);
  };

  const dept_colors: Record<string, string> = {
    'Дизайн': 'gradient-orange',
    'Продажи': 'gradient-blue',
    'Маркетинг': 'bg-purple-600',
    'Производство': 'bg-teal-600',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: 'Вакансии' }]} />

      <div className="mb-12">
        <span className="text-orange-400 font-body text-sm font-semibold uppercase tracking-widest mb-2 block">Присоединяйтесь к команде</span>
        <h1 className="font-display text-5xl font-bold text-white">
          ВА<span className="gradient-text-orange">КАНСИИ</span>
        </h1>
        <p className="text-gray-400 font-body mt-3 text-lg">Мы ищем людей, которые любят создавать красоту</p>
      </div>

      {/* Why us */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: 'TrendingUp', title: 'Рост', desc: 'Карьерное развитие и обучение' },
          { icon: 'Heart', title: 'Команда', desc: 'Дружный коллектив профессионалов' },
          { icon: 'DollarSign', title: 'Зарплата', desc: 'Выше рынка + бонусы' },
          { icon: 'Coffee', title: 'Комфорт', desc: 'Гибкий график, уютный офис' },
        ].map((item, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 text-center">
            <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon name={item.icon} size={18} className="text-white" fallback="Star" />
            </div>
            <h3 className="font-display text-white font-bold text-sm mb-1">{item.title}</h3>
            <p className="text-gray-500 text-xs font-body">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Vacancies list */}
      <div className="space-y-4 mb-12">
        {VACANCIES.map(vac => (
          <div key={vac.id} className="glass-card rounded-2xl p-6 hover:border-orange-500/20 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className={`${dept_colors[vac.department] || 'gradient-orange'} text-white text-xs font-body font-bold px-3 py-1 rounded-full`}>
                    {vac.department}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-xs font-body">
                    <Icon name="MapPin" size={11} /> {vac.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-xs font-body">
                    <Icon name="Clock" size={11} /> {vac.type}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{vac.title}</h3>
                <p className="text-gray-500 text-sm font-body mb-2">{vac.description}</p>
                <span className="text-orange-400 font-body font-semibold text-sm">{vac.salary}</span>
              </div>
              <button
                onClick={() => handleApply(vac.id)}
                className="btn-primary flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Icon name="Send" size={15} />
                Откликнуться
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Apply form modal */}
      {selected !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="glass-card rounded-3xl p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">ОТКЛИКНУТЬСЯ</h2>
                <p className="text-gray-500 text-sm font-body mt-1">
                  {VACANCIES.find(v => v.id === selected)?.title}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">
                <Icon name="X" size={22} />
              </button>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <Icon name="CheckCircle" size={56} className="text-green-400 mx-auto mb-4" />
                <h3 className="font-display text-white text-xl font-bold mb-2">Отклик отправлен!</h3>
                <p className="text-gray-400 font-body">Мы свяжемся с вами в течение 2 рабочих дней</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: 'Имя и фамилия *', key: 'name', placeholder: 'Иван Иванов', type: 'text' },
                  { label: 'Телефон *', key: 'phone', placeholder: '+7 (999) 123-45-67', type: 'tel' },
                  { label: 'Email *', key: 'email', placeholder: 'ivan@example.com', type: 'email' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-gray-400 text-xs font-body mb-1.5 block">{field.label}</label>
                    <input
                      required
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-gray-600 outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-gray-400 text-xs font-body mb-1.5 block">О себе</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Расскажите о себе и своём опыте..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-gray-600 outline-none focus:border-orange-500/50 resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                  <Icon name="Send" size={16} />
                  Отправить отклик
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Open application */}
      <div className="glass-card rounded-3xl p-8 text-center border border-white/5">
        <Icon name="UserPlus" size={40} className="text-orange-400 mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-white mb-3">НЕ НАШЛИ ПОДХОДЯЩУЮ ВАКАНСИЮ?</h2>
        <p className="text-gray-400 font-body mb-6 max-w-lg mx-auto">
          Отправьте нам своё резюме, и мы рассмотрим вашу кандидатуру при открытии новых позиций.
        </p>
        <a href="mailto:hr@domelite.ru" className="btn-primary inline-flex items-center gap-2">
          <Icon name="Mail" size={16} />
          Отправить резюме на hr@domelite.ru
        </a>
      </div>
    </div>
  );
}
