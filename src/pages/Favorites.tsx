import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ProductCard from '@/components/shared/ProductCard';
import { useApp } from '@/context/AppContext';
import { PRODUCTS } from '@/data/products';

export default function Favorites() {
  const { favorites } = useApp();
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: 'Избранное' }]} />
      <h1 className="font-display text-4xl font-bold text-white mb-8">
        ИЗ<span className="gradient-text-orange">БРАННОЕ</span>
      </h1>

      {favProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 glass-card rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Icon name="Heart" size={40} className="text-gray-700" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Избранное пусто</h2>
          <p className="text-gray-500 font-body mb-8">Нажмите ❤️ на любой карточке, чтобы добавить в избранное</p>
          <Link to="/catalog" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
            Перейти в каталог <Icon name="ArrowRight" size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {favProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
