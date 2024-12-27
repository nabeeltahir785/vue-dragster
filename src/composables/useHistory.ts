import { ref, computed } from 'vue';
import type { DragOperation, HistoryState, UndoRedoOptions } from '../types/history';

export function useHistory(options: UndoRedoOptions = {}) {
  const state = ref<HistoryState>({
    past: [],
    future: [],
    maxSize: options.maxHistorySize || 50,
    currentIndex: 0
  });

  const canUndo = computed(() => state.value.past.length > 0);
  const canRedo = computed(() => state.value.future.length > 0);

  const addOperation = (operation: Omit<DragOperation, 'timestamp'>) => {
    const newOperation = {
      ...operation,
      timestamp: Date.now()
    };

    state.value = {
      past: [...state.value.past, newOperation].slice(-state.value.maxSize!),
      future: [],
      maxSize: state.value.maxSize,
      currentIndex: 0
    };
  };

  const undo = () => {
    if (!canUndo.value) return;

    const operation = state.value.past[state.value.past.length - 1];
    state.value = {
      past: state.value.past.slice(0, -1),
      future: [...state.value.future, operation],
      maxSize: state.value.maxSize,
      currentIndex: 0
    };

    options.onUndo?.(operation);
    return operation;
  };

  const redo = () => {
    if (!canRedo.value) return;

    const operation = state.value.future[state.value.future.length - 1];
    state.value = {
      past: [...state.value.past, operation],
      future: state.value.future.slice(0, -1),
      maxSize: state.value.maxSize,
      currentIndex: 0
    };

    options.onRedo?.(operation);
    return operation;
  };

  const clear = () => {
    state.value = {
      past: [],
      future: [],
      maxSize: state.value.maxSize,
      currentIndex: 0
    };
  };

  return {
    canUndo,
    canRedo,
    addOperation,
    undo,
    redo,
    clear
  };
}