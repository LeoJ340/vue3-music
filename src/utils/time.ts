export function useFormatTime(time: number = 0) {
    const s = Math.floor(time) % 60;
    time = Math.floor(time / 60);
    const i = time % 60;
    const ii = i < 10 ? `0${i}` : i;
    const ss = s < 10 ? `0${s}` : s;
    return ii + ':' + ss;
}
