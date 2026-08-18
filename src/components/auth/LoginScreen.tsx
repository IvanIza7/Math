import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import loginImg from '../../assets/login-image.jpg';
import registerImg from '../../assets/register-image.jpg';

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
      // Dummy email for Supabase Auth
      const dummyEmail = `mathapp.dummy.${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
      // Supabase requires 6 chars minimum password. We append 'xy' to the 4-digit pin.
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

  // Helper to render PIN boxes
  const renderPinBoxes = (currentPin: string, isFocused: boolean) => {
    const activeIndex = currentPin.length < 4 ? currentPin.length : 3;
    
    return (
      <div className="flex gap-[29px]">
        {[0, 1, 2, 3].map((index) => {
          const isActive = isFocused && index === activeIndex;
          return (
            <div
              key={index}
              className={`w-[67px] h-[60px] bg-[#f8faf9] border-2 rounded-[15px] flex items-center justify-center transition-colors ${
                isActive ? 'border-[#f5c518]' : 'border-[#000]'
              }`}
            >
              <AnimatePresence>
                {currentPin[index] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 700, damping: 22 }}
                    className="w-[14px] h-[14px] bg-[#000] rounded-full"
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
    <div className="min-h-screen bg-[#f8faf9] flex justify-center overflow-hidden font-poppins text-[#000]">
      <div className="w-full max-w-[402px] bg-[#f8faf9] flex flex-col relative">
        
        {/* Top Image Section */}
        <div className="h-[312px] w-full flex items-center justify-center relative shrink-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={isLogin ? 'login-img' : 'register-img'}
              src={isLogin ? loginImg : registerImg}
              alt="Ilustración"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full h-full object-contain p-2"
            />
          </AnimatePresence>
        </div>

        {/* Form Card Section */}
        <div className="h-[562px] w-full bg-[rgba(121,229,91,0.85)] rounded-t-[50px] border-t-2 border-x-2 border-b-2 sm:border-b-0 border-[#000] relative overflow-hidden shrink-0 shadow-2xl">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ x: isLogin ? -402 : 402, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isLogin ? 402 : -402, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute inset-0"
            >
              <form onSubmit={handleSubmit} className="w-full h-full relative">
                
                {/* Username */}
                <label className="absolute top-[13px] left-[21px] font-semibold text-[32px] leading-normal">
                  Usuario
                </label>
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                  className={`absolute top-[78px] left-[21px] w-[355px] h-[60px] bg-[#f8faf9] border-2 rounded-[15px] px-[10px] font-poppins text-[20px] font-normal text-[#000] placeholder:text-[rgba(0,0,0,0.21)] outline-none transition-colors ${
                    isUsernameFocused ? 'border-[#f5c518]' : 'border-[#000]'
                  }`}
                  disabled={isLoading}
                />

                {/* PIN */}
                <label className="absolute top-[138px] left-[21px] font-semibold text-[32px] leading-normal">
                  PIN
                </label>
                <div 
                  className="absolute top-[198px] left-[21px] w-[355px] h-[60px] cursor-text"
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

                {/* Confirm PIN (Only in Register) */}
                {!isLogin && (
                  <>
                    <label className="absolute top-[258px] left-[23px] font-semibold text-[32px] leading-normal">
                      Confirmar PIN
                    </label>
                    <div 
                      className="absolute top-[318px] left-[21px] w-[355px] h-[60px] cursor-text"
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
                  </>
                )}

                {/* Error Message */}
                {error && (
                  <div className="absolute top-[300px] left-[21px] w-[355px] bg-red-100 border-2 border-red-500 text-red-700 text-sm p-2 rounded-lg flex items-center gap-2 z-20">
                    <AlertCircle size={16} />
                    <span className="font-nunito font-bold leading-tight">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isLoading}
                  className={`absolute ${isLogin ? 'top-[337px]' : 'top-[406px]'} left-[23px] w-[355px] h-[60px] bg-[#f5c518] border-2 border-[#000] rounded-[50px] font-poppins text-[20px] font-normal tracking-[0.6px] text-[#000] flex items-center justify-center outline-none`}
                >
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : (isLogin ? 'Entrar' : 'Registrarse')}
                </motion.button>

                {/* Footer Navigation */}
                <div className="absolute top-[470px] left-[28px] w-full flex items-center gap-[6px]">
                  <span className="font-nunito font-normal text-[20px] leading-[19.5px] text-[#000]">
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
                    className="font-nunito font-bold text-[20px] leading-[19.5px] text-[#000] hover:underline outline-none"
                  >
                    {isLogin ? 'Regístrate aquí.' : 'Inicia Sesión aquí.'}
                  </button>
                </div>

              </form>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
