import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Crumb {
  label: string;
  path?: string;
}

interface Props {
  crumbs: Crumb[];
}

export default function Breadcrumbs({ crumbs }: Props) {
  return (
    <nav className="flex items-center gap-1.5 text-sm font-body mb-6 flex-wrap">
      <Link to="/" className="text-gray-600 hover:text-orange-400 transition-colors flex items-center gap-1">
        <Icon name="Home" size={13} />
        <span>Главная</span>
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <Icon name="ChevronRight" size={13} className="text-gray-700" />
          {crumb.path && i < crumbs.length - 1 ? (
            <Link to={crumb.path} className="text-gray-600 hover:text-orange-400 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-400">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
