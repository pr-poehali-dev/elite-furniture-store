import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const HERO_IMG = 'https://cdn.poehali.dev/projects/f2b06d1e-800b-4137-8596-e02cfa0cfcdf/files/3240ec1e-fc2f-4b45-b8aa-e3e083904790.jpg';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: 'О нас' }]} />

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <span className="text-orange-400 font-body text-sm font-semibold uppercase tracking-widest mb-3 block">С 2012 года</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            МЫ СОЗДАЁМ<br /><span className="gradient-text-orange">ПРОСТРАНСТВО</span><br />МЕЧТЫ
          </h1>
          <p className="text-gray-400 font-body text-lg leading-relaxed mb-8">
            ДомЭлит — это не просто мебельный магазин. Мы помогаем людям создавать дома, в которых хочется жить. За 12 лет работы мы обставили более 15 000 квартир и офисов по всей России.
          </p>
          <div className="flex gap-6 flex-wrap">
            {[
              { value: '12+', label: 'лет на рынке' },
              { value: '15K+', label: 'довольных клиентов' },
              { value: '500+', label: 'товаров в каталоге' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl font-bold gradient-text-orange">{stat.value}</div>
                <div className="text-gray-500 text-sm font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={HERO_IMG} alt="ДомЭлит шоу-рум" className="w-full aspect-[4/3] object-cover rounded-3xl" />
          <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center">
              <Icon name="Award" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-body font-semibold">Лучший мебельный магазин</p>
              <p className="text-gray-500 text-xs font-body">по версии Forbes Russia 2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <h2 className="font-display text-4xl font-bold text-white text-center mb-12">
          НА<span className="gradient-text-orange">ШИ</span> ЦЕННОСТИ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'Gem', title: 'Качество без компромиссов', desc: 'Каждый предмет мебели проходит 17-этапный контроль качества. Мы работаем только с проверенными поставщиками материалов из России, Германии и Италии.', color: 'orange' },
            { icon: 'Palette', title: 'Дизайн с душой', desc: 'Наши дизайнеры создают коллекции, которые сочетают актуальные тренды с вечной классикой. Каждый предмет — это история.', color: 'blue' },
            { icon: 'HeartHandshake', title: 'Клиент на первом месте', desc: 'Мы сопровождаем вас от первого звонка до последнего болта. Бесплатный дизайн-проект, помощь в выборе, монтаж и постпродажная поддержка.', color: 'orange' },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-3xl p-8 hover:border-orange-500/20 transition-all group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color === 'orange' ? 'gradient-orange' : 'gradient-blue'}`}>
                <Icon name={item.icon} size={26} className="text-white" fallback="Star" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{item.title}</h3>
              <p className="text-gray-500 font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <h2 className="font-display text-4xl font-bold text-white text-center mb-12">
          КО<span className="gradient-text-blue">МАНДА</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Барсуков Михаил', role: 'Основатель и CEO', initial: 'БМ' },
            { name: 'Мария Белова', role: 'Главный дизайнер', initial: 'МБ' },
            { name: 'Дмитрий Черных', role: 'Директор по продажам', initial: 'ДЧ' },
            { name: 'Анастасия Лещева', role: 'Руководитель доставки', initial: 'АЛ' },
          ].map((member, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center hover:border-orange-500/20 transition-all">
              <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-white font-bold text-xl">{member.initial}</span>
              </div>
              <h3 className="font-display text-white font-bold text-base mb-1">{member.name}</h3>
              <p className="text-gray-500 text-sm font-body">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="font-display text-3xl font-bold text-white mb-8">КОН<span className="gradient-text-orange">ТАКТЫ</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'MapPin', title: 'Шоу-рум', lines: ['Москва, ул. Дизайнерская, 12', 'офис 301, 3 этаж', 'м. Дизайнерская, 5 мин пешком'], color: 'orange' },
            { icon: 'Phone', title: 'Связь', lines: ['+7 (495) 123-45-67', 'info@domelite.ru', 'Пн–Пт: 10:00–20:00'], color: 'blue' },
            { icon: 'Clock', title: 'Шоу-рум открыт', lines: ['Понедельник–Пятница: 10:00–20:00', 'Суббота: 11:00–19:00', 'Воскресенье: 12:00–18:00'], color: 'orange' },
          ].map((block, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${block.color === 'orange' ? 'gradient-orange' : 'gradient-blue'}`}>
                  <Icon name={block.icon} size={18} className="text-white" fallback="Info" />
                </div>
                <h3 className="font-display text-white font-bold">{block.title}</h3>
              </div>
              {block.lines.map((line, j) => (
                <p key={j} className="text-gray-500 text-sm font-body mb-1">{line}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <Link to="/catalog" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
            Перейти в каталог <Icon name="ArrowRight" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}