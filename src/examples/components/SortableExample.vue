<template>
  <DemoSection title="Sortable List with Reordering">
    <div class="sortable-list">
      <Draggable
        v-for="item in items"
        :key="item.id"
        :data="item"
        class="sortable-item"
        @dragstart="onDragStart(item)"
      >
        <div class="handle">⋮</div>
        <span>{{ item.text }}</span>
      </Draggable>
    </div>
  </DemoSection>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Draggable } from '../../index';
import DemoSection from './DemoSection.vue';
import { useSort } from '../composables/useSort';

const items = ref([
  { id: 1, text: 'First Item' },
  { id: 2, text: 'Second Item' },
  { id: 3, text: 'Third Item' },
  { id: 4, text: 'Fourth Item' },
]);

const { onDragStart } = useSort(items);
</script>

<style scoped>
.sortable-list {
  max-width: 400px;
  margin: 0 auto;
}

.sortable-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.handle {
  cursor: move;
  color: #666;
  font-size: 1.25rem;
}
</style>