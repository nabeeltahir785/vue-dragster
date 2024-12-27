import type { Position } from './index';
export interface BaseDragEvent extends DragEvent {
  readonly item: DragItemType;
  readonly source: HTMLElement;
}

export interface DragStartEvent extends BaseDragEvent {
  readonly initialPosition: Position;
  readonly sourceRect: DOMRect;
}

export interface DragEndEvent extends BaseDragEvent {
  readonly success: boolean;
  readonly finalPosition: Position;
  readonly duration: number;
}

export interface DropEvent extends BaseDragEvent {
  readonly target: HTMLElement;
  readonly dropPosition: Position;
  readonly isValidDrop: boolean;
}

export interface DragEnterEvent extends BaseDragEvent {
  readonly target: HTMLElement;
  readonly isValidTarget: boolean;
}

export interface DragLeaveEvent extends BaseDragEvent {
  readonly target: HTMLElement;
  readonly exitPoint: Position;
}

export interface DragMoveEvent extends BaseDragEvent {
  readonly target: HTMLElement | null;
  readonly clientX: number;
  readonly clientY: number;
  readonly deltaX: number;
  readonly deltaY: number;
  readonly velocity: Position;
}

export type DragItemType = unknown;