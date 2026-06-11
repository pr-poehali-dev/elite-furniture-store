import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ProductCard from '@/components/shared/ProductCard';
import { PRODUCTS, CATEGORIES, MATERIALS, COLORS } from '@/data/products';

type Sort = 'popular' | 'price_asc' | 'price_desc' | 'new';

export default function Catalog() {
  const [params] = useSearchParams();
  const [category, setCategory] = useState(params.get('category') || '');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<Sort>('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  useEffect(() => {
    setPage(1);
  }, [category, priceMin, priceMax, material, color, inStockOnly]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category) list = list.filter(p => p.category === category);
    if (priceMin) list = list.filter(p => p.price >= Number(priceMin));
    if (priceMax) list = list.filter(p => p.price <= Number(priceMax));
    if (material) list = list.filter(p => p.material === material);
    if (color) list = list.filter(p => p.color === color);
    if (inStockOnly) list = list.filter(p => p.inStock);
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'new') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [category, priceMin, priceMax, material, color, inStockOnly, sort]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const reset = () => {
    setCategory(''); setPriceMin(''); setPriceMax('');
    setMaterial(''); setColor(''); setInStockOnly(false);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-display text-white font-semibold mb-3 text-sm uppercase tracking-wider">Категория</h3>
        <div className="space-y-1">
          <button onClick={() => setCategory('')} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-all ${!category ? 'text-orange-400 bg-orange-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            Все категории
          </button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-all flex items-center gap-2 ${category === c.id ? 'text-orange-400 bg-orange-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span>{c.icon}</span>{c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-display text-white font-semibold mb-3 text-sm uppercase tracking-wider">Цена, ₽</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="От"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body outline-none focus:border-orange-500/50 placeholder:text-gray-600"
          />
          <input
            type="number"
            placeholder="До"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body outline-none focus:border-orange-500/50 placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Material */}
      <div>
        <h3 className="font-display text-white font-semibold mb-3 text-sm uppercase tracking-wider">Материал</h3>
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map(m => (
            <button key={m} onClick={() => setMaterial(material === m ? '' : m)} className={`px-3 py-1.5 rounded-lg text-xs font-body transition-all border ${material === m ? 'bg-orange-500 border-orange-500 text-white' : 'border-white/10 text-gray-400 hover:border-orange-500/40 hover:text-white'}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="font-display text-white font-semibold mb-3 text-sm uppercase tracking-wider">Цвет</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(c => (
            <button key={c} onClick={() => setColor(color === c ? '' : c)} className={`px-3 py-1.5 rounded-lg text-xs font-body transition-all border ${color === c ? 'bg-orange-500 border-orange-500 text-white' : 'border-white/10 text-gray-400 hover:border-orange-500/40 hover:text-white'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* In stock */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`w-10 h-5 rounded-full transition-all relative ${inStockOnly ? 'gradient-orange' : 'bg-white/10'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${inStockOnly ? 'left-5' : 'left-0.5'}`} />
          </div>
          <span className="text-gray-400 text-sm font-body group-hover:text-white transition-colors">Только в наличии</span>
        </label>
      </div>

      <button onClick={reset} className="w-full btn-outline-orange text-sm py-2 text-center">
        Сбросить фильтры
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: 'Каталог' }]} />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-white">
            КА<span className="gradient-text-orange">ТАЛОГ</span>
          </h1>
          <p className="text-gray-500 font-body text-sm mt-1">{filtered.length} товаров</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as Sort)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-body outline-none focus:border-orange-500/50 cursor-pointer"
          >
            <option value="popular" className="bg-gray-900">По популярности</option>
            <option value="price_asc" className="bg-gray-900">Цена: по возрастанию</option>
            <option value="price_desc" className="bg-gray-900">Цена: по убыванию</option>
            <option value="new" className="bg-gray-900">Новинки</option>
          </select>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 btn-outline-orange text-sm py-2"
          >
            <Icon name="SlidersHorizontal" size={15} />
            Фильтры
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="glass-card rounded-2xl p-5 sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile filters */}
        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setFiltersOpen(false)}>
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#111] border-l border-white/5 p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-white text-xl">Фильтры</h2>
                <button onClick={() => setFiltersOpen(false)}><Icon name="X" size={20} className="text-gray-400" /></button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        {/* Products */}
        <div className="flex-1">
          {paginated.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="PackageSearch" size={48} className="text-gray-700 mx-auto mb-4" fallback="Search" />
              <h3 className="font-display text-white text-xl mb-2">Ничего не найдено</h3>
              <p className="text-gray-500 font-body mb-6">Попробуйте изменить параметры фильтра</p>
              <button onClick={reset} className="btn-primary">Сбросить фильтры</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginated.map(p => <ProductCard key={p.id} product={p} />)}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-10 flex-wrap">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/30 transition-all disabled:opacity-30"
                  >
                    <Icon name="ChevronLeft" size={16} />
                  </button>
                  {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl text-sm font-body font-medium transition-all ${p === page ? 'gradient-orange text-white' : 'glass-card text-gray-400 hover:text-white'}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    disabled={page === pages}
                    onClick={() => setPage(p => p + 1)}
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/30 transition-all disabled:opacity-30"
                  >
                    <Icon name="ChevronRight" size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
