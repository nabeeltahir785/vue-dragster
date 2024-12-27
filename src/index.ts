export { default as Draggable } from './components/Draggable.vue';
export { default as DroppableContainer } from './components/DroppableContainer.vue';
export { default as Droppable } from './components/Droppable.vue';

export { useDraggable } from './composables/useDraggable';
export { useDroppable } from './composables/useDroppable';
export { useDragStore } from './composables/useDragStore';
export { useAutoScroll } from './composables/useAutoScroll';
export { useVirtualization } from './composables/useVirtualization';

export type {
    DragOptions,
    DropOptions,
    DragStartEvent,
    DragEndEvent,
    DropEvent,
    DragPosition,
    SortableList,
    DragState,
    DropZone,
} from './types';

export {
    DragEvents,
    DropEvents,
    ScrollDirections,
    DragStates
} from './constants';

export {
    createDragContext,
    createDropContext,
    isDraggable,
    isDroppable
} from './utils';

export { default as DragDropPlugin } from './plugin';

export { defaultOptions } from './config';

export const VERSION = '1.0.0';

export type DragDropPluginOptions = {
    autoScroll?: boolean;
    virtualScroll?: boolean;
    undoRedo?: boolean;
    animations?: boolean;
    touchSupport?: boolean;
};

export function install(app: any, options?: DragDropPluginOptions) {
    app.use(DragDropPlugin, options);
}

export default {
    install,
    VERSION
};