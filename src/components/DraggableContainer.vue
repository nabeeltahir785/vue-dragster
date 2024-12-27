<template>
  <div class="draggable-container">
    <div class="toolbar" v-if="showToolbar">
      <button 
        @click="undo" 
        :disabled="!canUndo"
        class="toolbar-button"
      >
        Undo
      </button>
      <button 
        @click="redo" 
        :disabled="!canRedo"
        class="toolbar-button"
      >
        Redo
      </button>
    </div>
    
    <Droppable
      ref="containerRef"
      :class="[
        `container-${type}`,
        { 'is-dragging-over': isDraggingOver }
      ]"
      :style="containerStyle"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <slot></slot>
    </Droppable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Droppable from './Droppable.vue';
import { useContainer } from '../composables/useContainer';
import { useDragContainer } from '../composables/useDragContainer';
import type { AnimationOptions } from '../types';

const props = withDefaults(defineProps<{
  type: 'list' | 'grid';
  direction?: 'horizontal' | 'vertical';
  gap?: number;
  modelValue: any[];
  animations?: AnimationOptions;
  showToolbar?: boolean;
}>(), {
  direction: 'vertical',
  gap: 8,
  showToolbar: false
});

const emit = defineEmits<{
  'update:modelValue': [items: any[]];
  reorder: [from: number, to: number];
}>();

const containerRef = ref<HTMLElement | null>(null);

const {
  containerStyle,
  isDraggingOver,
  onDragEnter,
  onDragLeave,
  onDrop
} = useContainer(
  computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  }),
  {
    type: props.type,
    direction: props.direction,
    gap: props.gap
  }
);

const {
  canUndo,
  canRedo,
  undo,
  redo
} = useDragContainer(props.modelValue);
</script>

<style scoped>
.draggable-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toolbar {
  display: flex;
  gap: 0.5rem;
}

.toolbar-button {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-button:hover:not(:disabled) {
  background: #e0e0e0;
}

.toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.container-list {
  display: flex;
  flex-direction: column;
}

.container-list.horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}

.container-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.is-dragging-over {
  background: rgba(0, 0, 0, 0.05);
}
</style>