import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  UserCheck,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  KeyRound
} from 'lucide-react';

export const CustomerAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    registerWithPassword,
    loginWithPassword,
    loginWithEmail,
    loginWithPhone,
    showToast
  } = useShop();

  // Tabs: 'classic' (Email + Passwort), 'oneclick' (Passwortlos), 'phone' (Mobilnummer)
  const [activeTab, setActiveTab] = useState<'classic' | 'oneclick' | 'phone'>('classic');
  
  // Classic mode: 'login' | 'register'
  const [classicMode, setClassicMode] = useState<'login' | 'register'>('login');
  
  // Classic Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Classic Register form state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // One-Click Email form
  const [oneClickEmail, setOneClickEmail] = useState('');
  const [oneClickName, setOneClickName] = useState('');
  
  // Phone form
  const [phoneCountry, setPhoneCountry] = useState('+49');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneName, setPhoneName] = useState('');

  // Magic code simulation
  const [showCodeStep, setShowCodeStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('8421');

  if (!isAuthModalOpen) return null;

  // Handle Classic Login
  const handleClassicLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginEmail.includes('@')) {
      showToast('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
      return;
    }
    if (!loginPassword) {
      showToast('Bitte geben Sie Ihr Passwort ein.', 'error');
      return;
    }

    const res = loginWithPassword(loginEmail, loginPassword);
    if (res.success) {
      handleClose();
    }
  };

  // Handle Classic Register
  const handleClassicRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFirstName.trim()) {
      showToast('Bitte geben Sie Ihren Vornamen an.', 'error');
      return;
    }
    if (!regEmail || !regEmail.includes('@')) {
      showToast('Bitte geben Sie eine gültige E-Mail-Adresse an.', 'error');
      return;
    }
    if (regPassword.length < 5) {
      showToast('Das Passwort muss mindestens 5 Zeichen lang sein.', 'error');
      return;
    }
    if (regPassword !== regPasswordConfirm) {
      showToast('Die Passwörter stimmen nicht überein.', 'error');
      return;
    }

    const res = registerWithPassword({
      email: regEmail,
      password: regPassword,
      firstName: regFirstName,
      lastName: regLastName
    });

    if (res.success) {
      handleClose();
    }
  };

  // Handle One-Click Email submit
  const handleOneClickEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oneClickEmail || !oneClickEmail.includes('@')) {
      showToast('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
      return;
    }

    // Generate quick 4-digit code and allow 1-click auto-fill
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(code);
    setShowCodeStep(true);
    showToast(`1-Klick Bestätigungscode generiert: ${code}`, 'info');
  };

  const handleInstantOneClickEmailLogin = () => {
    if (!oneClickEmail || !oneClickEmail.includes('@')) {
      showToast('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
      return;
    }
    loginWithEmail(oneClickEmail, oneClickName);
    handleClose();
  };

  const handleVerifyAndLogin = () => {
    if (activeTab === 'oneclick') {
      loginWithEmail(oneClickEmail, oneClickName);
    } else {
      loginWithPhone(`${phoneCountry} ${phoneNumber}`, phoneName);
    }
    handleClose();
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 5) {
      showToast('Bitte geben Sie eine gültige Mobilnummer ein.', 'error');
      return;
    }
    loginWithPhone(`${phoneCountry} ${phoneNumber}`, phoneName);
    handleClose();
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setShowCodeStep(false);
    setVerificationCode('');
  };

  const popularEmailDomains = ['@gmail.com', '@gmx.de', '@web.de', '@outlook.de', '@t-online.de'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in text-stone-900">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Kunden-Login & Registrierung
              </h2>
              <span className="text-[11px] text-stone-500">
                Bestellungen einsehen, Lieferadressen verwalten & Express-Checkout
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector: Klassisch (Passwort) vs. 1-Klick (Passwortlos) vs. Mobilnummer */}
        <div className="p-5">
          <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold mb-4">
            <button
              onClick={() => {
                setActiveTab('classic');
                setShowCodeStep(false);
              }}
              className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-center ${
                activeTab === 'classic'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">Mit Passwort</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('oneclick');
                setShowCodeStep(false);
              }}
              className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-center ${
                activeTab === 'oneclick'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">1-Klick Mail</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('phone');
                setShowCodeStep(false);
              }}
              className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-center ${
                activeTab === 'phone'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">Telefon</span>
            </button>
          </div>

          {/* ============================================================== */}
          {/* TAB 1: KLASSISCH (E-MAIL & PASSWORT)                           */}
          {/* ============================================================== */}
          {activeTab === 'classic' && (
            <div className="space-y-4">
              {/* Sub-Switch: Anmelden vs. Registrieren */}
              <div className="flex border-b border-stone-200 pb-2 gap-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setClassicMode('login')}
                  className={`pb-1 flex items-center gap-1.5 transition-colors ${
                    classicMode === 'login'
                      ? 'text-amber-700 border-b-2 border-amber-600 font-bold'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Ich habe ein Konto (Anmelden)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setClassicMode('register')}
                  className={`pb-1 flex items-center gap-1.5 transition-colors ${
                    classicMode === 'register'
                      ? 'text-amber-700 border-b-2 border-amber-600 font-bold'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Neues Konto registrieren</span>
                </button>
              </div>

              {/* Mode A: Klassischer Login mit E-Mail und Passwort */}
              {classicMode === 'login' && (
                <form onSubmit={handleClassicLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      E-Mail-Adresse
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="ihre.adresse@beispiel.de"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-stone-700">
                        Passwort
                      </label>
                      <button
                        type="button"
                        onClick={() => showToast('Tipp: Bei vergessenem Passwort können Sie sich jederzeit per 1-Klick Mail einloggen.', 'info')}
                        className="text-[10px] text-amber-700 hover:underline"
                      >
                        Passwort vergessen?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        placeholder="Ihr Passwort"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-10 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                        title={showLoginPassword ? 'Verbergen' : 'Anzeigen'}
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm flex items-center justify-center gap-2 group"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Mit Passwort anmelden</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setClassicMode('register')}
                      className="text-[11px] text-stone-600 hover:text-amber-700 hover:underline"
                    >
                      Noch kein Kundenkonto? <strong>Hier in 30 Sekunden registrieren</strong>
                    </button>
                  </div>
                </form>
              )}

              {/* Mode B: Registrierung mit Vorname, Nachname, E-Mail & eigenem Passwort */}
              {classicMode === 'register' && (
                <form onSubmit={handleClassicRegister} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        placeholder="z.B. Anna"
                        value={regFirstName}
                        onChange={(e) => setRegFirstName(e.target.value)}
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nachname
                      </label>
                      <input
                        type="text"
                        placeholder="z.B. Schmidt"
                        value={regLastName}
                        onChange={(e) => setRegLastName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      E-Mail-Adresse * <span className="text-stone-400 font-normal">(alle Anbieter: Gmail, GMX, Web.de, Outlook etc.)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="ihre.adresse@anbieter.de"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Passwort wählen *
                      </label>
                      <div className="relative">
                        <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          placeholder="Mind. 5 Zeichen"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          required
                          minLength={5}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-8 pr-7 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                        >
                          {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Passwort wiederholen *
                      </label>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        placeholder="Wiederholen"
                        value={regPasswordConfirm}
                        onChange={(e) => setRegPasswordConfirm(e.target.value)}
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition-colors shadow-sm flex items-center justify-center gap-2 group"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Kundenkonto jetzt registrieren & einloggen</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setClassicMode('login')}
                      className="text-[11px] text-stone-600 hover:text-amber-700 hover:underline"
                    >
                      Sie haben bereits ein Konto? <strong>Hier anmelden</strong>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: 1-KLICK / PASSWORTLOS PER E-MAIL                        */}
          {/* ============================================================== */}
          {activeTab === 'oneclick' && (
            <>
              {showCodeStep ? (
                <div className="space-y-4 py-2">
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-amber-700" />
                      <span>Sicherheitscode für: {oneClickEmail}</span>
                    </div>
                    <p className="text-[11px] text-amber-800">
                      Ihr 1-Klick Bestätigungscode lautet: <strong className="font-mono text-sm tracking-wider font-bold text-stone-900">{generatedCode}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Bestätigungscode eingeben
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder={generatedCode}
                        maxLength={6}
                        className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-center text-lg font-mono tracking-widest text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setVerificationCode(generatedCode)}
                        className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg border border-stone-300"
                      >
                        Auto-Ausfüllen
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={handleVerifyAndLogin}
                      className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Anmeldung bestätigen & einloggen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCodeStep(false)}
                      className="w-full py-1 text-stone-500 hover:text-stone-900 text-[11px]"
                    >
                      Zurück zur Eingabe
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleOneClickEmailSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ihre E-Mail-Adresse <span className="text-stone-400 font-normal">(alle Anbieter: Gmail, GMX, Web.de etc.)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="ihre.adresse@anbieter.de"
                        value={oneClickEmail}
                        onChange={(e) => setOneClickEmail(e.target.value)}
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Quick Domain Tap Chips */}
                  <div>
                    <span className="block text-[10px] text-stone-400 mb-1">Schnellauswahl Domain:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {popularEmailDomains.map((domain) => (
                        <button
                          key={domain}
                          type="button"
                          onClick={() => {
                            const prefix = oneClickEmail.includes('@') ? oneClickEmail.split('@')[0] : oneClickEmail;
                            setOneClickEmail(`${prefix || 'kunde'}${domain}`);
                          }}
                          className="px-2 py-0.5 rounded text-[10px] bg-stone-100 hover:bg-amber-50 hover:text-amber-800 text-stone-600 border border-stone-200 transition-colors"
                        >
                          {domain}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ihr Name <span className="text-stone-400 font-normal">(optional für Begrüßung)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="z.B. Anna Schmidt"
                      value={oneClickName}
                      onChange={(e) => setOneClickName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-xs"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleInstantOneClickEmailLogin}
                      className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm flex items-center justify-center gap-2 group"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>1-Klick Sofort-Anmeldung (Passwortlos)</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* ============================================================== */}
          {/* TAB 3: PER TELEFONNUMMER                                       */}
          {/* ============================================================== */}
          {activeTab === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ihre Mobilfunk- / Telefonnummer
                </label>
                <div className="flex gap-2">
                  <select
                    value={phoneCountry}
                    onChange={(e) => setPhoneCountry(e.target.value)}
                    className="w-28 bg-stone-50 border border-stone-300 rounded-lg px-2 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-xs cursor-pointer font-medium"
                  >
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+43">🇦🇹 +43</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇺🇸 +1</option>
                  </select>
                  <div className="relative flex-1">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="170 1234567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ihr Name <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="z.B. Anna Schmidt"
                  value={phoneName}
                  onChange={(e) => setPhoneName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>1-Klick Telefon-Anmeldung</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}

          {/* Security & GDPR Info */}
          <div className="mt-5 pt-4 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% DSGVO-Konform
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              Sicher & Verschlüsselt
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
