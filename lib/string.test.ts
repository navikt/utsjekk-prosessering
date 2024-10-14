import { expect, test } from 'vitest'
import { deslugify, slugifyUpperCase } from '@/lib/string.ts'

test('deslugify', () => {
    expect(deslugify('DETTE_ER_EN_TEST')).toEqual('Dette er en test')
    expect(deslugify('test')).toEqual('Test')
    expect(deslugify('Test')).toEqual('Test')
    expect(deslugify('')).toEqual('')

    const raw = 'Dette er en test'
    expect(deslugify(slugifyUpperCase(raw))).toEqual(raw)
})

test('slugifyUpperCase', () => {
    expect(slugifyUpperCase('Dette er en test')).toEqual('DETTE_ER_EN_TEST')
    expect(slugifyUpperCase('test')).toEqual('TEST')
    expect(slugifyUpperCase('')).toEqual('')

    const slug = 'DETTE_ER_EN_TEST'
    expect(slugifyUpperCase(deslugify(slug))).toEqual(slug)
})
