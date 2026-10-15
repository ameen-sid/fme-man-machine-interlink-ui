import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lock, X, CreditCard, ShieldCheck } from 'lucide-react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [activeSession, setActiveSession] = useState(() => {
    try {
      const saved = sessionStorage.getItem('fme_operator_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    pendingMachine: null,
    onSuccess: null
  });

  const [operatorCardNo, setOperatorCardNo] = useState('');
  const [inspectorCardNo, setInspectorCardNo] = useState('');
  const [loginError, setLoginError] = useState('');

  const login = (opCard, qiCard) => {
    const session = {
      operatorCardNo: opCard.trim(),
      inspectorCardNo: qiCard.trim()
    };
    setActiveSession(session);
    try {
      sessionStorage.setItem('fme_operator_session', JSON.stringify(session));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setActiveSession(null);
    try {
      sessionStorage.removeItem('fme_operator_session');
    } catch {
      // ignore
    }
  };

  const requestAuth = (machine, onSuccess) => {
    if (activeSession) {
      if (onSuccess) onSuccess(activeSession);
      return;
    }
    setOperatorCardNo('');
    setInspectorCardNo('');
    setLoginError('');
    setAuthModalState({
      isOpen: true,
      pendingMachine: machine,
      onSuccess
    });
  };

  const closeAuthModal = () => {
    setAuthModalState({
      isOpen: false,
      pendingMachine: null,
      onSuccess: null
    });
    setLoginError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!operatorCardNo.trim()) {
      setLoginError('Please enter the Operator Card No.');
      return;
    }
    if (!inspectorCardNo.trim()) {
      setLoginError('Please enter the Quality Inspector Card No.');
      return;
    }

    login(operatorCardNo, inspectorCardNo);

    if (authModalState.onSuccess) {
      authModalState.onSuccess({
        operatorCardNo: operatorCardNo.trim(),
        inspectorCardNo: inspectorCardNo.trim()
      });
    }

    closeAuthModal();
  };

  return (
    <AuthContext.Provider
      value={{
        activeSession,
        login,
        logout,
        requestAuth
      }}
    >
      {children}

      {/* Operator & Quality Inspector Login Modal */}
      {authModalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-[460px] w-full shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 m-0">Operator & Inspector Login</h3>
                  <p className="text-xs text-slate-500 m-0">
                    Authenticate for <strong>{authModalState.pendingMachine?.name || 'Machine'}</strong>
                  </p>
                </div>
              </div>
              <button
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg border-none bg-transparent cursor-pointer"
                onClick={closeAuthModal}
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 mt-4">
              {loginError && (
                <div className="bg-red-50 text-red-700 border border-red-200 p-2.5 rounded-xl text-xs font-semibold">
                  {loginError}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <CreditCard size={15} className="text-indigo-600" />
                  <span>Operator Card No.</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-xl p-2.5 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                  placeholder="e.g. OP-84210 or Scan Card"
                  value={operatorCardNo}
                  onChange={(e) => setOperatorCardNo(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <ShieldCheck size={15} className="text-indigo-600" />
                  <span>Quality Inspector Card No.</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-xl p-2.5 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                  placeholder="e.g. QI-39145 or Scan Card"
                  value={inspectorCardNo}
                  onChange={(e) => setInspectorCardNo(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  className="text-xs font-bold py-2 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer transition-all"
                  onClick={closeAuthModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold py-2 px-5 rounded-xl border-none bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer shadow-sm transition-all inline-flex items-center gap-1.5"
                >
                  <Lock size={15} />
                  <span>Authenticate & Proceed</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
