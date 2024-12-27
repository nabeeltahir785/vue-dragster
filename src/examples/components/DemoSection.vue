<template>
  <section class="demo-section">
    <h2>{{ title }}</h2>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.demo-section {
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  color: #333;
}
</style>