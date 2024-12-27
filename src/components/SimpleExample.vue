<template>
  <DemoSection title="Simple Drag and Drop">
    <div class="simple-demo">
      <div class="source-container">
        <Draggable 
          v-if="!isDragged"
          :data="dragItem" 
          class="simple-item"
          @dragstart="onDragStart"
          @dragend="onDragEnd"
        >
          Drag me!
        </Draggable>
      </div>

      <Droppable 
        class="simple-dropzone" 
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @drop="onDrop"
      >
        <div v-if="!droppedItem" class="dropzone-placeholder">
          Drop here!
        </div>
        <div v-else class="dropped-content">
          Dropped: {{ droppedItem.text }}
        </div>
      </Droppable>
    </div>
  </DemoSection>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Draggable, Droppable } from '../../index';
import DemoSection from './DemoSection.vue';

interface DragItem {
  id: number;
  text: string;
}

const dragItem = {
  id: 1,
  text: 'Simple Item'
};

const isDragged = ref(false);
const droppedItem = ref<DragItem | null>(null);

const onDragStart = () => {
  isDragged.value = false;
};

const onDragEnd = () => {
  // Only set isDragged if item wasn't dropped
  if (!droppedItem.value) {
    isDragged.value = false;
  }
};

const onDragEnter = (e: DragEvent) => {
  e.preventDefault();
};

const onDragLeave = (e: DragEvent) => {
  e.preventDefault();
};

const onDrop = (e: DragEvent) => {
  if (!e.dataTransfer) return;
  
  try {
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    droppedItem.value = data;
    isDragged.value = true;
  } catch (err) {
    console.error('Failed to parse drop data:', err);
  }
};
</script>

<style scoped>
.simple-demo {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.source-container {
  min-width: 120px;
}

.simple-item {
  padding: 1rem;
  background: #4CAF50;
  color: white;
  border-radius: 4px;
  width: 120px;
  text-align: center;
  transition: transform 0.2s;
}

.simple-item:hover {
  transform: translateY(-2px);
}

.simple-dropzone {
  flex: 1;
  min-height: 120px;
  padding: 2rem;
  background: #f5f5f5;
  border: 2px dashed #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.dropzone-placeholder {
  color: #666;
}

.dropped-content {
  padding: 0.5rem;
  background: #E8F5E9;
  border-radius: 4px;
  width: 100%;
  text-align: center;
}
</style>