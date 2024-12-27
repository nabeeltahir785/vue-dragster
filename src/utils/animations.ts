import type { Position, AnimationOptions } from '../types';

export interface AnimationConfig {
  duration?: number;
  easing?: string;
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
}

export function getElementPosition(element: HTMLElement | null): Position | null {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  };
}

export function createDragAnimation(
    element: HTMLElement,
    options: AnimationOptions = {}
): Animation {
  const { dragScale = 1.05, duration = { drag: 200 }, easing = { drag: 'ease-out' } } = options;

  return element.animate([
    { transform: 'scale(1)', opacity: '1' },
    { transform: `scale(${dragScale})`, opacity: '0.8' }
  ], {
    duration: duration.drag,
    easing: easing.drag,
    fill: 'forwards'
  });
}

export function createDropAnimation(
    element: HTMLElement,
    options: AnimationOptions = {}
): Animation {
  const { duration = { drop: 200 }, easing = { drop: 'ease-out' } } = options;

  return element.animate([
    { transform: 'scale(1.05)', opacity: '0.8' },
    { transform: 'scale(1)', opacity: '1' }
  ], {
    duration: duration.drop,
    easing: easing.drop
  });
}

export function createShiftAnimation(
    element: HTMLElement,
    from: Position,
    to: Position,
    options: AnimationOptions = {}
): Animation {
  const { duration = { shift: 300 }, easing = { shift: 'cubic-bezier(0.2, 0, 0.2, 1)' } } = options;
  const deltaX = from.x - to.x;
  const deltaY = from.y - to.y;

  return element.animate([
    { transform: `translate(${deltaX}px, ${deltaY}px)` },
    { transform: 'translate(0, 0)' }
  ], {
    duration: duration.shift,
    easing: easing.shift
  });
}

export function cancelAnimation(animation: Animation | undefined): void {
  if (animation?.playState !== 'idle') {
    animation.cancel();
  }
}