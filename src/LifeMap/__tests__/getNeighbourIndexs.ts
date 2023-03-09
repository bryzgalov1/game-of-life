import LifeMap from '../index';

it('getNeighbourIndexs', () => {
    const width = 3;
    const height = 4;

    const dataInit = new Uint8Array([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 10, 11,
    ]);

    const lifeMap = new LifeMap(width, height, dataInit);

    const neighbourIndexs1 = lifeMap.getNeighbourIndexs(1, 1);
    expect(neighbourIndexs1.sort()).toEqual([0, 1, 2, 5, 8, 7, 6, 3].sort());

    const neighbourIndexs2 = lifeMap.getNeighbourIndexs(2, 1);
    expect(neighbourIndexs2.sort()).toEqual([1, 2, 0, 3, 6, 8, 7, 4].sort());
});