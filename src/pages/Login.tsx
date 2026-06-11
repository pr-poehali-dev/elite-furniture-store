import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

type Tab = 'login' | 'register' | 'reset';

export default function Login() {
  const [tab, setTab] = useState<Tab>('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resetSent, setResetSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const validateLogin = () => {
    const e: Record<string, string> = {};
    if (!loginForm.email) e.email = 'Введите email';
    if (!loginForm.password) e.password = 'Введите пароль';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validateReg = () => {
    const e: Record<string, string> = {};
    if (!regForm.name.trim()) e.name = 'Введите имя';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) e.email = 'Введите корректный email';
    if (!regForm.password || regForm.password.length < 6) e.password = 'Минимум 6 символов';
    if (regForm.password !== regForm.confirm) e.confirm = 'Пароли не совпадают';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) setLoggedIn(true);
  };

  const handleReg = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateReg()) setLoggedIn(true);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  if (loggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="max-w-lg mx-auto text-center py-20">
          <div className="w-24 h-24 gradient-orange rounded-3xl flex items-center justify-center mx-auto mb-6 neon-glow-orange">
            <Icon name="User" size={44} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-3">
            ДОБРО <span className="gradient-text-orange">ПОЖАЛОВАТЬ!</span>
          </h1>
          <p className="text-gray-400 font-body mb-8">Вы успешно вошли в личный кабинет</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/catalog" className="btn-primary flex items-center gap-2">
              Перейти в каталог <Icon name="ArrowRight" size={16} />
            </Link>
            <Link to="/favorites" className="btn-outline-orange flex items-center gap-2">
              <Icon name="Heart" size={16} /> Избранное
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-gray-600 outline-none transition-colors ${
      errors[field] ? 'border-red-500' : 'border-white/10 focus:border-orange-500/50'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumbs crumbs={[{ label: tab === 'login' ? 'Вход' : tab === 'register' ? 'Регистрация' : 'Восстановление пароля' }]} />

      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-4 neon-glow-orange">
            <span className="font-display font-bold text-white text-2xl">ДЭ</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            {tab === 'login' ? 'ВОЙТИ' : tab === 'register' ? 'РЕГИСТРАЦИЯ' : 'ВОССТАНОВЛЕНИЕ'}
          </h1>
        </div>

        {/* Tabs */}
        {tab !== 'reset' && (
          <div className="flex glass-card rounded-xl p-1 mb-6">
            {(['login', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setErrors({}); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-body font-medium transition-all ${
                  tab === t ? 'gradient-orange text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t === 'login' ? 'Вход' : 'Регистрация'}
              </button>
            ))}
          </div>
        )}

        <div className="glass-card rounded-2xl p-7">
          {/* LOGIN */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs font-body mb-1.5 block">Email</label>
                <input type="email" value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} placeholder="ivan@example.com" className={inputClass('email')} />
                {errors.email && <p className="text-red-400 text-xs font-body mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-gray-400 text-xs font-body mb-1.5 block">Пароль</label>
                <input type="password" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" className={inputClass('password')} />
                {errors.password && <p className="text-red-400 text-xs font-body mt-1">{errors.password}</p>}
              </div>
              <div className="text-right">
                <button type="button" onClick={() => { setTab('reset'); setErrors({}); }} className="text-orange-400 hover:text-orange-300 text-sm font-body transition-colors">
                  Забыли пароль?
                </button>
              </div>
              <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base">
                <Icon name="LogIn" size={18} /> Войти
              </button>
            </form>
          )}

          {/* REGISTER */}
          {tab === 'register' && (
            <form onSubmit={handleReg} className="space-y-4">
              {[
                { label: 'Имя и фамилия *', field: 'name', type: 'text', placeholder: 'Иван Иванов' },
                { label: 'Email *', field: 'email', type: 'email', placeholder: 'ivan@example.com' },
                { label: 'Телефон', field: 'phone', type: 'tel', placeholder: '+7 (999) 123-45-67' },
                { label: 'Пароль *', field: 'password', type: 'password', placeholder: 'Минимум 6 символов' },
                { label: 'Подтвердите пароль *', field: 'confirm', type: 'password', placeholder: '••••••••' },
              ].map(f => (
                <div key={f.field}>
                  <label className="text-gray-400 text-xs font-body mb-1.5 block">{f.label}</label>
                  <input
                    type={f.type}
                    value={regForm[f.field as keyof typeof regForm]}
                    onChange={e => setRegForm(r => ({ ...r, [f.field]: e.target.value }))}
                    placeholder={f.placeholder}
                    className={inputClass(f.field)}
                  />
                  {errors[f.field] && <p className="text-red-400 text-xs font-body mt-1">{errors[f.field]}</p>}
                </div>
              ))}
              <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base">
                <Icon name="UserPlus" size={18} /> Зарегистрироваться
              </button>
            </form>
          )}

          {/* RESET */}
          {tab === 'reset' && (
            resetSent ? (
              <div className="text-center py-6">
                <Icon name="MailCheck" size={48} className="text-green-400 mx-auto mb-4" fallback="Mail" />
                <h3 className="font-display text-white text-xl font-bold mb-2">Письмо отправлено!</h3>
                <p className="text-gray-400 font-body mb-6">Проверьте почту и следуйте инструкции для сброса пароля</p>
                <button onClick={() => { setTab('login'); setResetSent(false); }} className="text-orange-400 hover:text-orange-300 font-body text-sm">
                  ← Вернуться к входу
                </button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <p className="text-gray-400 font-body text-sm mb-2">Введите email, и мы отправим ссылку для сброса пароля</p>
                <input type="email" required value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="ivan@example.com" className={inputClass('reset')} />
                <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                  <Icon name="Send" size={16} /> Отправить ссылку
                </button>
                <button type="button" onClick={() => setTab('login')} className="w-full text-gray-500 hover:text-white font-body text-sm transition-colors py-2">
                  ← Вернуться к входу
                </button>
              </form>
            )
          )}
        </div>

        <p className="text-gray-600 text-xs font-body text-center mt-6">
          Регистрируясь, вы соглашаетесь с{' '}
          <Link to="/privacy" className="text-orange-400 hover:text-orange-300">политикой конфиденциальности</Link>
        </p>
      </div>
    </div>
  );
}
