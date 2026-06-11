export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  material: string;
  color: string;
  size: string;
  inStock: boolean;
  isNew?: boolean;
  isHit?: boolean;
  description: string;
  article: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 'sofas', name: 'Диваны', icon: '🛋️' },
  { id: 'beds', name: 'Кровати', icon: '🛏️' },
  { id: 'tables', name: 'Столы', icon: '🪑' },
  { id: 'chairs', name: 'Стулья', icon: '🪑' },
  { id: 'wardrobes', name: 'Шкафы', icon: '🗄️' },
];

export const MATERIALS = ['Дерево', 'Металл', 'Ткань', 'Кожа', 'МДФ'];
export const COLORS = ['Чёрный', 'Белый', 'Серый', 'Коричневый', 'Бежевый', 'Синий', 'Зелёный'];
export const SIZES = ['Маленький', 'Средний', 'Большой', 'XL'];

const HERO_IMG = 'https://cdn.poehali.dev/projects/f2b06d1e-800b-4137-8596-e02cfa0cfcdf/files/3240ec1e-fc2f-4b45-b8aa-e3e083904790.jpg';
const SOFA_IMG = 'https://cdn.poehali.dev/projects/f2b06d1e-800b-4137-8596-e02cfa0cfcdf/files/deb830d6-3fc9-43d8-839d-724308140479.jpg';
const BED_IMG = 'https://cdn.poehali.dev/projects/f2b06d1e-800b-4137-8596-e02cfa0cfcdf/files/75735f59-6015-40bd-8d25-ffcbbc1b2a0c.jpg';
const TABLE_IMG = 'https://cdn.poehali.dev/projects/f2b06d1e-800b-4137-8596-e02cfa0cfcdf/files/fa4c298c-4ffb-43d3-b5f2-283b50eee90a.jpg';
const WARDROBE_IMG = 'https://cdn.poehali.dev/projects/f2b06d1e-800b-4137-8596-e02cfa0cfcdf/files/286ba6c1-a8db-4b4a-acae-4131ce0eda88.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Диван Loft Prime',
    category: 'sofas',
    price: 89900,
    oldPrice: 119900,
    rating: 4.8,
    reviews: 127,
    image: SOFA_IMG,
    images: [SOFA_IMG, HERO_IMG],
    material: 'Ткань',
    color: 'Чёрный',
    size: 'Большой',
    inStock: true,
    isHit: true,
    article: 'SP-001',
    description: 'Стильный угловой диван в стиле лофт. Обивка из высококачественной рогожки, наполнитель — пружинный блок. Металлические ножки хромированные. Подходит для гостиной или офиса.'
  },
  {
    id: 2,
    name: 'Кровать Magnus 180',
    category: 'beds',
    price: 124900,
    rating: 4.9,
    reviews: 89,
    image: BED_IMG,
    images: [BED_IMG, HERO_IMG],
    material: 'Дерево',
    color: 'Коричневый',
    size: 'XL',
    inStock: true,
    isHit: true,
    isNew: true,
    article: 'BD-002',
    description: 'Двуспальная кровать с массивным изголовьем из дуба. Основание ортопедическое с ламелями. Размер спального места 180×200 см. Возможна встроенная подсветка по запросу.'
  },
  {
    id: 3,
    name: 'Обеденный стол Oak Line',
    category: 'tables',
    price: 67500,
    oldPrice: 89000,
    rating: 4.7,
    reviews: 54,
    image: TABLE_IMG,
    images: [TABLE_IMG],
    material: 'Дерево',
    color: 'Коричневый',
    size: 'Большой',
    inStock: true,
    isHit: true,
    article: 'TBL-003',
    description: 'Обеденный стол из массива дуба. Столешница 200×90 см. Ножки из металла с матовым покрытием. Выдерживает нагрузку до 200 кг. Идеален для большой семьи или переговорной комнаты.'
  },
  {
    id: 4,
    name: 'Шкаф Crystal Premium',
    category: 'wardrobes',
    price: 156000,
    rating: 4.6,
    reviews: 43,
    image: WARDROBE_IMG,
    images: [WARDROBE_IMG],
    material: 'МДФ',
    color: 'Белый',
    size: 'XL',
    inStock: true,
    isNew: true,
    article: 'WRD-004',
    description: 'Встроенный шкаф-купе со стеклянными дверями. Система раздвижных дверей немецкого производства. Внутри: 2 штанги, 6 полок, ящики для белья. Зеркальные вставки по желанию.'
  },
  {
    id: 5,
    name: 'Диван Velvet Luxury',
    category: 'sofas',
    price: 145000,
    oldPrice: 190000,
    rating: 5.0,
    reviews: 31,
    image: HERO_IMG,
    images: [HERO_IMG, SOFA_IMG],
    material: 'Ткань',
    color: 'Зелёный',
    size: 'Большой',
    inStock: true,
    isHit: true,
    article: 'SP-005',
    description: 'Роскошный диван в обивке из итальянского бархата цвета изумруд. Ножки из золочёной латуни. Наполнитель — гусиный пух. Настоящая жемчужина любого интерьера.'
  },
  {
    id: 6,
    name: 'Кресло Aster Black',
    category: 'chairs',
    price: 38900,
    rating: 4.5,
    reviews: 78,
    image: SOFA_IMG,
    images: [SOFA_IMG],
    material: 'Кожа',
    color: 'Чёрный',
    size: 'Средний',
    inStock: true,
    isNew: true,
    article: 'CHR-006',
    description: 'Эргономичное кресло из натуральной кожи. Высота регулируется. Каркас из алюминия. Сертифицировано по стандарту ergonomics ISO 9241. Подходит для работы и отдыха.'
  },
  {
    id: 7,
    name: 'Стол письменный Nova',
    category: 'tables',
    price: 29900,
    oldPrice: 39900,
    rating: 4.4,
    reviews: 112,
    image: TABLE_IMG,
    images: [TABLE_IMG],
    material: 'МДФ',
    color: 'Белый',
    size: 'Средний',
    inStock: true,
    isHit: true,
    article: 'TBL-007',
    description: 'Рабочий стол с большой поверхностью 140×70 см. Встроенные кабель-органайзеры. Регулируемые ножки для установки на любой пол. Матовое покрытие устойчиво к царапинам.'
  },
  {
    id: 8,
    name: 'Кровать Aurora 160',
    category: 'beds',
    price: 98000,
    rating: 4.7,
    reviews: 65,
    image: BED_IMG,
    images: [BED_IMG],
    material: 'Дерево',
    color: 'Серый',
    size: 'Большой',
    inStock: false,
    article: 'BD-008',
    description: 'Двуспальная кровать с мягким изголовьем в обивке серой рогожки. Основание реечное съёмное. Размер 160×200 см. Вместительный ящик для хранения под матрасом.'
  },
  {
    id: 9,
    name: 'Диван Scandic White',
    category: 'sofas',
    price: 72000,
    rating: 4.6,
    reviews: 44,
    image: SOFA_IMG,
    images: [SOFA_IMG],
    material: 'Ткань',
    color: 'Белый',
    size: 'Средний',
    inStock: true,
    isNew: true,
    article: 'SP-009',
    description: 'Трёхместный диван в скандинавском стиле. Обивка: льняная ткань молочного цвета. Деревянные ножки из ясеня. Съёмные чехлы — легко стирать. Компактный для небольших квартир.'
  },
  {
    id: 10,
    name: 'Шкаф Metro Industrial',
    category: 'wardrobes',
    price: 87000,
    oldPrice: 110000,
    rating: 4.3,
    reviews: 29,
    image: WARDROBE_IMG,
    images: [WARDROBE_IMG],
    material: 'Металл',
    color: 'Чёрный',
    size: 'Большой',
    inStock: true,
    isHit: true,
    article: 'WRD-010',
    description: 'Платяной шкаф в индустриальном стиле. Металлический каркас с деревянными полками. 3 двери с магнитными замками. Высота 220 см, ширина 180 см. Устойчив к деформации.'
  },
  {
    id: 11,
    name: 'Стул Loft Metal',
    category: 'chairs',
    price: 12900,
    rating: 4.2,
    reviews: 201,
    image: TABLE_IMG,
    images: [TABLE_IMG],
    material: 'Металл',
    color: 'Чёрный',
    size: 'Маленький',
    inStock: true,
    isHit: true,
    article: 'CHR-011',
    description: 'Барный стул в стиле лофт. Каркас из чёрного металла, сиденье — искусственная кожа. Высота регулируется от 60 до 80 см. Подставка для ног на удобной высоте.'
  },
  {
    id: 12,
    name: 'Кровать Premium Oak 200',
    category: 'beds',
    price: 189000,
    rating: 4.9,
    reviews: 17,
    image: BED_IMG,
    images: [BED_IMG],
    material: 'Дерево',
    color: 'Коричневый',
    size: 'XL',
    inStock: true,
    isNew: true,
    article: 'BD-012',
    description: 'Флагманская кровать из цельного дуба. Размер спального места 200×200 см. Изголовье с фигурной резьбой ручной работы. Встроенная система ночной подсветки. Гарантия 10 лет.'
  },
];

