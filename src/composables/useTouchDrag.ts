import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { TouchPoint, TouchDragState } from '../types/touch';
import { getTouchPoint, createDragImage, positionClone } from '../utils/touch';

const DRAG_THRESHOLD = 5; // pixels

export function useTouchDrag(elementRef: Ref<HTMLElement | null>) {
  const state = ref<TouchDragState>({
    isDragging: false,
    startPoint: null,
    currentPoint: null,
    dragElement: null,
    clone: null
  });

  const calculateDistance = (p1: TouchPoint, p2: TouchPoint): number => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!elementRef.value) return;
    
    state.value.startPoint = getTouchPoint(e);
    state.value.dragElement = elementRef.value;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!state.value.startPoint || !state.value.dragElement) return;
    
    const currentPoint = getTouchPoint(e);
    state.value.currentPoint = currentPoint;

    if (!state.value.isDragging) {
      const distance = calculateDistance(state.value.startPoint, currentPoint);
      
      if (distance > DRAG_THRESHOLD) {
        state.value.isDragging = true;
        state.value.clone = createDragImage(state.value.dragElement);
        document.body.appendChild(state.value.clone);
      }
    }

    if (state.value.isDragging && state.value.clone) {
      e.preventDefault();
      positionClone(state.value.clone, currentPoint);
    }
  };

  const handleTouchEnd = () => {
    if (state.value.clone) {
      document.body.removeChild(state.value.clone);
    }
    
    state.value = {
      isDragging: false,
      startPoint: null,
      currentPoint: null,
      dragElement: null,
      clone: null
    };
  };

  onMounted(() => {
    const element = elementRef.value;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchEnd);
  });

  onUnmounted(() => {
    const element = elementRef.value;
    if (!element) return;

    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
    element.removeEventListener('touchcancel', handleTouchEnd);
  });

  return {
    touchDragState: state
  };
}