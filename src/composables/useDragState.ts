import { ref } from 'vue';

interface DragState {
  sourceId: string | null;
  sourceIndex: number;
  isDragging: boolean;
}

// Singleton state to track drag operations across components
const dragState = ref<DragState>({
  sourceId: null,
  sourceIndex: -1,
  isDragging: false
});

export function useDragState() {
  const startDrag = (sourceId: string, sourceIndex: number) => {
    dragState.value = {
      sourceId,
      sourceIndex,
      isDragging: true
    };
  };

  const endDrag = () => {
    dragState.value = {
      sourceId: null,
      sourceIndex: -1,
      isDragging: false
    };
  };

  return {
    dragState,
    startDrag,
    endDrag
  };
}