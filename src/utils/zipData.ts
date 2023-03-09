type TDataStr = string;
type TZipStr = string;

// data : 1001110011010111100100100100100011101011010101100010101101101000010111011001100000000111110001000010
const zip = (data: TDataStr): TZipStr => {
    let zitStr: TZipStr = '';

    let start = 0;
    while (true) {
        let end = start + 32;
        const slice = data.slice(start, end);

        if (!slice) {
            break;
        }

        if (slice.length !== 32) {
            zitStr = zitStr + '--' + slice;
        } else {
            if (zitStr !== '') {
                zitStr = zitStr + '-';
            }

            const str = parseInt(`${slice}`, 2);

            zitStr = zitStr + str;
        }
        start = end;
    }
    return zitStr;
};

// 0-0-67108864-2-0--000000000
const unZip = (str: TZipStr): TDataStr => {
    let dataStr: TDataStr = '';

    const [data, ...last] = str.split('--');

    const list = data.split('-');

    for (const item of list) {
        const num = +item;

        let str = num.toString(2);

        if (str.length < 32) {
            str = str.padStart(32, '0');
        }

        dataStr = dataStr + str;
    }

    if (last.length) {
        dataStr = dataStr + last;
    }

    return dataStr;
};

const zipData = {
    zip,
    unZip,
};

export default zipData;
