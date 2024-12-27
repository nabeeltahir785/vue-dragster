import { ref, watch } from 'vue';
import type { Ref } from 'vue';

interface SyncOptions {
  onSync?: (items: any[]) => void;
}

export function useContainerSync(
  sourceItems: Ref<any[]>,
  targetItems: Ref<any[]>,
  options: SyncOptions = {}
) {
  const isSyncing = ref(false);

  watch([sourceItems, targetItems], ([newSource, newTarget]) => {
    if (isSyncing.value) return;
    
    isSyncing.value = true;
    options.onSync?.([...newSource, ...newTarget]);
    isSyncing.value = false;
  });

  const syncContainers = (sourceId: string, targetId: string, item: any) => {
    isSyncing.value = true;
    
    if (sourceId === targetId) {
      // Handle reordering within the same container
      const items = sourceId === 'source' ? sourceItems : targetItems;
      const index = items.value.findIndex(i => i.id === item.id);
      if (index !== -1) {
        items.value.splice(index, 1);
        items.value.push(item);
      }
    } else {
      // Handle moving between containers
      const source = sourceId === 'source' ? sourceItems : targetItems;
      const target = targetId === 'source' ? sourceItems : targetItems;
      
      const index = source.value.findIndex(i => i.id === item.id);
      if (index !== -1) {
        const [movedItem] = source.value.splice(index, 1);
        target.value.push(movedItem);
      }
    }
    
    isSyncing.value = false;
  };

  return {
    isSyncing,
    syncContainers
  };
}