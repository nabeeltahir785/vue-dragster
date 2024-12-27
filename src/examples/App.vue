<template>
  <div class="container">
    <header class="header">
      <h1>Vue3 Easy DnD</h1>
      <p>A lightweight, easy-to-use drag and drop library for Vue 3</p>
    </header>

    <main>
      <SimpleExample />
      <ListExample />
      <GridExample />
      <SortableExample />
      <KanbanExample />
    </main>

    <footer class="footer">
      <p>View documentation on <a href="https://github.com/yourusername/vue3-easy-dnd">GitHub</a></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import SimpleExample from './components/SimpleExample.vue';
import ListExample from './components/ListExample.vue';
import GridExample from './components/GridExample.vue';
import SortableExample from './components/SortableExample.vue';
import KanbanExample from './components/KanbanExample.vue';
</script>

<style>
/* ... existing styles ... */
</style>