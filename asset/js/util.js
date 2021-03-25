export const getRandomNumber = (min, max, negative) => {
    let r = Math.random() * max + min;
    if (negative)
        r = Math.round(Math.random()) === 1 ? r : -r;
    return r;
};
export const getDistance = (sx, sy, tx, ty) => {
    const disX = sx - tx;
    const disY = sy - ty;
    return Math.sqrt((disX * disX) + (disY * disY));
};
