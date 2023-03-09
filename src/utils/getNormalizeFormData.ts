import { GRAIN_MAX, GRAIN_MIN, SIZE_MAX, SIZE_MIN } from "../config";
import {
    TFormData, TGameDataPart,
} from "../types";

const getNumberValue = (val: number, min: number, max: number): number => {
    if (val < min) {
        return min;
    }
    if (val > max) {
        return max;
    }
    return val;
};

const getNormalizeFormData = (formData: TFormData): TGameDataPart => {
    const width = getNumberValue(+formData.width, SIZE_MIN, SIZE_MAX);
    const height = getNumberValue(+formData.height, SIZE_MIN, SIZE_MAX);
    const grain = getNumberValue(+formData.grain, GRAIN_MIN, GRAIN_MAX);
    const grid = formData.grid;

    return {
        width,
        height,
        grain,
        grid,
    };
};

export default getNormalizeFormData;
