import LifeMap from '../index';

it('getLiveLength', () => {
    const width = 3;
    const height = 3;

    const dataInit = new Uint8Array([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ]);
    const lifeMap = new LifeMap(width, height, dataInit);

    const liveLength1 = lifeMap.getLiveLength([0, 4, 8]);
    expect(liveLength1).toEqual(3);

    const liveLength2 = lifeMap.getLiveLength([0, 1, 2, 3, 4]);
    expect(liveLength2).toEqual(2);
});
