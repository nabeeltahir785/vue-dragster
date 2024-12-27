export type OperationType = 'move' | 'add' | 'remove' | 'reorder' | 'swap';

export interface DragOperation<T = unknown> {
  readonly type: OperationType;
  readonly sourceId: string;
  readonly targetId: string;
  readonly item: T;
  readonly fromIndex: number;
  readonly toIndex: number;
  readonly timestamp: number;
  readonly metadata?: Record<string, unknown>;
}

export interface HistoryState<T = unknown> {
  readonly past: DragOperation<T>[];
  readonly future: DragOperation<T>[];
  readonly maxSize: number;
  readonly currentIndex: number;
}

export interface UndoRedoOptions<T = unknown> {
  readonly maxHistorySize?: number;
  readonly onUndo?: (operation: DragOperation<T>) => void | Promise<void>;
  readonly onRedo?: (operation: DragOperation<T>) => void | Promise<void>;
  readonly mergeWindow?: number;
  readonly clearOnError?: boolean;
}