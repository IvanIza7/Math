import React from 'react';
import { MathView } from '../../utils/math';
import { Sparkles, Calculator, BookOpen, AlertTriangle, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useMagicFormulas } from '../../hooks/useMagicFormulas';

export const FormulaViewModule: React.FC = () => {
  const { magicFormulas, toggleFormula } = useMagicFormulas();

  const renderMagicButton = (id: string) => {
    console.log("Rendering FormulaViewModule");
    const isMagic = magicFormulas.includes(id);
    return (
      <button
        onClick={() => toggleFormula(id)}
        className={`ml-auto p-2 rounded-full border-2 transition-all active:scale-90 ${
          isMagic 
            ? 'bg-[#BAFF29] border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] text-[#1E1E24]' 
            : 'bg-transparent border-transparent hover:bg-white/20 text-white opacity-70 hover:opacity-100'
        }`}
        title={isMagic ? "Quitar de Fórmulas Rápidas" : "Añadir a Fórmulas Rápidas"}
      >
        <Wand2 className={`w-4 h-4 ${isMagic ? 'fill-current stroke-2' : 'stroke-2'}`} />
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] pb-32">
      {/* Header */}
      <div className="bg-[#BAFF29] px-6 pt-12 pb-8 border-b-4 border-[#1E1E24] sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Sparkles className="w-8 h-8 text-[#1E1E24] fill-current" />
          <div>
            <h1 className="font-black text-2xl text-[#1E1E24] uppercase tracking-tight">
              Formulario Total
            </h1>
            <p className="font-bold text-[#1E1E24]/70 text-sm">
              Toca la varita para armar tu FAB rápido
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6 mt-4">
        
        {/* SECCIÓN 1: PROPIEDADES */}
        <section className="bg-white rounded-3xl border-4 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
          <div className="bg-[#1E1E24] text-white p-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <h2 className="font-black text-lg">1. Propiedades Fundamentales</h2>
            {renderMagicButton('propiedades')}
          </div>
          
          <div className="p-5 space-y-5">
            <div>
              <h3 className="font-black text-[#1E1E24] mb-2 text-base border-b-2 border-gray-100 pb-1">Conmutativa</h3>
              <div className="pl-4 space-y-2 border-l-4 border-[#BAFF29]">
                <p className="text-sm font-bold text-gray-700">El orden no altera el resultado.</p>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xs uppercase text-gray-500">Adición:</span>
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">
                    <MathView latex="a+b=b+a" inline /> <span className="text-gray-400 mx-2">|</span> <MathView latex="4+9=13" inline />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xs uppercase text-gray-500">Multiplicación:</span>
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">
                    <MathView latex="a \cdot b=b \cdot a" inline /> <span className="text-gray-400 mx-2">|</span> <MathView latex="5 \cdot 7=35" inline />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-black text-[#1E1E24] mb-2 text-base border-b-2 border-gray-100 pb-1">Asociativa</h3>
              <div className="pl-4 space-y-2 border-l-4 border-[#38BDF8]">
                <p className="text-sm font-bold text-gray-700">La agrupación no cambia el total.</p>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xs uppercase text-gray-500">Adición:</span>
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">
                    <MathView latex="(a+b)+c=a+(b+c)" inline /> <span className="text-gray-400 mx-2">|</span> <MathView latex="(2+3)+4=9" inline />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xs uppercase text-gray-500">Multiplicación:</span>
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">
                    <MathView latex="(ab)c=a(bc)" inline /> <span className="text-gray-400 mx-2">|</span> <MathView latex="(2 \cdot 3)4=24" inline />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-black text-[#1E1E24] mb-2 text-base border-b-2 border-gray-100 pb-1">Distributiva</h3>
              <div className="pl-4 space-y-2 border-l-4 border-[#F472B6]">
                <p className="text-sm font-bold text-gray-700">El factor reparte a cada término.</p>
                <div className="bg-gray-50 p-2 rounded border border-gray-200">
                  <MathView latex="a(b+c)=ab+ac" inline /> <span className="text-gray-400 mx-2">|</span> <MathView latex="3(2x+5)=6x+15" inline />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: LEYES DE SIGNOS */}
        <section className="bg-white rounded-3xl border-4 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
          <div className="bg-[#1E1E24] text-white p-4 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            <h2 className="font-black text-lg">2. Leyes de los Signos</h2>
            {renderMagicButton('signos')}
          </div>
          <div className="p-5 space-y-5">
            <div>
              <h3 className="font-black text-[#1E1E24] mb-2 text-base border-b-2 border-gray-100 pb-1">Suma y Resta</h3>
              <div className="pl-4 space-y-2 border-l-4 border-red-400">
                <p className="text-sm font-bold text-gray-700">Mismo signo se suman, distinto signo se restan y gana el mayor.</p>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 text-sm font-bold">
                  <MathView latex="-4-6=-10" inline /> <span className="text-gray-400 mx-2">|</span> <MathView latex="-9+4=-5" inline />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-black text-[#1E1E24] mb-2 text-base border-b-2 border-gray-100 pb-1">Multiplicación y División</h3>
              <div className="pl-4 space-y-2 border-l-4 border-blue-400">
                <p className="text-sm font-bold text-gray-700">Signos iguales dan (+). Signos distintos dan (-).</p>
                <div className="grid grid-cols-2 gap-2 text-sm font-bold text-center">
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">(+) × (+) = (+)</div>
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">(-) × (-) = (+)</div>
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">(+) × (-) = (-)</div>
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">(-) × (+) = (-)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: JERARQUÍA */}
        <section className="bg-white rounded-3xl border-4 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
          <div className="bg-[#1E1E24] text-white p-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#FDE047]" />
            <h2 className="font-black text-lg">3. Jerarquía de Operaciones</h2>
            {renderMagicButton('jerarquia')}
          </div>
          <div className="p-5">
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-gray-50 p-3 border border-gray-200 rounded-xl">
                <div className="w-8 h-8 bg-[#1E1E24] text-white flex items-center justify-center font-black rounded-lg">1</div>
                <p className="font-bold flex-1">Paréntesis y Corchetes</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 border border-gray-200 rounded-xl">
                <div className="w-8 h-8 bg-[#1E1E24] text-white flex items-center justify-center font-black rounded-lg">2</div>
                <p className="font-bold flex-1">Exponentes y Raíces</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 border border-gray-200 rounded-xl">
                <div className="w-8 h-8 bg-[#1E1E24] text-white flex items-center justify-center font-black rounded-lg">3</div>
                <p className="font-bold flex-1">Multiplicación y División (Izq a Der)</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 border border-gray-200 rounded-xl">
                <div className="w-8 h-8 bg-[#1E1E24] text-white flex items-center justify-center font-black rounded-lg">4</div>
                <p className="font-bold flex-1">Suma y Resta (Izq a Der)</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: EXPONENTES */}
        <section className="bg-white rounded-3xl border-4 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
          <div className="bg-[#1E1E24] text-white p-4 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            <h2 className="font-black text-lg">4. Leyes de Exponentes</h2>
            {renderMagicButton('exponentes')}
          </div>
          <div className="p-5 space-y-3">
            <div className="pl-4 space-y-3 border-l-4 border-purple-400">
              <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between items-center text-sm font-bold">
                <span>Producto:</span> <MathView latex="x^a \cdot x^b = x^{a+b}" inline />
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between items-center text-sm font-bold">
                <span>Cociente:</span> <MathView latex="\dfrac{x^a}{x^b} = x^{a-b}" inline />
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between items-center text-sm font-bold">
                <span>Potencia:</span> <MathView latex="(x^a)^b = x^{ab}" inline />
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between items-center text-sm font-bold">
                <span>Negativo:</span> <MathView latex="x^{-n} = \dfrac{1}{x^n}" inline />
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 5: PRODUCTOS NOTABLES */}
        <section className="bg-white rounded-3xl border-4 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
          <div className="bg-[#1E1E24] text-white p-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <h2 className="font-black text-lg">5. Productos Notables</h2>
            {renderMagicButton('factorizacion')}
          </div>
          <div className="p-5 space-y-3">
            <div className="pl-4 space-y-3 border-l-4 border-green-400">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-xs uppercase text-gray-500">Binomio al Cuadrado:</span>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 text-sm font-bold">
                  <MathView latex="(a \pm b)^2 = a^2 \pm 2ab + b^2" />
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="font-bold text-xs uppercase text-gray-500">Diferencia de Cuadrados:</span>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 text-sm font-bold">
                  <MathView latex="(a+b)(a-b) = a^2 - b^2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 6: FÓRMULA CUADRÁTICA */}
        <section className="bg-white rounded-3xl border-4 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
          <div className="bg-[#1E1E24] text-white p-4 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            <h2 className="font-black text-lg">6. Fórmula Cuadrática</h2>
            {renderMagicButton('cuadratica')}
          </div>
          <div className="p-5 space-y-3">
            <div className="pl-4 space-y-3 border-l-4 border-orange-400">
              <div className="bg-[#FFF9E6] p-3 rounded-xl border border-orange-200 flex justify-center">
                <MathView latex="x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
              </div>
              <p className="text-xs font-bold text-gray-600 mt-2">Discriminante <MathView latex="\Delta = b^2 - 4ac" inline />: Si es positivo, 2 soluciones. Si es cero, 1 solución. Si es negativo, soluciones complejas.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 7: TRIGONOMETRÍA */}
        <section className="bg-white rounded-3xl border-4 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
          <div className="bg-[#1E1E24] text-white p-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#FDE047]" />
            <h2 className="font-black text-lg">7. Trigonometría</h2>
            {renderMagicButton('trig')}
          </div>
          <div className="p-5 space-y-3">
            <div className="pl-4 space-y-3 border-l-4 border-indigo-400">
              <p className="text-sm font-bold text-gray-700">Teorema de Pitágoras: <MathView latex="c^2 = a^2 + b^2" inline /></p>
              <div className="grid grid-cols-1 gap-2 mt-2">
                <div className="bg-gray-50 p-2 rounded border border-gray-200 flex items-center justify-between font-bold text-sm">
                  <span>Sen (Op/Hip):</span> <MathView latex="\sin\theta = \dfrac{\text{Op}}{\text{Hip}}" inline />
                </div>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 flex items-center justify-between font-bold text-sm">
                  <span>Cos (Ady/Hip):</span> <MathView latex="\cos\theta = \dfrac{\text{Ady}}{\text{Hip}}" inline />
                </div>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 flex items-center justify-between font-bold text-sm">
                  <span>Tan (Op/Ady):</span> <MathView latex="\tan\theta = \dfrac{\text{Op}}{\text{Ady}}" inline />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
