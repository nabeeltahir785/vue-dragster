import type { Position } from '../types';

export function getIntersection(rect1: Position, rect2: Position): Position | null {
    const left = Math.max(rect1.x, rect2.x);
    const top = Math.max(rect1.y, rect2.y);
    const right = Math.min(rect1.x + rect1.width, rect2.x + rect2.width);
    const bottom = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);

    if (left < right && top < bottom) {
        return {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        };
    }

    return null;
}