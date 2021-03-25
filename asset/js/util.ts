export const getRandomNumber = (min: number, max: number, negative?: boolean): number => {
  let r = Math.random() * max + min;
  if (negative) r = Math.round(Math.random()) === 1 ? r : -r;
  return r;
}

export const getDistance = (sx: number, sy: number, tx: number, ty: number): number => {
  const disX = sx - tx;
  const disY = sy - ty;

  return Math.sqrt((disX * disX) + (disY * disY));
}