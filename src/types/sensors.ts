export interface DragSensor {
    readonly name: string;
    readonly enabled: boolean;
    readonly options?: Record<string, unknown>;
}

export type SensorType = 'mouse' | 'touch' | 'keyboard' | 'pointer';
