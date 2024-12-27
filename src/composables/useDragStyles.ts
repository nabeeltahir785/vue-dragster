import { computed } from 'vue';
import type { DragState, DragStyles } from '../types';

export function useDragStyles(state: DragState, styles?: DragStyles) {
  const computedStyles = computed(() => {
    const baseStyles = styles?.base ?? {};
    const draggingStyles = state.isDragging && styles?.dragging ? styles.dragging : {};
    const overStyles = state.isOver && styles?.over ? styles.over : {};
    
    return {
      ...baseStyles,
      ...draggingStyles,
      ...overStyles
    };
  });

  return {
    styles: computedStyles
  };
}