export const SLIDER_ITEMS = [
  {
    id: 1,
    title: 'Мебель, которая\nрассказывает историю',
    subtitle: 'Коллекция Premium 2024 — уже в наличии',
    badge: 'Новая коллекция',
    cta: 'Смотреть каталог',
    image: HERO_IMG,
    accent: 'orange',
  },
  {
    id: 2,
    title: 'Диваны из\nнатуральной кожи',
    subtitle: 'Скидки до 30% на коллекцию Velvet Luxury',
    badge: 'Скидки до -30%',
    cta: 'Получить скидку',
    image: SOFA_IMG,
    accent: 'blue',
  },
  {
    id: 3,
    title: 'Спальни для\nидеального сна',
    subtitle: 'Кровати из массива дуба с бесплатной доставкой',
    badge: 'Бесплатная доставка',
    cta: 'Выбрать кровать',
    image: BED_IMG,
    accent: 'orange',
  },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: '5 трендов в дизайне интерьера 2024 года',
    excerpt: 'Биофильный дизайн, арки, смелые цвета и натуральные материалы — что будет актуально в следующем году.',
    date: '15 ноября 2024',
    category: 'Тренды',
    readTime: '5 мин',
    image: HERO_IMG,
  },
  {
    id: 2,
    title: 'Как выбрать диван для гостиной: полный гайд',
    excerpt: 'Размер, материал, форма — разбираем все параметры, чтобы не пожалеть о покупке.',
    date: '8 ноября 2024',
    category: 'Советы',
    readTime: '7 мин',
    image: SOFA_IMG,
  },
  {
    id: 3,
    title: 'Скандинавский стиль: принципы и мебель',
    excerpt: 'Минимализм, светлые тона и натуральное дерево — создаём уютное пространство по-скандинавски.',
    date: '1 ноября 2024',
    category: 'Стиль',
    readTime: '6 мин',
    image: TABLE_IMG,
  },
];

