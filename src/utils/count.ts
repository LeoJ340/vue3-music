function useFormatCount(count: number) {
    if (count > 100000000) {
        return `${Math.floor(count / 100000000)}亿`
    }

    if (count > 10000000) {
        return `${Math.floor(count / 10000000)}千万`
    }

    if (count > 10000) {
        return `${Math.floor(count / 10000)}万`
    }

    return count
}

export default useFormatCount
