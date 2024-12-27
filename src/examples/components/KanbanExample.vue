<template>
  <DemoSection title="Kanban Board">
    <div class="kanban">
      <DraggableContainer
        v-for="column in columns"
        :key="column.id"
        v-model="itemsByColumn[column.id]"
        type="list"
        :showToolbar="true"
        class="kanban-column"
      >
        <h3>{{ column.title }}</h3>
        <div class="kanban-items">
          <Draggable
            v-for="item in itemsByColumn[column.id]"
            :key="item.id"
            :data="item"
            class="kanban-item"
            :class="item.priority"
          >
            {{ item.text }}
          </Draggable>
        </div>
      </DraggableContainer>
    </div>
  </DemoSection>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Draggable } from '../../components';
import DraggableContainer from '../../components/DraggableContainer.vue';
import DemoSection from './DemoSection.vue';

interface KanbanItem {
  id: number;
  text: string;
  columnId: string;
  priority: 'low' | 'medium' | 'high';
}

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'doing', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

const items = ref<KanbanItem[]>([
  { id: 1, text: 'Design UI', columnId: 'todo', priority: 'high' },
  { id: 2, text: 'Write tests', columnId: 'doing', priority: 'medium' },
  { id: 3, text: 'Fix bugs', columnId: 'todo', priority: 'low' },
  { id: 4, text: 'Deploy app', columnId: 'done', priority: 'high' }
]);

const itemsByColumn = computed(() => {
  const grouped: Record<string, KanbanItem[]> = {};
  columns.forEach(column => {
    grouped[column.id] = items.value.filter(item => item.columnId === column.id);
  });
  return grouped;
});
</script>

<style scoped>
.kanban {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.kanban-column {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
}

.kanban-items {
  min-height: 200px;
  margin-top: 1rem;
}

.kanban-item {
  margin: 0.5rem 0;
  padding: 0.75rem;
  background: white;
  border-radius: 4px;
  border-left: 4px solid;
  cursor: move;
}

.kanban-item.high { border-color: #f44336; }
.kanban-item.medium { border-color: #ff9800; }
.kanban-item.low { border-color: #4caf50; }
</style>