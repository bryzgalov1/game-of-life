export const CellStatus = {
    LIVE: 1,
    DEAD: 0,
} as const;

export type TCellStatus = typeof CellStatus[keyof typeof CellStatus];

export type TLifeList = TCellStatus[];

export const GenerationStatus = {
    WAS_BORN: 'WAS_BORN',
    DIED: 'DIED',
    DID_NOT_CHANGE: 'DID_NOT_CHANGE',
} as const;

export type TGenerationStatus = keyof typeof GenerationStatus;

export type TNeighbourIndexs = number[];
