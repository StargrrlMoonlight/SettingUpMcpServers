import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '../hooks/useLocalStorage'

describe('useLocalStorage hook', () => {
    beforeEach(() => {
        localStorage.clear()
        localStorage.getItem.mockReturnValue(null)
        vi.clearAllMocks()
    })

    it('should return initial value when localStorage is empty', () => {
        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'initialValue')
        )

        expect(result.current[0]).toBe('initialValue')
    })

    it('should return stored value when localStorage has data', () => {
        localStorage.setItem('testKey', JSON.stringify('storedValue'))
        localStorage.getItem.mockReturnValue(JSON.stringify('storedValue'))

        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'initialValue')
        )

        expect(result.current[0]).toBe('storedValue')
    })

    it('should update localStorage when value changes', () => {
        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'initialValue')
        )

        act(() => {
            result.current[1]('newValue')
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'))
        expect(result.current[0]).toBe('newValue')
    })

    it('should call onSave callback when value changes', () => {
        const onSave = vi.fn()
        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'initialValue', onSave)
        )

        act(() => {
            result.current[1]('newValue')
        })

        expect(onSave).toHaveBeenCalled()
    })

    it('should handle function updates', () => {
        const { result } = renderHook(() =>
            useLocalStorage('testKey', 0)
        )

        act(() => {
            result.current[1](prev => prev + 1)
        })

        expect(result.current[0]).toBe(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(1))
    })

    it('should handle complex objects', () => {
        const initialObj = { id: 1, name: 'test' }
        const { result } = renderHook(() =>
            useLocalStorage('testKey', initialObj)
        )

        const newObj = { id: 2, name: 'updated' }
        act(() => {
            result.current[1](newObj)
        })

        expect(result.current[0]).toEqual(newObj)
        expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(newObj))
    })

    it('should return fallback value when localStorage contains invalid JSON', () => {
        localStorage.getItem.mockReturnValue('invalid json')

        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'fallback')
        )

        expect(result.current[0]).toBe('fallback')
    })
})
