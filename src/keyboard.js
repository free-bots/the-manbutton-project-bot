const KEY_HEIGHT = 50;
const KEY_WIDTH = 50;
const KEY_BUFFER = 5;
const KEY_SPACING = 12;

const FIRST_ROW_X = 194;
const FIRST_ROW_Y = 322;
const SECOND_ROW_X = 230;
const SECOND_ROW_Y = 390;
const THIRD_ROW_X = 264;
const THIRD_ROW_Y = 454;

const FIRST_ROW = ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'];
const SECOND_ROW = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const THIRD_ROW = ['y', 'x', 'c', 'v', 'b', 'n', 'm'];

const calculateRow = (keys, xStart, yStart, keyBuffer, keySpacing, keyWidth, keyHeight) => {
    let nextX = 0;
    return keys.map((key, index, array) => {
        const x = xStart + nextX;

        if (index < array.length - 1) {
            nextX += keyWidth + keySpacing;
        }

        return ({
            key: key, bounds: {
                topLeft: {
                    x: x + keyBuffer,
                    y: yStart + keyBuffer,
                },
                topRight: {
                    x: x + keyWidth - keyBuffer,
                    y: yStart + keyBuffer,
                },
                bottomLeft: {
                    x: x + keyBuffer,
                    y: yStart + keyHeight - keyBuffer,
                },
                bottomRight: {
                    x: x + keyWidth - keyBuffer,
                    y: yStart + keyHeight - keyBuffer,
                }
            }
        })
    })
}

module.exports.Keyboard = [
    ...calculateRow(FIRST_ROW, FIRST_ROW_X, FIRST_ROW_Y, KEY_BUFFER, KEY_SPACING, KEY_WIDTH, KEY_HEIGHT),
    ...calculateRow(SECOND_ROW, SECOND_ROW_X, SECOND_ROW_Y, KEY_BUFFER, KEY_SPACING, KEY_WIDTH, KEY_HEIGHT),
    ...calculateRow(THIRD_ROW, THIRD_ROW_X, THIRD_ROW_Y, KEY_BUFFER, KEY_SPACING, KEY_WIDTH, KEY_HEIGHT),
];
