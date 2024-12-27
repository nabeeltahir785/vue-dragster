<template>
  <DemoSection title="Simple Drag and Drop">
    <div class="simple-demo">
      <Draggable :data="{ id: 1, text: 'Simple Item' }">
        <div class="simple-item">Drag me!</div>
      </Draggable>

      <Droppable @drop="onDrop" class="simple-dropzone">
        <div v-if="!droppedItem">Drop here!</div>
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

const droppedItem = ref<{ id: number; text: string } | null>(null);

const onDrop = (e: DragEvent) => {
  if (e.dataTransfer) {
    droppedItem.value = JSON.parse(e.dataTransfer.getData('application/json'));
  }
};
</script>

<style scoped>
.simple-demo {
  display: flex;
  gap: 2rem;
}

.simple-item {
  padding: 1rem;
  background: #4CAF50;
  color: white;
  border-radius: 4px;
  width: 120px;
  text-align: center;
}

.simple-dropzone {
  flex: 1;
  padding: 2rem;
  background: #f5f5f5;
  border: 2px dashed #ccc;
  border-radius: 4px;
  text-align: center;
}

.dropped-content {
  padding: 0.5rem;
  background: #E8F5E9;
  border-radius: 4px;
}
</style>