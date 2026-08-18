import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { Lock, User, KeyRound, Loader2, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePinChange = (index: number, value: string) => {
    // Solo permitir números
    if (value && !/^\d+$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Mover al siguiente input automáticamente
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // Mover al input anterior si está vacío y se presiona Backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Por favor, ingresa un nombre de usuario.');
      return;
    }

    const fullPin = pin.join('');
    if (fullPin.length < 6) {
      setError('El PIN debe tener 6 dígitos.');
      return;
    }

    setIsLoading(true);

    try {
      // Usamos un dominio falso de gmail para evitar cualquier bloqueo de dominios por parte de Supabase
      const dummyEmail = `mathapp.dummy.${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;

      if (isLogin) {
        // Inicio de sesión
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: dummyEmail,
          password: fullPin, // Usamos el PIN como contraseña
        });

        if (signInError) {
          throw new Error('Usuario o PIN incorrectos');
        }
      } else {
        // Registro
        const { error: signUpError } = await supabase.auth.signUp({
          email: dummyEmail,
          password: fullPin,
          options: {
            data: {
              username: username,
            }
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

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-6 relative">
      <div className="w-full max-w-sm space-y-8 animate-fade-in">
        
        {/* Ilustración */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center border-4 border-[#F2F3F7]">
            <div className="absolute top-0 right-0 text-yellow-400 animate-pulse">★</div>
            <div className="absolute bottom-4 left-0 text-purple-400">✧</div>
            <Lock size={64} className="text-yellow-500 absolute right-8" strokeWidth={1.5} />
            <User size={80} className="text-gray-700 absolute left-8 bottom-4" strokeWidth={1} />
            <KeyRound size={40} className="text-purple-400 absolute bottom-12" strokeWidth={1.5} />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold font-poppins text-gray-800">
            {isLogin ? '¡Hola de nuevo!' : 'Crea tu cuenta'}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin ? 'Ingresa para continuar entrenando' : 'Empieza tu camino anti-adivinanza'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Usuario */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-800">Usuario</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#EFEFFF] border-2 border-transparent focus:border-purple-300 rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400 transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Input PIN */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-800">PIN</label>
            <div className="flex justify-between gap-2">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 bg-[#EFEFFF] border-2 border-transparent focus:border-purple-300 rounded-xl text-center text-xl font-bold text-gray-800 outline-none transition-colors"
                  disabled={isLoading}
                />
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">Hasta 6 dígitos</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Botón Entrar */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FFDF4F] hover:bg-[#F2D030] text-gray-900 font-bold py-4 rounded-full transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : null}
            <span>{isLogin ? 'Entrar' : 'Registrarse'}</span>
          </button>

          {/* Alternar modo */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setUsername('');
                setPin(['', '', '', '', '', '']);
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
              disabled={isLoading}
            >
              {isLogin ? (
                <>No tienes cuenta? <span className="font-bold underline">Regístrate aquí.</span></>
              ) : (
                <>¿Ya tienes cuenta? <span className="font-bold underline">Inicia sesión.</span></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
