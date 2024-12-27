<template>
  <div
    ref="elementRef"
    :class="[
      'v-draggable',
      { 'is-dragging': isDragging }
    ]"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDragEvents } from '../composables/useDragEvents';

const props = defineProps<{
  disabled?: boolean;
  data?: unknown;
}>();

const emit = defineEmits<{
  dragstart: [event: DragEvent];
  dragend: [event: DragEvent];
}>();

const elementRef = ref<HTMLElement | null>(null);
const { isDragging, handlers } = useDragEvents(elementRef);

const onDragStart = (e: DragEvent) => {
  if (props.disabled || !e.dataTransfer) return;
  
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('application/json', JSON.stringify(props.data || {}));
  handlers.handleDragStart(e);
  emit('dragstart', e);
};

const onDragEnd = (e: DragEvent) => {
  if (props.disabled) return;
  handlers.handleDragEnd(e);
  emit('dragend', e);
};
</script>

<style>
.v-draggable {
  cursor: move;
  user-select: none;
}

.v-draggable.is-dragging {
  opacity: 0.5;
}
</style>