import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useDroppable } from '../composables/useDroppable';

describe('useDroppable', () => {
  it('should handle drop events', () => {
    const elementRef = ref<HTMLElement>(document.createElement('div'));
    const onDragEnter = vi.fn();
    const onDragLeave = vi.fn();
    const onDrop = vi.fn();

    const { isOver } = useDroppable(elementRef, {
      onDragEnter,
      onDragLeave,
      onDrop
    });

    expect(isOver.value).toBe(false);

    // Simulate drag enter
    elementRef.value.dispatchEvent(new DragEvent('dragenter'));
    expect(isOver.value).toBe(true);
    expect(onDragEnter).toHaveBeenCalled();

    // Simulate drag leave
    elementRef.value.dispatchEvent(new DragEvent('dragleave'));
    expect(isOver.value).toBe(false);
    expect(onDragLeave).toHaveBeenCalled();

    // Simulate drop
    elementRef.value.dispatchEvent(new DragEvent('drop'));
    expect(onDrop).toHaveBeenCalled();
  });

  it('should respect disabled option', () => {
    const elementRef = ref<HTMLElement>(document.createElement('div'));
    const onDrop = vi.fn();

    useDroppable(elementRef, {
      onDrop,
      disabled: true
    });

    elementRef.value.dispatchEvent(new DragEvent('drop'));
    expect(onDrop).not.toHaveBeenCalled();
  });
});