import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { preventDefault } from '../utils';

export interface DraggableOptions {
  onDragStart?: (e: DragEvent) => void;
  onDragEnd?: (e: DragEvent) => void;
  disabled?: boolean;
  data?: any;
}

export function useDraggable(
  elementRef: Ref<HTMLElement | null>,
  options: DraggableOptions = {}
) {
  const isDragging = ref(false);

  const handleDragStart = (e: DragEvent) => {
    if (options.disabled) return;
    
    isDragging.value = true;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      // Set drag data
      const data = options.data ?? {};
      e.dataTransfer.setData('application/json', JSON.stringify(data));
    }
    options.onDragStart?.(e);
  };

  const handleDragEnd = (e: DragEvent) => {
    if (options.disabled) return;
    
    isDragging.value = false;
    options.onDragEnd?.(e);
  };

  onMounted(() => {
    const element = elementRef.value;
    if (!element) return;

    element.draggable = !options.disabled;
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);
  });

  onUnmounted(() => {
    const element = elementRef.value;
    if (!element) return;

    element.removeEventListener('dragstart', handleDragStart);
    element.removeEventListener('dragend', handleDragEnd);
  });

  return {
    isDragging
  };
}