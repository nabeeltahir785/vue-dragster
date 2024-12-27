export interface Position {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface AnimationOptions {
  readonly dragScale?: number;
  readonly duration?: {
    readonly drag?: number;
    readonly drop?: number;
    readonly shift?: number;
    readonly cancel?: number;
  };
  readonly easing?: {
    readonly drag?: string;
    readonly drop?: string;
    readonly shift?: string;
    readonly cancel?: string;
  };
  readonly disabled?: boolean;
  readonly customClasses?: {
    readonly dragging?: string;
    readonly dropping?: string;
    readonly cancelled?: string;
  };
}