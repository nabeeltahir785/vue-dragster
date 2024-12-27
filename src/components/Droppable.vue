<template>
  <div
    ref="elementRef"
    :class="['v-droppable', { 'is-over': isOver }]"
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    @dragover.prevent="onDragOver"
    @drop.prevent="onDrop"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDragEvents } from '../composables/useDragEvents';

const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  dragenter: [event: DragEvent];
  dragleave: [event: DragEvent];
  dragover: [event: DragEvent];
  drop: [event: DragEvent];
}>();

const elementRef = ref<HTMLElement | null>(null);
const { isOver } = useDragEvents(elementRef);

const onDragEnter = (e: DragEvent) => {
  if (props.disabled) return;
  emit('dragenter', e);
};

const onDragLeave = (e: DragEvent) => {
  if (props.disabled) return;
  emit('dragleave', e);
};

const onDragOver = (e: DragEvent) => {
  if (props.disabled) return;
  e.dataTransfer!.dropEffect = 'move';
  emit('dragover', e);
};

const onDrop = (e: DragEvent) => {
  if (props.disabled) return;
  emit('drop', e);
};
</script>

<style>
.v-droppable {
  position: relative;
}

.v-droppable.is-over {
  background-color: rgba(0, 0, 0, 0.05);
}

.v-droppable.is-over::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px dashed #666;
  border-radius: inherit;
  pointer-events: none;
}
</style>