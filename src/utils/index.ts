export * from './animations';
export * from './classes';
export * from './events';
export * from './touch';
export * from './geometry';
export * from './scroll';
export * from './validators';

import {
    createDragAnimation,
    createDropAnimation,
    createShiftAnimation,
    cancelAnimation,
    getElementPosition
} from './animations';

import {
    mergeClasses,
    computeDragClasses
} from './classes';

import {
    preventDefault,
    isInputElement,
    createCustomEvent
} from './events';

import {
    getTouchPoint,
    createDragImage,
    positionClone,
    getDistance
} from './touch';

import {
    getIntersection,
    getOverlap,
    getCenter,
    getCorners
} from './geometry';

import {
    autoScroll,
    getScrollParent,
    getScrollDirection,
    isScrollable
} from './scroll';

import {
    isValidDropTarget,
    isWithinBounds,
    isSameContainer,
    isValidTransfer
} from './validators';

export const DragUtils = {
    animations: {
        createDragAnimation,
        createDropAnimation,
        createShiftAnimation,
        cancelAnimation,
        getElementPosition
    },

    classes: {
        mergeClasses,
        computeDragClasses
    },

    events: {
        preventDefault,
        isInputElement,
        createCustomEvent
    },

    touch: {
        getTouchPoint,
        createDragImage,
        positionClone,
        getDistance
    },

    geometry: {
        getIntersection,
        getOverlap,
        getCenter,
        getCorners
    },

    scroll: {
        autoScroll,
        getScrollParent,
        getScrollDirection,
        isScrollable
    },

    validators: {
        isValidDropTarget,
        isWithinBounds,
        isSameContainer,
        isValidTransfer
    },

    // Helper functions that combine multiple utilities
    helpers: {
        /**
         * Creates and positions a drag preview
         */
        createDragPreview(element: HTMLElement, point: TouchPoint) {
            const clone = createDragImage(element);
            positionClone(clone, point);
            return clone;
        },

        /**
         * Checks if an element is a valid drop target with scroll handling
         */
        isValidDrop(source: HTMLElement, target: HTMLElement, options = {}) {
            return (
                isValidDropTarget(source, target, options) &&
                isWithinBounds(source, target) &&
                !isSameContainer(source, target)
            );
        },

        /**
         * Handles all cleanup after a drag operation
         */
        cleanup(element: HTMLElement, animation?: Animation) {
            cancelAnimation(animation);
            element.style.transform = '';
            element.style.opacity = '';
        }
    },

    constants: {
        DRAG_DELAY: 150,
        SCROLL_SPEED: 20,
        SCROLL_THRESHOLD: 50,
        MIN_DISTANCE: 3,
        ANIMATION_DURATION: 200
    },

    guards: {
        isDragEvent(event: Event): event is DragEvent {
            return event.type.startsWith('drag');
        },

        isTouchEvent(event: Event): event is TouchEvent {
            return event.type.startsWith('touch');
        }
    }
} as const;

export type DragUtilsType = typeof DragUtils;

export default DragUtils;