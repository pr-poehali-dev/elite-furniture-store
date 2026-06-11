import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart, toggleFavorite, isFavorite } = useApp();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="glass-card glass-card-hover rounded-2xl overflow-hidden relative">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0f0f0f]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="gradient-blue text-white text-[10px] font-body font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Новинка
              </span>
            )}
            {product.isHit && (
              <span className="gradient-orange text-white text-[10px] font-body font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Хит
              </span>
            )}
            {discount && (
              <span className="bg-red-500 text-white text-[10px] font-body font-bold px-2 py-0.5 rounded-full uppercase">
                -{discount}%
              </span>
            )}
          </div>
          {/* Favorite */}
          <button
            onClick={handleFav}
            className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              isFavorite(product.id)
                ? 'bg-orange-500 text-white'
                : 'bg-black/50 text-gray-400 hover:text-orange-400 hover:bg-black/70'
            }`}
          >
            <Icon name="Heart" size={15} />
          </button>
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-gray-800 text-gray-400 text-xs font-body px-3 py-1.5 rounded-full border border-gray-700">
                Нет в наличии
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => (
                <Icon
                  key={s}
                  name="Star"
                  size={11}
                  className={s <= Math.round(product.rating) ? 'text-orange-400' : 'text-gray-700'}
                />
              ))}
            </div>
            <span className="text-gray-600 text-xs font-body">{product.rating} ({product.reviews})</span>
          </div>

          <h3 className="font-display text-white font-medium text-base leading-tight mb-1 group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs font-body mb-3">Арт. {product.article}</p>

          {/* Price */}
          <div className="flex items-end gap-2 mb-3">
            <span className="font-display text-xl font-bold text-white">
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
            {product.oldPrice && (
              <span className="text-gray-600 text-sm font-body line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`w-full py-2.5 rounded-xl text-sm font-body font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              !product.inStock
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : added
                  ? 'bg-green-600 text-white'
                  : 'btn-primary'
            }`}
          >
            <Icon name={added ? 'Check' : 'ShoppingCart'} size={15} />
            {added ? 'Добавлено!' : 'В корзину'}
          </button>
        </div>
      </div>
    </Link>
  );
}
