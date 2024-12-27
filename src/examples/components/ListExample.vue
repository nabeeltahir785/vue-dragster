<template>
  <DemoSection title="Sortable List">
    <div class="list-demo">
      <DraggableContainer
        v-model="sourceItems"
        type="list"
        direction="vertical"
        :showToolbar="true"
        class="list-container"
        data-container="source"
      >
        <Draggable 
          v-for="(item, index) in sourceItems" 
          :key="item.id"
          :data="{ id: item.id, text: item.text, containerId: 'source', index }"
          class="list-item"
        >
          {{ item.text }}
        </Draggable>
      </DraggableContainer>

      <DraggableContainer
        v-model="targetItems"
        type="list"
        direction="vertical"
        :showToolbar="true"
        class="list-container"
        data-container="target"
      >
        <template v-if="targetItems.length === 0">
          <div class="empty-list">Drop items here</div>
        </template>
        <Draggable
          v-for="(item, index) in targetItems"
          :key="item.id"
          :data="{ id: item.id, text: item.text, containerId: 'target', index }"
          class="list-item"
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

interface DragItem {
  id: number;
  text: string;
}

const sourceItems = ref<DragItem[]>([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
]);

const targetItems = ref<DragItem[]>([]);
</script>

<style scoped>
.list-demo {
  display: flex;
  gap: 2rem;
}

.list-container {
  flex: 1;
  min-height: 200px;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.list-item {
  margin: 0.5rem 0;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: move;
}

.list-item:hover {
  background: #fafafa;
}

.empty-list {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
}
</style>