<template>
  <DemoSection title="Layout Examples">
    <div class="layout-demos">
      <!-- List Layout -->
      <div class="layout-demo">
        <h3>Vertical List</h3>
        <DraggableContainer
          v-model="listItems"
          type="list"
          direction="vertical"
          @reorder="onReorder"
        >
          <Draggable
            v-for="item in listItems"
            :key="item.id"
            :data="item"
            class="list-item"
          >
            {{ item.text }}
          </Draggable>
        </DraggableContainer>
      </div>

      <!-- Grid Layout -->
      <div class="layout-demo">
        <h3>Grid</h3>
        <DraggableContainer
          v-model="gridItems"
          type="grid"
          :gap="16"
          @reorder="onReorder"
        >
          <Draggable
            v-for="item in gridItems"
            :key="item.id"
            :data="item"
            class="grid-item"
          >
            <img :src="item.image" :alt="item.text">
            <span>{{ item.text }}</span>
          </Draggable>
        </DraggableContainer>
      </div>
    </div>
  </DemoSection>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Draggable } from '../../components';
import { DraggableContainer } from '../../components/DraggableContainer.vue';
import DemoSection from './DemoSection.vue';

const listItems = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' },
]);

const gridItems = ref([
  { id: 1, text: 'Image 1', image: 'placeholder1.jpg' },
  { id: 2, text: 'Image 2', image: 'placeholder2.jpg' },
  { id: 3, text: 'Image 3', image: 'placeholder3.jpg' },
  { id: 4, text: 'Image 4', image: 'placeholder4.jpg' },
]);

const onReorder = (from: number, to: number) => {
  console.log(`Moved item from ${from} to ${to}`);
};
</script>

<style scoped>
.layout-demos {
  display: grid;
  gap: 2rem;
}

.layout-demo {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-item {
  padding: 1rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.grid-item {
  aspect-ratio: 1;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.grid-item img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}

.grid-item span {
  padding: 0.5rem;
  text-align: center;
}
</style>