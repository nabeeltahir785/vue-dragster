import { ref, computed } from 'vue';
import type { Ref } from 'vue';

interface ContainerOptions {
  type: 'list' | 'grid';
  direction?: 'horizontal' | 'vertical';
  gap?: number;
}

export function useContainer(
  items: Ref<any[]>,
  options: ContainerOptions
) {
  const containerRef = ref<HTMLElement | null>(null);
  const isDraggingOver = ref(false);
  
  const containerStyle = computed(() => ({
    display: options.type === 'grid' ? 'grid' : 'flex',
    flexDirection: options.direction === 'horizontal' ? 'row' : 'column',
    gap: `${options.gap || 8}px`,
    ...(options.type === 'grid' && {
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'
    })
  }));

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items.value];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    items.value = newItems;
  };

  const onDragEnter = () => {
    isDraggingOver.value = true;
  };

  const onDragLeave = (e: DragEvent) => {
    const target = e.target as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;
    
    if (!target.contains(relatedTarget)) {
      isDraggingOver.value = false;
    }
  };

  const onDrop = (e: DragEvent) => {
    isDraggingOver.value = false;
    if (!e.dataTransfer) return;

    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    const dropTarget = e.target as HTMLElement;
    const container = containerRef.value;
    
    if (!container) return;

    const children = Array.from(container.children);
    const dropIndex = children.findIndex(child => child.contains(dropTarget));
    
    moveItem(data.index, dropIndex === -1 ? items.value.length : dropIndex);
  };

  return {
    containerRef,
    containerStyle,
    isDraggingOver,
    moveItem,
    onDragEnter,
    onDragLeave,
    onDrop
  };
}