import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Settings2, Play, AlertTriangle, History, Pencil, BarChart2 } from 'lucide-react';
import { PracticePreset } from '../types';
import { playSound } from '../utils/sound';
import { PracticeHistoryModal } from './PracticeHistoryModal';

interface PracticeSetupProps {
  onStartQuiz: (preset: PracticePreset) => void;
  onOpenHistory?: (preset: PracticePreset) => void;
}

export const PracticeSetup: React.FC<PracticeSetupProps> = ({ onStartQuiz, onOpenHistory }) => {
  const [presets, setPresets] = useState<PracticePreset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [presetToDelete, setPresetToDelete] = useState<string | null>(null);
  const [presetToViewHistory, setPresetToViewHistory] = useState<PracticePreset | null>(null);
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);

  // New Preset Form State
  const [name, setName] = useState('Mi Práctica');
  const [digits, setDigits] = useState(2);
  const [rows, setRows] = useState(2);
  const [allowSubtraction, setAllowSubtraction] = useState(false);
  const [inputDirection, setInputDirection] = useState<'left_to_right' | 'right_to_left'>('right_to_left');
  const [numQuestions, setNumQuestions] = useState(10);

  useEffect(() => {
    fetchPresets();
  }, []);

  const fetchPresets = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('practice_presets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase practice_presets table might not exist yet. Falling back to local storage.', error.message);
        loadLocalFallback();
      } else if (data) {
        setPresets(data.map(d => ({
          id: d.id,
          name: d.name,
          minDigits: d.min_digits,
          maxDigits: d.max_digits,
          minRows: d.min_rows,
          maxRows: d.max_rows,
          allowSubtraction: d.allow_subtraction,
          inputDirection: d.input_direction,
          numQuestions: d.num_questions
        })));
      }
    } catch (e) {
      loadLocalFallback();
    } finally {
      setIsLoading(false);
    }
  };

  const loadLocalFallback = () => {
    try {
      const saved = localStorage.getItem('local_practice_presets');
      if (saved) setPresets(JSON.parse(saved));
    } catch (e) {}
  };

  const saveLocalFallback = (newPresets: PracticePreset[]) => {
    localStorage.setItem('local_practice_presets', JSON.stringify(newPresets));
  };

  
  const handleEdit = (preset: PracticePreset) => {
    playSound('click');
    setEditingPresetId(preset.id);
    setName(preset.name);
    setDigits(preset.maxDigits);
    setRows(preset.maxRows);
    setAllowSubtraction(preset.allowSubtraction);
    setInputDirection(preset.inputDirection);
    setNumQuestions(preset.numQuestions);
    setIsCreating(true);
  };

  const handleCreatePreset = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    
    const newPreset: Omit<PracticePreset, 'id'> = {
      name,
      minDigits: digits,
      maxDigits: digits,
      minRows: rows,
      maxRows: rows,
      allowSubtraction,
      inputDirection,
      numQuestions
    };

    try {
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        let savedData;
        
        if (editingPresetId) {
          const { data, error } = await supabase
            .from('practice_presets')
            .update({
              name: newPreset.name,
              min_digits: newPreset.minDigits,
              max_digits: newPreset.maxDigits,
              min_rows: newPreset.minRows,
              max_rows: newPreset.maxRows,
              allow_subtraction: newPreset.allowSubtraction,
              input_direction: newPreset.inputDirection,
              num_questions: newPreset.numQuestions
            })
            .eq('id', editingPresetId)
            .select()
            .single();
            
          if (error) throw error;
          savedData = data;
        } else {
          const { data, error } = await supabase
            .from('practice_presets')
            .insert({
              user_id: user.user.id,
              name: newPreset.name,
              min_digits: newPreset.minDigits,
              max_digits: newPreset.maxDigits,
              min_rows: newPreset.minRows,
              max_rows: newPreset.maxRows,
              allow_subtraction: newPreset.allowSubtraction,
              input_direction: newPreset.inputDirection,
              num_questions: newPreset.numQuestions
            })
            .select()
            .single();
            
          if (error) throw error;
          savedData = data;
        }

        const savedPreset: PracticePreset = {
          id: savedData.id,
          name: savedData.name,
          minDigits: savedData.min_digits,
          maxDigits: savedData.max_digits,
          minRows: savedData.min_rows,
          maxRows: savedData.max_rows,
          allowSubtraction: savedData.allow_subtraction,
          inputDirection: savedData.input_direction,
          numQuestions: savedData.num_questions
        };

        if (editingPresetId) {
          setPresets(presets.map(p => p.id === editingPresetId ? savedPreset : p));
        } else {
          setPresets([savedPreset, ...presets]);
        }
      } else {
        throw new Error('Not logged in');
      }
    } catch (e) {
      console.warn('Failed to save to Supabase, using local storage.', e);
      if (editingPresetId) {
        const updatedPreset = { ...newPreset, id: editingPresetId };
        const newArr = presets.map(p => p.id === editingPresetId ? updatedPreset : p);
        setPresets(newArr);
        saveLocalFallback(newArr);
      } else {
        const localPreset = { ...newPreset, id: crypto.randomUUID() };
        const newArr = [localPreset, ...presets];
        setPresets(newArr);
        saveLocalFallback(newArr);
      }
    }

    setEditingPresetId(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    playSound('click');
    try {
      const { error } = await supabase.from('practice_presets').delete().eq('id', id);
      if (error) throw error;
      setPresets(presets.filter(p => p.id !== id));
    } catch (e) {
      // Local fallback deletion
      const newArr = presets.filter(p => p.id !== id);
      setPresets(newArr);
      saveLocalFallback(newArr);
    }
    setPresetToDelete(null);
  };

  return (
    <div className="space-y-4">
      
      {!isCreating ? (
        <>
          <div className="flex items-center justify-between bg-white border-2 border-[#1E1E24] rounded-2xl p-4 shadow-xs">
            <div>
              <h3 className="font-black text-sm uppercase text-[#1E1E24]">Mis Presets</h3>
              <p className="text-xs font-bold text-[#8A909F]">Configuraciones guardadas</p>
            </div>
            <button
              onClick={() => { playSound('click'); setEditingPresetId(null); setName('Mi Práctica'); setDigits(2); setRows(2); setNumQuestions(10); setIsCreating(true); }}
              className="bg-[#BAFF29] hover:bg-[#a6ff00] text-[#1E1E24] border-2 border-[#1E1E24] rounded-xl px-3 py-2 flex items-center gap-1 font-black text-xs shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
            >
              <Plus size={16} /> NUEVO
            </button>
          </div>

          <div className="grid gap-3">
            {isLoading ? (
              <div className="text-center py-6 text-sm font-bold text-[#8A909F]">Cargando presets...</div>
            ) : presets.length === 0 ? (
              <div className="bg-[#FFF9E6] border-2 border-dashed border-[#1E1E24]/30 rounded-2xl p-6 text-center text-sm font-bold text-[#1E1E24]/50">
                No tienes presets creados aún.<br/>Crea uno para empezar a practicar.
              </div>
            ) : (
              presets.map(preset => (
                <div key={preset.id} className="bg-white border-2 border-[#1E1E24] rounded-2xl p-4 shadow-xs flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-base text-[#1E1E24] uppercase">{preset.name}</h4>
                      <p className="text-[11px] font-bold text-[#4A4E69]">
                        {preset.numQuestions} Preguntas • {preset.minRows === preset.maxRows ? preset.minRows : `${preset.minRows}-${preset.maxRows}`} Filas • {preset.minDigits === preset.maxDigits ? preset.minDigits : `${preset.minDigits}-${preset.maxDigits}`} Dígitos
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {onOpenHistory && (
                        <button 
                          onClick={() => { playSound('click'); onOpenHistory(preset); }}
                          className="text-[#6F78DB] hover:bg-blue-50 p-1.5 rounded-lg border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
                          title="Ver Historial"
                        >
                          <BarChart2 size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleEdit(preset)}
                        className="text-blue-500 hover:bg-blue-50 p-1.5 rounded-lg border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
                        title="Editar Preset"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => setPresetToDelete(preset.id)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
                        title="Eliminar Preset"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {preset.allowSubtraction && (
                      <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded border border-red-200">Restas Incluidas</span>
                    )}
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded border border-blue-200">
                      Entrada: {preset.inputDirection === 'right_to_left' ? 'Derecha a Izquierda' : 'Izquierda a Derecha'}
                    </span>
                  </div>

                  <div className="flex gap-2 w-full mt-1">
                    <button
                      onClick={() => { playSound('click'); setPresetToViewHistory(preset); }}
                      className="flex-1 bg-white hover:bg-gray-50 text-[#1E1E24] border-2 border-[#1E1E24] rounded-xl py-2 flex items-center justify-center gap-2 font-black text-xs shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
                    >
                      <History size={16} /> HISTORIAL
                    </button>
                    <button
                      onClick={() => { playSound('click'); onStartQuiz(preset); }}
                      className="flex-1 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] border-2 border-[#1E1E24] rounded-xl py-2 flex items-center justify-center gap-2 font-black text-xs shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
                    >
                      <Play size={16} className="fill-current" /> INICIAR
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleCreatePreset} className="bg-white border-2 border-[#1E1E24] rounded-2xl p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#1E1E24] pb-3">
            <h3 className="font-black text-sm uppercase flex items-center gap-2">
              <Settings2 size={18} /> {editingPresetId ? 'Editar Preset' : 'Crear Preset'}
            </h3>
            <button type="button" onClick={() => { setIsCreating(false); setEditingPresetId(null); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-[#1E1E24] rounded-full text-[11px] font-black text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer">
              Cancelar
            </button>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#8A909F]">Nombre del Preset</label>
              <input 
                type="text" 
                value={name} onChange={e => setName(e.target.value)}
                maxLength={20} required
                className="w-full bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl px-3 py-2 font-bold text-sm outline-none focus:border-[#F7CA38]"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-3">
                <span className="text-[11px] font-black uppercase text-[#1E1E24]">Número de dígitos:</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => digits > 1 && setDigits(digits - 1)} className="w-8 h-8 rounded-lg bg-white border-2 border-[#1E1E24] flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none">-</button>
                  <span className="font-black w-4 text-center">{digits}</span>
                  <button type="button" onClick={() => digits < 10 && setDigits(digits + 1)} className="w-8 h-8 rounded-lg bg-[#BAFF29] border-2 border-[#1E1E24] flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-3">
                <span className="text-[11px] font-black uppercase text-[#1E1E24]">Número de filas:</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => rows > 2 && setRows(rows - 1)} className="w-8 h-8 rounded-lg bg-white border-2 border-[#1E1E24] flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none">-</button>
                  <span className="font-black w-4 text-center">{rows}</span>
                  <button type="button" onClick={() => rows < 5 && setRows(rows + 1)} className="w-8 h-8 rounded-lg bg-[#BAFF29] border-2 border-[#1E1E24] flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-3">
                <span className="text-[11px] font-black uppercase text-[#1E1E24]">Número de preguntas:</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => numQuestions > 5 && setNumQuestions(numQuestions - 1)} className="w-8 h-8 rounded-lg bg-white border-2 border-[#1E1E24] flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none">-</button>
                  <span className="font-black w-6 text-center">{numQuestions}</span>
                  <button type="button" onClick={() => numQuestions < 20 && setNumQuestions(numQuestions + 1)} className="w-8 h-8 rounded-lg bg-[#BAFF29] border-2 border-[#1E1E24] flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none">+</button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#f8faf9] border-2 border-[#1E1E24] p-3 rounded-xl">
              <input type="checkbox" id="allowSub" checked={allowSubtraction} onChange={e => setAllowSubtraction(e.target.checked)} className="w-5 h-5 accent-[#BAFF29]" />
              <label htmlFor="allowSub" className="font-bold text-sm select-none">Mezclar restas</label>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#8A909F]">Dirección de Escritura</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setInputDirection('right_to_left')} className={`flex-1 py-2 rounded-xl border-2 font-black text-xs shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all ${inputDirection === 'right_to_left' ? 'bg-[#1E1E24] text-white border-[#1E1E24]' : 'bg-[#f8faf9] text-[#1E1E24] border-[#1E1E24]/30'}`}>&lt;- Derecha a Izq</button>
                <button type="button" onClick={() => setInputDirection('left_to_right')} className={`flex-1 py-2 rounded-xl border-2 font-black text-xs shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all ${inputDirection === 'left_to_right' ? 'bg-[#1E1E24] text-white border-[#1E1E24]' : 'bg-[#f8faf9] text-[#1E1E24] border-[#1E1E24]/30'}`}>Izquierda a Der -&gt;</button>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full mt-4 bg-[#BAFF29] hover:bg-[#a6ff00] text-[#1E1E24] border-2 border-[#1E1E24] rounded-xl py-3 font-black text-sm uppercase shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
            Guardar y Empezar
          </button>
        </form>
      )}

      {/* Delete Confirmation Modal */}
      {/* Modals */}
      <PracticeHistoryModal
        isOpen={!!presetToViewHistory}
        onClose={() => setPresetToViewHistory(null)}
        preset={presetToViewHistory}
      />

      <AnimatePresence>
        {presetToDelete && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1E1E24]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white border-4 border-[#1E1E24] rounded-3xl p-6 w-full max-w-sm shadow-[8px_8px_0px_0px_#1E1E24]"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 border-2 border-red-500 mx-auto">
                <AlertTriangle className="text-red-500" size={24} />
              </div>
              <h2 className="text-xl font-black text-center uppercase tracking-tight mb-2">¿Eliminar Preset?</h2>
              <p className="text-sm font-bold text-center text-[#4A4E69] mb-6">Esta acción no se puede deshacer.</p>
              
              <div className="flex gap-3">
                <button onClick={() => setPresetToDelete(null)} className="flex-1 bg-[#F2F3F7] border-2 border-[#1E1E24] rounded-xl py-3 font-black text-sm uppercase shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all">Cancelar</button>
                <button onClick={() => handleDelete(presetToDelete)} className="flex-1 bg-red-500 text-white border-2 border-[#1E1E24] rounded-xl py-3 font-black text-sm uppercase shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all">Eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
