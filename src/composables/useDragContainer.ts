import { ref, computed } from 'vue';
import { useHistory } from './useHistory';
import type { DragOperation } from '../types/history';

export function useDragContainer<T extends { id: string | number }>(
  initialItems: T[] = []
) {
  const items = ref<T[]>(initialItems);
  
  const { 
    canUndo, 
    canRedo, 
    addOperation, 
    undo, 
    redo 
  } = useHistory({
    onUndo: (operation) => applyOperation(operation, true),
    onRedo: (operation) => applyOperation(operation, false)
  });

  const applyOperation = (operation: DragOperation, isUndo: boolean) => {
    const { type, fromIndex, toIndex, item } = operation;
    
    switch (type) {
      case 'move': {
        const [movedItem] = items.value.splice(
          isUndo ? toIndex : fromIndex, 
          1
        );
        items.value.splice(
          isUndo ? fromIndex : toIndex, 
          0, 
          movedItem
        );
        break;
      }
      case 'add': {
        if (isUndo) {
          items.value.splice(toIndex, 1);
        } else {
          items.value.splice(toIndex, 0, item as T);
        }
        break;
      }
      case 'remove': {
        if (isUndo) {
          items.value.splice(fromIndex, 0, item as T);
        } else {
          items.value.splice(fromIndex, 1);
        }
        break;
      }
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const [movedItem] = items.value.splice(fromIndex, 1);
    items.value.splice(toIndex, 0, movedItem);

    addOperation({
      type: 'move',
      sourceId: 'container',
      targetId: 'container',
      item: movedItem,
      fromIndex,
      toIndex
    });
  };

  const addItem = (item: T, index: number = items.value.length) => {
    items.value.splice(index, 0, item);
    
    addOperation({
      type: 'add',
      sourceId: 'external',
      targetId: 'container',
      item,
      fromIndex: -1,
      toIndex: index
    });
  };

  const removeItem = (index: number) => {
    const [removedItem] = items.value.splice(index, 1);
    
    addOperation({
      type: 'remove',
      sourceId: 'container',
      targetId: 'external',
      item: removedItem,
      fromIndex: index,
      toIndex: -1
    });
  };

  return {
    items: computed(() => items.value),
    moveItem,
    addItem,
    removeItem,
    canUndo,
    canRedo,
    undo,
    redo
  };
}