import { ref, computed } from 'vue';
import type { Position } from '../types';

interface DragTrackingState {
  isDragging: boolean;
  startPosition: Position | null;
  currentPosition: Position | null;
  sourceElement: HTMLElement | null;
}

export function useDragTracking() {
  const state = ref<DragTrackingState>({
    isDragging: false,
    startPosition: null,
    currentPosition: null,
    sourceElement: null
  });

  const dragDistance = computed(() => {
    if (!state.value.startPosition || !state.value.currentPosition) {
      return 0;
    }

    const dx = state.value.currentPosition.x - state.value.startPosition.x;
    const dy = state.value.currentPosition.y - state.value.startPosition.y;
    return Math.sqrt(dx * dx + dy * dy);
  });

  const startDrag = (element: HTMLElement, position: Position) => {
    state.value = {
      isDragging: true,
      startPosition: position,
      currentPosition: position,
      sourceElement: element
    };
  };

  const updateDrag = (position: Position) => {
    state.value.currentPosition = position;
  };

  const endDrag = () => {
    state.value = {
      isDragging: false,
      startPosition: null,
      currentPosition: null,
      sourceElement: null
    };
  };

  return {
    dragState: computed(() => state.value),
    dragDistance,
    startDrag,
    updateDrag,
    endDrag
  };
}