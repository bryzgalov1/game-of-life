const STEP_MIN_TIMEOUT = 1;
const STEP_MAX_TIMEOUT = 500;

const getGenerationTimeout = (percent: number) => {
    let timeout = Math.floor(STEP_MAX_TIMEOUT * percent / 100);
    if (timeout < STEP_MIN_TIMEOUT) {
        timeout = STEP_MIN_TIMEOUT;
    }

    return timeout;
};

export default getGenerationTimeout;

