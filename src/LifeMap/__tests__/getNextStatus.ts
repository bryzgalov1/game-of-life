import LifeMap from '../index';
import { GenerationStatus } from '../types';

fit('getNextStatus', () => {
    const width = 3;
    const height = 3;

    const dataInit = new Uint8Array([
        1, 0, 0,
        0, 0, 1,
        0, 0, 1,
    ]);
    const lifeMap = new LifeMap(width, height, dataInit);

    const cellIndex = 4;
    const cellX = 1;
    const cellY = 1;

    const neighbourIndexs = lifeMap.getNeighbourIndexs(cellX, cellY);

    const nextStatus = lifeMap.getNextStatus(cellIndex, neighbourIndexs);

    expect(nextStatus).toEqual(GenerationStatus.WAS_BORN);
});
