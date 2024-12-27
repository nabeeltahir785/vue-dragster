import { Ref } from 'vue';

interface Sortable {
  id: number;
  [key: string]: any;
}

export function useSort<T extends Sortable>(items: Ref<T[]>) {
  const onDragStart = (item: T) => {
    const currentIndex = items.value.findIndex(i => i.id === item.id);
    
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const targetItem = target.closest('.sortable-item');
      
      if (targetItem) {
        const targetId = Number(targetItem.getAttribute('data-id'));
        const targetIndex = items.value.findIndex(i => i.id === targetId);
        
        if (targetIndex !== currentIndex) {
          const [movedItem] = items.value.splice(currentIndex, 1);
          items.value.splice(targetIndex, 0, movedItem);
        }
      }
    };
    
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragend', () => {
      document.removeEventListener('dragover', handleDragOver);
    }, { once: true });
  };

  return {
    onDragStart
  };
}