import type { TouchPoint, TouchOptions } from '../types/touch';

export function getTouchPoint(e: TouchEvent): TouchPoint | null {
  if (!e.touches.length && !e.changedTouches.length) return null;

  const touch = e.touches[0] || e.changedTouches[0];
  return {
    x: touch.clientX,
    y: touch.clientY,
    identifier: touch.identifier,
    target: e.target as HTMLElement,
    pressure: touch.force || 0,
    timestamp: Date.now()
  };
}

export function createDragImage(
    element: HTMLElement,
    options: { scale?: number; opacity?: number } = {}
): HTMLElement {
  const { scale = 1, opacity = 0.8 } = options;
  const clone = element.cloneNode(true) as HTMLElement;

  Object.assign(clone.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '999999',
    opacity: String(opacity),
    width: `${element.offsetWidth}px`,
    height: `${element.offsetHeight}px`,
    transform: `scale(${scale})`,
    transition: 'transform 0.2s ease-out'
  });

  return clone;
}

export function positionClone(
    clone: HTMLElement,
    point: TouchPoint,
    offset: { x?: number; y?: number } = {}
): void {
  if (!clone || !point) return;

  const { x = clone.offsetWidth / 2, y = clone.offsetHeight / 2 } = offset;

  Object.assign(clone.style, {
    left: `${point.x - x}px`,
    top: `${point.y - y}px`
  });
}

export function getDistance(point1: TouchPoint, point2: TouchPoint): number {
  return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
}