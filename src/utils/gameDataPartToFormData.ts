import { TFormData, TGameDataPart } from "../types";

const gameDataPartToFormData = (data: TGameDataPart): TFormData => {
    return {
        width: `${data.width}`,
        height: `${data.height}`,
        grain: `${data.grain}`,
        grid: data.grid,
    };
};

export default gameDataPartToFormData;
