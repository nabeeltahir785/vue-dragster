import { ref } from 'vue';
import type { Position, AnimationOptions } from '../types';
import { getElementPosition } from '../utils/animations';

export function useDropAnimation(options: AnimationOptions = {}) {
  const dropTargets = ref<Map<string, Position>>(new Map());

  const recordDropTargets = (elements: HTMLElement[]) => {
    dropTargets.value = new Map(
      elements.map(el => [el.dataset.id!, getElementPosition(el)])
    );
  };

  const animateDropTarget = (element: HTMLElement) => {
    if (options.disabled) return;

    return element.animate([
      { transform: 'scale(1)', background: 'rgba(0, 0, 0, 0.05)' },
      { transform: 'scale(1.02)', background: 'rgba(0, 0, 0, 0.08)' },
      { transform: 'scale(1)', background: 'rgba(0, 0, 0, 0.05)' }
    ], {
      duration: options.duration?.drop || 200,
      easing: options.easing?.drop || 'ease-out'
    });
  };

  return {
    dropTargets,
    recordDropTargets,
    animateDropTarget
  };
}