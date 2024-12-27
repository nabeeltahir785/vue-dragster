import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useDraggable } from '../composables/useDraggable';

describe('useDraggable', () => {
  it('should handle drag start and end', () => {
    const elementRef = ref<HTMLElement>(document.createElement('div'));
    const onDragStart = vi.fn();
    const onDragEnd = vi.fn();

    const { isDragging } = useDraggable(elementRef, {
      onDragStart,
      onDragEnd
    });

    expect(isDragging.value).toBe(false);

    // Simulate drag start
    elementRef.value.dispatchEvent(new DragEvent('dragstart'));
    expect(isDragging.value).toBe(true);
    expect(onDragStart).toHaveBeenCalled();

    // Simulate drag end
    elementRef.value.dispatchEvent(new DragEvent('dragend'));
    expect(isDragging.value).toBe(false);
    expect(onDragEnd).toHaveBeenCalled();
  });

  it('should respect disabled option', () => {
    const elementRef = ref<HTMLElement>(document.createElement('div'));
    const onDragStart = vi.fn();

    useDraggable(elementRef, {
      onDragStart,
      disabled: true
    });

    elementRef.value.dispatchEvent(new DragEvent('dragstart'));
    expect(onDragStart).not.toHaveBeenCalled();
  });
});