export interface AccessibilityOptions {
    readonly announcements?: {
        readonly onDragStart?: string;
        readonly onDragMove?: string;
        readonly onDragEnd?: string;
        readonly onDrop?: string;
        readonly onInvalidDrop?: string;
    };
    readonly role?: string;
    readonly tabIndex?: number;
    readonly focusable?: boolean;
    readonly describedBy?: string;
}