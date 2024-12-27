import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

export interface DragEventHandlers {
  onDragStart?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  onDrop?: (event: DragEvent) => void;
}

export function useDragEvents(
  elementRef: Ref<HTMLElement | null>,
  handlers: DragEventHandlers = {}
) {
  const isDragging = ref(false);
  const isOver = ref(false);

  const handleDragStart = (e: DragEvent) => {
    isDragging.value = true;
    handlers.onDragStart?.(e);
  };

  const handleDragEnd = (e: DragEvent) => {
    isDragging.value = false;
    handlers.onDragEnd?.(e);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    isOver.value = true;
    handlers.onDragEnter?.(e);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;
    
    // Only set isOver to false if we're actually leaving the droppable area
    if (!target.contains(relatedTarget)) {
      isOver.value = false;
      handlers.onDragLeave?.(e);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
    handlers.onDragOver?.(e);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isOver.value = false;
    handlers.onDrop?.(e);
  };

  onMounted(() => {
    const element = elementRef.value;
    if (!element) return;

    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);
    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('drop', handleDrop);
  });

  onUnmounted(() => {
    const element = elementRef.value;
    if (!element) return;

    element.removeEventListener('dragstart', handleDragStart);
    element.removeEventListener('dragend', handleDragEnd);
    element.removeEventListener('dragenter', handleDragEnter);
    element.removeEventListener('dragleave', handleDragLeave);
    element.removeEventListener('dragover', handleDragOver);
    element.removeEventListener('drop', handleDrop);
  });

  return {
    isDragging,
    isOver,
    handlers: {
      handleDragStart,
      handleDragEnd,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop
    }
  };
}