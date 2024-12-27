import { ref } from 'vue';
import type { Position } from '../types';
import { 
  getElementPosition,
  createDragAnimation,
  createDropAnimation,
  createShiftAnimation
} from '../utils/animations';

export function useAnimations() {
  const positions = ref(new Map<string, Position>());

  const recordPositions = (elements: HTMLElement[]) => {
    positions.value = new Map(
      elements.map(el => [el.dataset.id!, getElementPosition(el)])
    );
  };

  const animateDragStart = (element: HTMLElement) => {
    return createDragAnimation(element);
  };

  const animateDrop = (element: HTMLElement) => {
    return createDropAnimation(element);
  };

  const animateShift = (elements: HTMLElement[]) => {
    const oldPositions = positions.value;
    const animations: Animation[] = [];

    elements.forEach(element => {
      const id = element.dataset.id!;
      const oldPos = oldPositions.get(id);
      const newPos = getElementPosition(element);

      if (oldPos && (oldPos.x !== newPos.x || oldPos.y !== newPos.y)) {
        animations.push(createShiftAnimation(element, oldPos, newPos));
      }
    });

    return animations;
  };

  return {
    recordPositions,
    animateDragStart,
    animateDrop,
    animateShift
  };
}