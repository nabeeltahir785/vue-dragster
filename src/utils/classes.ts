import type { DragClasses, DragState } from '../types';

export function mergeClasses(
    baseClasses: string | string[],
    customClasses?: string | string[],
    condition = true
): string[] {
  if (!condition) return Array.isArray(baseClasses) ? baseClasses : [baseClasses];

  const base = Array.isArray(baseClasses) ? baseClasses : [baseClasses];
  const custom = customClasses
      ? (Array.isArray(customClasses) ? customClasses : [customClasses])
      : [];

  return [...new Set([...base, ...custom])];
}

export function computeDragClasses(
    state: DragState,
    classes: DragClasses = {}
): string[] {
  const baseClasses = ['v-draggable'];

  return [
    ...mergeClasses(baseClasses, classes.base),
    ...mergeClasses([], classes.dragging, state.isDragging),
    ...mergeClasses([], classes.over, state.isOver),
    ...mergeClasses([], classes.disabled, state.isDisabled),
    ...mergeClasses([], classes.dropping, state.isDropping)
  ];
}