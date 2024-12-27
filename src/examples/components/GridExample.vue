<template>
  <DemoSection title="Grid Layout">
    <div class="grid-demo">
      <DraggableContainer
        v-model="items"
        type="grid"
        :showToolbar="true"
        class="grid-container"
      >
        <Draggable
          v-for="item in items"
          :key="item.id"
          :data="item"
          class="grid-item"
          :class="item.color"
        >
          {{ item.text }}
        </Draggable>
      </DraggableContainer>

      <DraggableContainer
        v-model="droppedItems"
        type="list"
        :showToolbar="true"
        class="grid-dropzone"
      >
        <div v-if="droppedItems.length === 0" class="dropzone-placeholder">
          Drop a colored item here
        </div>
        <Draggable
          v-for="item in droppedItems"
          :key="item.id"
          :data="item"
          class="grid-item"
          :class="item.color"
        >
          {{ item.text }}
        </Draggable>
      </DraggableContainer>
    </div>
  </DemoSection>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Draggable } from '../../components';
import DraggableContainer from '../../components/DraggableContainer.vue';
import DemoSection from './DemoSection.vue';

interface GridItem {
  id: number;
  text: string;
  color: string;
}

const items = ref<GridItem[]>([
  { id: 1, text: 'Red', color: 'red' },
  { id: 2, text: 'Blue', color: 'blue' },
  { id: 3, text: 'Green', color: 'green' },
  { id: 4, text: 'Purple', color: 'purple' },
]);

const droppedItems = ref<GridItem[]>([]);
</script>

<style scoped>
.grid-demo {
  display: flex;
  gap: 2rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  flex: 1;
}

.grid-item {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: move;
}

.grid-item.red { background: #f44336; }
.grid-item.blue { background: #2196f3; }
.grid-item.green { background: #4caf50; }
.grid-item.purple { background: #9c27b0; }

.grid-dropzone {
  width: 200px;
  min-height: 200px;
  background: #f5f5f5;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 1rem;
}

.dropzone-placeholder {
  text-align: center;
  color: #666;
  padding: 1rem;
}
</style>