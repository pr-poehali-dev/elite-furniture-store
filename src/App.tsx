import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import Layout from '@/components/layout/Layout';

import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import ProductPage from '@/pages/ProductPage';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Delivery from '@/pages/Delivery';
import About from '@/pages/About';
import Reviews from '@/pages/Reviews';
import Blog from '@/pages/Blog';
import Vacancies from '@/pages/Vacancies';
import Favorites from '@/pages/Favorites';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl font-bold text-white mb-8">ПОЛИТИКА <span className="gradient-text-orange">КОНФИДЕНЦИАЛЬНОСТИ</span></h1>
      <div className="space-y-6 font-body text-gray-400 leading-relaxed">
        <p>Настоящая политика конфиденциальности регулирует порядок обработки персональных данных пользователей сайта ДомЭлит (domelite.ru).</p>
        <h2 className="font-display text-white text-xl">1. Сбор данных</h2>
        <p>Мы собираем только те данные, которые необходимы для оформления заказов и улучшения качества сервиса: имя, телефон, email, адрес доставки.</p>
        <h2 className="font-display text-white text-xl">2. Использование данных</h2>
        <p>Данные используются исключительно для обработки заказов, доставки товаров и информирования о статусе заказа. Мы не передаём ваши данные третьим лицам без вашего согласия.</p>
        <h2 className="font-display text-white text-xl">3. Хранение данных</h2>
        <p>Данные хранятся на защищённых серверах с шифрованием. Срок хранения — 3 года с момента последней покупки.</p>
        <h2 className="font-display text-white text-xl">4. Контакты</h2>
        <p>По вопросам обработки персональных данных: <a href="mailto:privacy@domelite.ru" className="text-orange-400">privacy@domelite.ru</a></p>
      </div>
    </div>
  );
}

function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl font-bold text-white mb-8">ПОЛЬЗОВАТЕЛЬСКОЕ <span className="gradient-text-orange">СОГЛАШЕНИЕ</span></h1>
      <div className="space-y-6 font-body text-gray-400 leading-relaxed">
        <p>Используя сайт ДомЭлит, вы соглашаетесь с настоящим пользовательским соглашением.</p>
        <h2 className="font-display text-white text-xl">1. Общие положения</h2>
        <p>ДомЭлит — интернет-магазин премиальной мебели. Все цены указаны в рублях включая НДС. Компания оставляет за собой право изменять цены и ассортимент без предупреждения.</p>
        <h2 className="font-display text-white text-xl">2. Оформление заказов</h2>
        <p>Заказ считается принятым после получения подтверждения на email. Компания оставляет за собой право отказать в исполнении заказа без объяснения причин с полным возвратом средств.</p>
        <h2 className="font-display text-white text-xl">3. Интеллектуальная собственность</h2>
        <p>Все материалы сайта (тексты, изображения, логотипы) являются собственностью ДомЭлит и защищены законодательством РФ.</p>
        <h2 className="font-display text-white text-xl">4. Контакты</h2>
        <p>ООО «ДомЭлит», Москва, ул. Дизайнерская, 12. Email: <a href="mailto:info@domelite.ru" className="text-orange-400">info@domelite.ru</a></p>
      </div>
    </div>
  );
}
