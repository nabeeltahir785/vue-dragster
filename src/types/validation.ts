export interface DropValidation {
    readonly accept?: string | string[] | ((draggedItem: unknown) => boolean);
    readonly reject?: string | string[] | ((draggedItem: unknown) => boolean);
    readonly validateDrop?: (item: unknown, source: HTMLElement, target: HTMLElement) => boolean;
}