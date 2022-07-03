export function createRandom(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function getColorByBgColor(bgColor: string) {
  if (!bgColor) {
    return '#fff';
  }
  return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2
    ? '#000'
    : '#fff';
}
