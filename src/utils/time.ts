export function useFormatSeconds(seconds: number) {
    const s = Math.floor(seconds) % 60;
    seconds = Math.floor(seconds / 60);
    const i = seconds % 60;
    const ii = i < 10 ? `0${i}` : i;
    const ss = s < 10 ? `0${s}` : s;
    return ii + ':' + ss;
}

export function useFormatTime(time: number, format: string = 'yy-mm-dd') {
    const date = new Date(time)
    const formatObj = {
        yy: date.getFullYear(),
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        hh: date.getHours(),
        ii: date.getMinutes(),
        ss: date.getSeconds()
    }
    return format.replace(/(yy|mm|dd|hh|ii|ss)/ig, format => {
        const index = Object.keys(formatObj).findIndex(key => key === format)
        return Object.values(formatObj)[index].toString()
    })
}
