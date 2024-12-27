import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { preventDefault } from '../utils/events';

export interface DroppableOptions {
  onDragEnter?: (e: DragEvent) => void;
  onDragLeave?: (e: DragEvent) => void;
  onDragOver?: (e: DragEvent) => void;
  onDrop?: (e: DragEvent) => void;
  disabled?: boolean;
  acceptFrom?: string | string[];
}

export function useDroppable(
  elementRef: Ref<HTMLElement | null>,
  options: DroppableOptions = {}
) {
  const isOver = ref(false);

  const handleDragEnter = (e: DragEvent) => {
    if (options.disabled) return;
    preventDefault(e);
    isOver.value = true;
    options.onDragEnter?.(e);
  };

  const handleDragLeave = (e: DragEvent) => {
    if (options.disabled) return;
    preventDefault(e);
    isOver.value = false;
    options.onDragLeave?.(e);
  };

  const handleDragOver = (e: DragEvent) => {
    if (options.disabled) return;
    preventDefault(e);
    options.onDragOver?.(e);
  };

  const handleDrop = (e: DragEvent) => {
    if (options.disabled) return;
    preventDefault(e);
    isOver.value = false;
    options.onDrop?.(e);
  };

  onMounted(() => {
    const element = elementRef.value;
    if (!element) return;

    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('drop', handleDrop);
  });

  onUnmounted(() => {
    const element = elementRef.value;
    if (!element) return;

    element.removeEventListener('dragenter', handleDragEnter);
    element.removeEventListener('dragleave', handleDragLeave);
    element.removeEventListener('dragover', handleDragOver);
    element.removeEventListener('drop', handleDrop);
  });

  return {
    isOver
  };
}