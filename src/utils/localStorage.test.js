import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getStoredData, setStoredData, clearAllData, exportData, importData } from '../utils/localStorage'

describe('localStorage utilities', () => {
    beforeEach(() => {
        // Reset all mocks
        vi.clearAllMocks()
        // Reset localStorage mock to return null by default
        localStorage.getItem.mockReturnValue(null)
    })

    describe('getStoredData', () => {
        it('should return parsed data when localStorage contains valid JSON', () => {
            const testData = { test: 'value' }
            localStorage.getItem.mockReturnValue(JSON.stringify(testData))

            const result = getStoredData('testKey', { default: 'fallback' })
            expect(result).toEqual(testData)
        })

        it('should return fallback value when localStorage is empty', () => {
            localStorage.getItem.mockReturnValue(null)
            const fallback = { default: 'fallback' }
            const result = getStoredData('nonexistentKey', fallback)
            expect(result).toEqual(fallback)
        })

        it('should return fallback value when localStorage contains invalid JSON', () => {
            localStorage.getItem.mockReturnValue('invalid json')
            const fallback = { default: 'fallback' }

            const result = getStoredData('invalidKey', fallback)
            expect(result).toEqual(fallback)
        })
    })

    describe('setStoredData', () => {
        it('should store data as JSON string in localStorage', () => {
            const testData = { test: 'value', number: 42 }
            setStoredData('testKey', testData)

            expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(testData))
        })

        it('should handle primitive values', () => {
            setStoredData('stringKey', 'test string')
            setStoredData('numberKey', 123)
            setStoredData('booleanKey', true)

            expect(localStorage.setItem).toHaveBeenCalledWith('stringKey', JSON.stringify('test string'))
            expect(localStorage.setItem).toHaveBeenCalledWith('numberKey', JSON.stringify(123))
            expect(localStorage.setItem).toHaveBeenCalledWith('booleanKey', JSON.stringify(true))
        })
    })

    describe('clearAllData', () => {
        it('should clear all localStorage data', () => {
            clearAllData()
            expect(localStorage.clear).toHaveBeenCalled()
        })
    })

    describe('exportData', () => {
        it('should export all stored data as JSON object', () => {
            localStorage.setItem('executiveTasks_todos', JSON.stringify([{ id: 1, text: 'test' }]))
            localStorage.setItem('executiveTasks_theme', JSON.stringify('dark'))

            // Mock localStorage.getItem to return our test data
            localStorage.getItem.mockImplementation((key) => {
                const data = {
                    'executiveTasks_todos': JSON.stringify([{ id: 1, text: 'test' }]),
                    'executiveTasks_theme': JSON.stringify('dark')
                }
                return data[key] || null
            })

            const exported = exportData()
            expect(exported).toEqual({
                todos: [{ id: 1, text: 'test' }],
                theme: 'dark'
            })
        })
    })

    describe('importData', () => {
        it('should import data and store in localStorage', () => {
            const testData = {
                todos: [{ id: 1, text: 'imported todo' }],
                theme: 'light'
            }

            importData(testData)

            expect(localStorage.setItem).toHaveBeenCalledWith('executiveTasks_todos', JSON.stringify(testData.todos))
            expect(localStorage.setItem).toHaveBeenCalledWith('executiveTasks_theme', JSON.stringify(testData.theme))
        })

        it('should handle empty import data', () => {
            importData({})
            expect(localStorage.setItem).not.toHaveBeenCalled()
        })
    })
})
