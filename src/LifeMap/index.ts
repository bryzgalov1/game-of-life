import {
    CellStatus,
    GenerationStatus,
    TGenerationStatus,
    TNeighbourIndexs
} from "./types";

import log from "../utils/log";

class LifeMap {
    width: number;
    height: number;

    dataPrev: Uint8Array;
    dataMain: Uint8Array;

    neighbourIndexs: Record<string, TNeighbourIndexs>;

    constructor(width: number, height: number, dataInit: Uint8Array) {
        log.time("createNewLifeMap");
        this.width = width;
        this.height = height;

        this.dataMain = new Uint8Array(dataInit);
        this.dataPrev = new Uint8Array(dataInit);

        this.neighbourIndexs = {};
        log.timeEnd("createNewLifeMap");
    }

    getIndexByCellXY(cellX: number, cellY: number): number {
        const index = cellY * this.width + cellX;
        return index;
    }

    getNeighbourIndexs(cellX: number, cellY: number): TNeighbourIndexs {
        const cellXLeft = cellX - 1 !== -1 ? cellX - 1 : this.width - 1;

        let cellXRight = cellX + 1;
        if (cellXRight === this.width) {
            cellXRight = 0;
        }

        let cellYTop = cellY - 1;
        if (cellYTop === -1) {
            cellYTop = this.height - 1;
        }

        let cellYBottom = cellY + 1;
        if (cellYBottom === this.height) {
            cellYBottom = 0;
        }

        return [
            this.getIndexByCellXY(cellXLeft, cellY),
            this.getIndexByCellXY(cellXRight, cellY),

            this.getIndexByCellXY(cellXLeft, cellYTop),
            this.getIndexByCellXY(cellX, cellYTop),
            this.getIndexByCellXY(cellXRight, cellYTop),

            this.getIndexByCellXY(cellXLeft, cellYBottom),
            this.getIndexByCellXY(cellX, cellYBottom),
            this.getIndexByCellXY(cellXRight, cellYBottom),
        ];
    }

    getNeighbourIndexsСache(cellX: number, cellY: number): TNeighbourIndexs {
        const key = `${cellX}-${cellY}`;

        if (!this.neighbourIndexs[key]) {
            this.neighbourIndexs[key] = this.getNeighbourIndexs(cellX, cellY);
        }

        return this.neighbourIndexs[key];
    }

    getLiveLength(neighbourIndexs: number[]): number {
        const liveLength = neighbourIndexs.reduce((acc, itemIndex) => {
            return acc + this.dataMain[itemIndex];
        }, 0);

        return liveLength;
    }

    getNextStatus(cellIndex: number, neighbourIndexs: number[]): TGenerationStatus {
        const status = this.dataMain[cellIndex];

        const liveLength = this.getLiveLength(neighbourIndexs);

        if (status === CellStatus.DEAD) {
            if (liveLength === 3) {
                // Родится
                return GenerationStatus.WAS_BORN;
            }
        } else {
            // status === CellStatus.LIVE
            if (!(liveLength === 2 || liveLength === 3)) {
                // Умрёт
                return GenerationStatus.DIED;
            }
        }
        // Не изменится
        return GenerationStatus.DID_NOT_CHANGE;
    }

    generation() {
        log.time("generation");

        let cellIndex = 0;
        for (let cellY = 0; cellY < this.height; cellY++) {
            for (let cellX = 0; cellX < this.width; cellX++) {
                const neighbourIndexs = this.getNeighbourIndexsСache(cellX, cellY);

                const nextStatus = this.getNextStatus(cellIndex, neighbourIndexs);

                if (nextStatus === GenerationStatus.WAS_BORN) {
                    this.dataPrev[cellIndex] = CellStatus.LIVE;
                } else if (nextStatus === GenerationStatus.DIED) {
                    this.dataPrev[cellIndex] = CellStatus.DEAD;
                } else {
                    this.dataPrev[cellIndex] = this.dataMain[cellIndex];
                }
                cellIndex++;
            }
        }

        const tmp = this.dataPrev;

        this.dataPrev = this.dataMain;

        this.dataMain = tmp;

        log.timeEnd("generation");
    }
}

export default LifeMap;
