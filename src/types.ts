export type TGameData = {
    key: string;

    mode: 'build' | 'play';

    width: number;
    height: number;

    grain: number;
    grid: boolean;

    data: Uint8Array;
};

export const CellStatus = {
    LIVE: 1,
    DEAD: 0,
} as const;

export type TCellStatus = typeof CellStatus[keyof typeof CellStatus];

export type TFormData = {
    width: string;
    height: string;
    grain: string;
    grid: boolean;
};

export type TGameDataPart = Omit<TGameData, 'data' | 'mode' | 'key'>;
