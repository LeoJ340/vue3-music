import { describe, expect, test } from 'vitest'
import useFormatCount from '@/utils/count'
import * as useTime from "@/utils/time";

describe('count', () => {
    test('输入8300000000，输出83亿', () => {
        expect(useFormatCount(8300000000)).toBe('83亿')
    })
    test('输入56000000，输出5千万', () => {
        expect(useFormatCount(56000000)).toBe('5千万')
    })
    test('输入85000，输出8万', () => {
        expect(useFormatCount(85000)).toBe('8万')
    })
})

describe('time', () => {
    const seconds = 8300000000
    test(`输入${seconds}，输出33:20`, () => {
        expect(useTime.useFormatSeconds(seconds)).toBe('33:20')
    })
    const timestamp = 1704940013024
    test(`输入${timestamp}，输出2024-1-11`, () => {
        expect(useTime.useFormatTime(timestamp)).toBe('2024-1-11')
    })
})
