const cv = require('@u4/opencv4nodejs');
const _ = require("lodash");
const {Keyboard} = require("./keyboard");

const LOWER_ORANGE = new cv.Vec3(19, 58, 210);
const UPPER_ORANGE = new cv.Vec3(26, 151, 254);

const LOWER_GREEN = new cv.Vec3(17, 125, 74);
const UPPER_GREEN = new cv.Vec3(26, 210, 77);

const LOWER_RED = new cv.Vec3(35, 17, 155);
const UPPER_RED = new cv.Vec3(42, 26, 240);

const getKeysFromMat = (mat, lowerColor, upperColor) => {
    const range = mat.inRange(lowerColor, upperColor);
    return range.findNonZeroAsync().then(detectedPoints => _.uniqBy(
        detectedPoints.map(point => Keyboard.find(keyMap => isInBounds(keyMap, point.x, point.y)))
            .filter(keyMap => !!keyMap)
            .map(keyMap => keyMap.key),
        key => key
    ));
}

const isInBounds = (key, x, y) => {
    const {bounds: {topLeft, topRight, bottomLeft, bottomRight}} = key;
    return (x >= topLeft.x && y >= topLeft.y) &&
        (x <= topRight.x && y >= topRight.y) &&
        (x >= bottomLeft.x && y <= bottomLeft.y) &&
        (x <= bottomRight.x && y <= bottomRight.y);
}

module.exports.detection = (buffer) => {
    const mat = cv.imdecode(buffer);
    return Promise.all([
        getKeysFromMat(mat, LOWER_ORANGE, UPPER_ORANGE),
        getKeysFromMat(mat, LOWER_GREEN, UPPER_GREEN),
        getKeysFromMat(mat, LOWER_RED, UPPER_RED)
    ])
}