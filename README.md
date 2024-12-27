I'll create a comprehensive README.md for your Vue 3 drag and drop package:

```markdown
# Vue Dragster 🚀

A lightweight, high-performance drag and drop library for Vue 3 with touch support.

## ✨ Features

- 🎯 Simple and intuitive API
- 📱 Touch device support
- 🎨 Customizable animations and styling
- ⚡️ High performance with zero dependencies
- 🔄 List and grid layouts support
- 🎮 Nested drag and drop
- 💾 Undo/Redo support
- ♿️ Accessibility ready
- 📦 Tree-shakeable
- 💪 Written in TypeScript

## 🚀 Installation

```bash
# npm
npm install vue-dragster

# yarn
yarn add vue-dragster

# pnpm
pnpm add vue-dragster
```

## 🎯 Quick Start

```vue
<template>
  <DraggableContainer>
    <Draggable v-for="item in items" :key="item.id">
      {{ item.text }}
    </Draggable>
  </DraggableContainer>
</template>

<script setup lang="ts">
import { Draggable, DraggableContainer } from 'vue-dragster';
import { ref } from 'vue';

const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
]);
</script>
```

## 📚 Documentation

### Basic Usage

1. Import the components:
```js
import { Draggable, DraggableContainer } from 'vue-dragster';
```

2. Register them in your component:
```js
export default {
  components: {
    Draggable,
    DraggableContainer
  }
}
```

### Event Handling

```vue
<template>
  <DraggableContainer
    @drag-start="onDragStart"
    @drag-end="onDragEnd"
    @drop="onDrop"
  >
    <Draggable
      v-for="item in items"
      :key="item.id"
      :data="item"
    >
      {{ item.text }}
    </Draggable>
  </DraggableContainer>
</template>
```

### Customization

```vue
<template>
  <DraggableContainer
    :animation="{ duration: 200, easing: 'ease-out' }"
    :class="{ 'custom-container': true }"
  >
    <Draggable
      v-for="item in items"
      :key="item.id"
      :class="{ 'custom-item': true }"
    >
      {{ item.text }}
    </Draggable>
  </DraggableContainer>
</template>
```

## 🎮 Advanced Features

### Nested Draggables

```vue
<template>
  <DraggableContainer>
    <Draggable v-for="group in groups" :key="group.id">
      {{ group.name }}
      <DraggableContainer>
        <Draggable v-for="item in group.items" :key="item.id">
          {{ item.text }}
        </Draggable>
      </DraggableContainer>
    </Draggable>
  </DraggableContainer>
</template>
```

### Undo/Redo Support

```vue
<script setup>
import { useHistory } from 'vue-dragster';

const { undo, redo, canUndo, canRedo } = useHistory();
</script>

<template>
  <button @click="undo" :disabled="!canUndo">Undo</button>
  <button @click="redo" :disabled="!canRedo">Redo</button>
</template>
```

## 📋 Props

### Draggable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | any | undefined | Data associated with the draggable item |
| disabled | boolean | false | Disables drag functionality |
| handle | string | undefined | CSS selector for drag handle |
| group | string/object | undefined | Group definition for drag constraints |

### DraggableContainer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| animation | object | {} | Animation configuration |
| direction | string | 'vertical' | Layout direction |
| group | string/object | undefined | Group definition for drop zones |
| sortable | boolean | true | Enable/disable sorting |

## 🎨 Styling

Add custom styles to your draggable elements:

```css
.v-draggable {
  /* Default state */
}

.v-draggable--dragging {
  /* While dragging */
}

.v-draggable--over {
  /* When dragged over */
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

[MIT](./LICENSE)

## 🙏 Credits

Created and maintained by [Nabeel Tahir](https://github.com/nabeeltahir785).

---

<p align="center">If you find this package helpful, please consider giving it a ⭐️</p>


