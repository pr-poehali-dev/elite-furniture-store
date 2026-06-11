import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export default function Delivery() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: 'Доставка и оплата' }]} />

      <div className="mb-12">
        <span className="text-orange-400 font-body text-sm font-semibold uppercase tracking-widest mb-2 block">Удобно и надёжно</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
          ДОСТАВКА<br /><span className="gradient-text-orange">И ОПЛАТА</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Delivery */}
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 gradient-orange rounded-2xl flex items-center justify-center neon-glow-orange">
              <Icon name="Truck" size={22} className="text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">ДОСТАВКА</h2>
          </div>
          <div className="space-y-5">
            {[
              { title: 'По Москве (в пределах МКАД)', items: ['Стоимость: бесплатно при заказе от 50 000 ₽', 'При меньшей сумме: 2 000 ₽', 'Срок доставки: 1–3 рабочих дня', 'Доставка в удобный день и время (с 10:00 до 22:00)'] },
              { title: 'По Московской области', items: ['Стоимость: от 2 500 ₽', 'Срок доставки: 2–5 рабочих дней', 'Уточняйте стоимость по телефону'] },
              { title: 'Регионы России', items: ['Доставка транспортными компаниями: CDEK, Деловые Линии, ПЭК', 'Срок доставки: 3–14 рабочих дней', 'Стоимость рассчитывается индивидуально'] },
            ].map((block, i) => (
              <div key={i}>
                <h3 className="text-orange-400 font-body font-semibold text-sm mb-2">{block.title}</h3>
                <ul className="space-y-1">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-400 text-sm font-body">
                      <Icon name="Check" size={14} className="text-orange-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 gradient-blue rounded-2xl flex items-center justify-center neon-glow-blue">
              <Icon name="CreditCard" size={22} className="text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">ОПЛАТА</h2>
          </div>
          <div className="space-y-5">
            {[
              { icon: 'CreditCard', title: 'Банковская карта онлайн', desc: 'Visa, MasterCard, МИР. Защита платежей 3D-Secure. Данные карты не хранятся.', color: 'blue' },
              { icon: 'Banknote', title: 'Наличные при получении', desc: 'Оплата курьеру или в нашем шоу-руме. Выдаём кассовый чек и гарантийный талон.', color: 'orange' },
              { icon: 'Building2', title: 'Рассрочка 0% на 24 месяца', desc: 'Сбербанк, Тинькофф, ПСБ. Одобрение онлайн за 5 минут. Без переплат.', color: 'blue' },
              { icon: 'FileText', title: 'Безналичный расчёт (юрлица)', desc: 'Оплата по счёту для организаций. Договор, УПД, закрывающие документы.', color: 'orange' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color === 'orange' ? 'gradient-orange' : 'gradient-blue'}`}>
                  <Icon name={item.icon} size={18} className="text-white" fallback="CreditCard" />
                </div>
                <div>
                  <h3 className="text-white font-body font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assembly */}
      <div className="glass-card rounded-3xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 gradient-orange rounded-2xl flex items-center justify-center">
            <Icon name="Wrench" size={22} className="text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">СБОРКА МЕБЕЛИ</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Бесплатная сборка', desc: 'При заказе от 80 000 ₽ сборка мебели производится бесплатно нашими специалистами.', highlight: true },
            { title: 'Платная сборка', desc: 'Стоимость сборки — от 2 500 ₽ в зависимости от сложности и количества позиций.', highlight: false },
            { title: 'Подъём на этаж', desc: 'Подъём крупногабаритных изделий: от 500 ₽ за этаж (при отсутствии лифта).', highlight: false },
          ].map((item, i) => (
            <div key={i} className={`p-5 rounded-2xl ${item.highlight ? 'border border-orange-500/30 bg-orange-500/5' : 'bg-white/3 border border-white/5'}`}>
              {item.highlight && <span className="text-orange-400 text-xs font-body font-bold uppercase tracking-widest mb-2 block">Выгодно</span>}
              <h3 className="font-display text-white font-bold text-base mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Returns */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 gradient-blue rounded-2xl flex items-center justify-center neon-glow-blue">
            <Icon name="RotateCcw" size={22} className="text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">ВОЗВРАТ И ОБМЕН</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-orange-400 font-body font-semibold text-sm mb-3">Условия возврата</h3>
            <ul className="space-y-2">
              {[
                'Возврат товара надлежащего качества — в течение 30 дней',
                'Товар должен быть в оригинальной упаковке, без следов использования',
                'При наличии заводского брака — замена или возврат в течение гарантийного срока',
                'Возврат денежных средств — в течение 10 рабочих дней',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-400 text-sm font-body">
                  <Icon name="Check" size={14} className="text-blue-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-orange-400 font-body font-semibold text-sm mb-3">Гарантия</h3>
            <ul className="space-y-2">
              {[
                'Гарантия на всю мебель собственного производства — 5 лет',
                'Гарантия на фурнитуру и механизмы — 2 года',
                'Бесплатный ремонт в гарантийный период',
                'Выезд специалиста для оценки гарантийного случая бесплатно',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-400 text-sm font-body">
                  <Icon name="Shield" size={14} className="text-blue-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
