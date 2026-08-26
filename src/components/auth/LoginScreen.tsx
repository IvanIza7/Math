import React, { useState, useRef } from 'react';
import { supabase } from '../../config/supabase';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPinFocused, setIsPinFocused] = useState(false);
  const [isConfirmPinFocused, setIsConfirmPinFocused] = useState(false);

  const pinInputRef = useRef<HTMLInputElement>(null);
  const confirmPinInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Por favor, ingresa un nombre de usuario.');
      return;
    }

    if (pin.length < 4) {
      setError('El PIN debe tener 4 dígitos.');
      return;
    }

    if (!isLogin && pin !== confirmPin) {
      setError('Los PINs no coinciden.');
      return;
    }

    setIsLoading(true);

    try {
      const dummyEmail = `mathapp.dummy.${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
      const supabasePassword = `${pin}xy`;

      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: dummyEmail,
          password: supabasePassword,
        });

        if (signInError) {
          throw new Error('Usuario o PIN incorrectos');
        }
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: dummyEmail,
          password: supabasePassword,
          options: {
            data: { username: username }
          }
        });

        if (signUpError) {
          if (signUpError.message.includes('User already registered')) {
            throw new Error('Ese usuario ya existe. Intenta iniciar sesión.');
          }
          throw signUpError;
        }
      }

      onLoginSuccess();
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      setError(err.message || 'Ocurrió un error al procesar tu solicitud.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const val = e.target.value;
    if (val === '' || /^[0-9]+$/.test(val)) {
      setter(val);
    }
  };

  const renderPinBoxes = (currentPin: string, isFocused: boolean) => {
    const activeIndex = currentPin.length < 4 ? currentPin.length : 3;
    
    return (
      <div className="flex gap-3 sm:gap-5 justify-between sm:justify-start w-full">
        {[0, 1, 2, 3].map((index) => {
          const isActive = isFocused && index === activeIndex;
          return (
            <div
              key={index}
              className={`w-full max-w-[67px] h-14 sm:h-[60px] bg-[#f8faf9] border-2 rounded-[15px] flex items-center justify-center transition-all duration-200 ${
                isActive 
                  ? 'border-[#f5c518] translate-y-1 translate-x-1 shadow-none' 
                  : 'border-[#000] shadow-[4px_4px_0px_0px_#000]'
              }`}
            >
              <AnimatePresence>
                {currentPin[index] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 700, damping: 22 }}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#000] rounded-full"
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden font-poppins text-[#000] p-4 bg-auth-wallpaper">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[402px] bg-[#79E55B] rounded-[40px] sm:rounded-[50px] border-4 border-[#000] relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-[560px] sm:h-[620px]"
      >
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col px-7 py-8 sm:px-10 sm:py-10"
            >
              <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-4 sm:gap-6 justify-between">
                
                {/* Header Text */}
                <div className="text-center space-y-1 mb-1 sm:mb-2">
                  <h1 className="text-2xl sm:text-[28px] font-black uppercase tracking-tight text-[#000]">
                    {isLogin ? '¡Hola de nuevo!' : 'Crea tu Cuenta'}
                  </h1>
                  <p className="text-xs sm:text-sm font-bold text-[#000]/70 leading-tight">
                    {isLogin 
                      ? 'Ingresa tu PIN para continuar practicando.' 
                      : 'Únete para dominar las matemáticas sin adivinar.'}
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* Username */}
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label className="font-bold text-sm sm:text-base uppercase tracking-widest ml-1 text-[#000]/80">
                      Usuario
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setIsUsernameFocused(true)}
                      onBlur={() => setIsUsernameFocused(false)}
                      className={`w-full h-14 sm:h-[60px] bg-[#f8faf9] border-2 rounded-[15px] px-4 sm:px-5 font-poppins text-lg sm:text-[20px] font-medium text-[#000] placeholder:text-[rgba(0,0,0,0.25)] outline-none transition-all duration-200 ${
                        isUsernameFocused 
                          ? 'border-[#f5c518] translate-y-1 translate-x-1 shadow-none' 
                          : 'border-[#000] shadow-[4px_4px_0px_0px_#000]'
                      }`}
                      disabled={isLoading}
                    />
                  </div>

                  {/* PIN */}
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label className="font-bold text-sm sm:text-base uppercase tracking-widest ml-1 text-[#000]/80">
                      PIN
                    </label>
                    <div 
                      className="w-full relative cursor-text"
                      onClick={() => pinInputRef.current?.focus()}
                    >
                      {renderPinBoxes(pin, isPinFocused)}
                      <input
                        ref={pinInputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => handlePinChange(e, setPin)}
                        onFocus={() => setIsPinFocused(true)}
                        onBlur={() => setIsPinFocused(false)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Confirm PIN (Only in Register) */}
                  {!isLogin && (
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="font-bold text-sm sm:text-base uppercase tracking-widest ml-1 text-[#000]/80">
                        Confirmar PIN
                      </label>
                      <div 
                        className="w-full relative cursor-text"
                        onClick={() => confirmPinInputRef.current?.focus()}
                      >
                        {renderPinBoxes(confirmPin, isConfirmPinFocused)}
                        <input
                          ref={confirmPinInputRef}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={4}
                          value={confirmPin}
                          onChange={(e) => handlePinChange(e, setConfirmPin)}
                          onFocus={() => setIsConfirmPinFocused(true)}
                          onBlur={() => setIsConfirmPinFocused(false)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full bg-red-100 border-2 border-red-500 text-red-700 text-sm font-bold px-4 py-3 rounded-[12px] flex items-center gap-2 shadow-[2px_2px_0px_0px_#ef4444]"
                    >
                      <AlertCircle size={18} className="shrink-0" />
                      <span className="font-nunito leading-tight">{error}</span>
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-col gap-5 mt-4 sm:mt-6">
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full h-[56px] sm:h-[60px] bg-[#f5c518] hover:bg-[#ffe366] border-2 border-[#000] rounded-[50px] font-poppins text-lg sm:text-[20px] font-bold tracking-[1px] text-[#000] flex items-center justify-center outline-none shrink-0 transition-all duration-150 shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:translate-x-1 active:shadow-none`}
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={24} /> : (isLogin ? 'ENTRAR' : 'REGISTRARSE')}
                  </button>

                  {/* Footer Navigation */}
                  <div className="w-full flex items-center gap-[6px] justify-center">
                    <span className="font-nunito font-normal text-base sm:text-[18px] text-[#000]">
                      {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                        setUsername('');
                        setPin('');
                        setConfirmPin('');
                      }}
                      disabled={isLoading}
                      className="font-nunito font-bold text-base sm:text-[18px] text-[#000] hover:text-white transition-colors outline-none cursor-pointer"
                    >
                      {isLogin ? 'Regístrate aquí' : 'Inicia Sesión aquí'}
                    </button>
                  </div>
                </div>

              </form>
            </motion.div>
          </AnimatePresence>
      </motion.div>
    </div>
  );
}
