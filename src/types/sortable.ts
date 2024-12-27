export interface SortableOptions {
    readonly group?: string;
    readonly animation?: number;
    readonly direction?: 'vertical' | 'horizontal' | 'both';
    readonly ghostClass?: string;
    readonly chosenClass?: string;
    readonly dragClass?: string;
    readonly forceFallback?: boolean;
    readonly fallbackClass?: string;
    readonly fallbackOnBody?: boolean;
    readonly scrollSensitivity?: number;
    readonly scrollSpeed?: number;
}