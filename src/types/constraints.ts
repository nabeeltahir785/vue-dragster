export interface DragConstraints {
    readonly left?: number;
    readonly right?: number;
    readonly top?: number;
    readonly bottom?: number;
    readonly axis?: 'x' | 'y' | 'both';
    readonly grid?: [number, number];
    readonly containment?: HTMLElement | 'parent' | 'window';
}