export const VACANCIES = [
  {
    id: 1,
    title: 'Дизайнер интерьеров',
    department: 'Дизайн',
    type: 'Полная занятость',
    location: 'Москва / Удалённо',
    salary: 'от 120 000 ₽',
    description: 'Разработка концепций интерьеров для клиентов, подбор мебели и материалов, работа с 3D-программами.',
  },
  {
    id: 2,
    title: 'Менеджер по продажам',
    department: 'Продажи',
    type: 'Полная занятость',
    location: 'Москва',
    salary: 'от 80 000 + KPI',
    description: 'Консультирование клиентов в торговом зале и онлайн, ведение сделок, выполнение плана продаж.',
  },
  {
    id: 3,
    title: 'SMM-специалист',
    department: 'Маркетинг',
    type: 'Полная занятость',
    location: 'Удалённо',
    salary: 'от 70 000 ₽',
    description: 'Ведение социальных сетей бренда, создание контента, взаимодействие с аудиторией и блогерами.',
  },
  {
    id: 4,
    title: 'Сборщик мебели',
    department: 'Производство',
    type: 'Полная занятость',
    location: 'Москва',
    salary: 'от 65 000 ₽',
    description: 'Сборка мебели у клиентов на дому, работа с инструментами, соблюдение технологических карт.',
  },
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Анна Петрова',
    rating: 5,
    date: '10 ноября 2024',
    text: 'Заказала диван Velvet Luxury — просто мечта! Качество превзошло все ожидания. Доставили аккуратно, собрали быстро. Буду рекомендовать всем друзьям!',
    product: 'Диван Velvet Luxury',
    avatar: 'АП',
  },
  {
    id: 2,
    name: 'Михаил Соколов',
    rating: 5,
    date: '5 ноября 2024',
    text: 'Купили кровать Magnus 180 для спальни. Очень довольны! Дерево настоящее, ничего скрипит. Менеджеры помогли с выбором матраса. Цены адекватные для такого качества.',
    product: 'Кровать Magnus 180',
    avatar: 'МС',
  },
  {
    id: 3,
    name: 'Елена Смирнова',
    rating: 4,
    date: '28 октября 2024',
    text: 'Взяли обеденный стол Oak Line. Стол шикарный, только доставку пришлось немного подождать. Но сотрудники всё объяснили и компенсировали скидкой. В целом — рекомендую!',
    product: 'Стол Oak Line',
    avatar: 'ЕС',
  },
  {
    id: 4,
    name: 'Дмитрий Козлов',
    rating: 5,
    date: '20 октября 2024',
    text: 'Оформил шкаф Crystal Premium под заказ с особыми размерами. Всё сделали точно по схеме, подогнали идеально. Установщики — профессионалы. Спасибо команде ДомЭлит!',
    product: 'Шкаф Crystal Premium',
    avatar: 'ДК',
  },
  {
    id: 5,
    name: 'Наталья Воронова',
    rating: 5,
    date: '15 октября 2024',
    text: 'Покупаю уже третий раз. Взяла кресло Aster Black для домашнего офиса — великолепно! Эргономика на высоте, кожа мягкая. Буду брать ещё стол.',
    product: 'Кресло Aster Black',
    avatar: 'НВ',
  },
  {
    id: 6,
    name: 'Игорь Громов',
    rating: 4,
    date: '8 октября 2024',
    text: 'Хороший магазин. Диван Scandic White купили для детской — цвет чистый белый как на фото, ткань плотная. Чехлы снимаются и стираются легко. Рекомендую молодым родителям.',
    product: 'Диван Scandic White',
    avatar: 'ИГ',
  },
];
