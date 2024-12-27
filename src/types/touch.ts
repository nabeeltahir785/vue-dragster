import {Position} from "./index";

export interface TouchOptions {
  readonly enabled?: boolean;
  readonly delay?: number;
  readonly distance?: number;
  readonly tapTimeout?: number;
  readonly longPressTimeout?: number;
  readonly cancelOnScroll?: boolean;
}

export interface TouchState {
  readonly isActive: boolean;
  readonly startPosition: Position;
  readonly currentPosition: Position;
  readonly deltaX: number;
  readonly deltaY: number;
  readonly velocity: Position;
  readonly pressure: number;
}
