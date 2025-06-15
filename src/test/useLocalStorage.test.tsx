import React from 'react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { useLocalStorage } from '../hooks/useLocalStorage'

/**
 * 測試 useLocalStorage 自訂 hook 是否能夠：
 * 1. 讀取初始值
 * 2. 更新狀態並同步至 localStorage
 */

describe('useLocalStorage hook', () => {
  const TEST_KEY = 'unit-test-key'
  const INITIAL_VALUE = 'default'

  // 清理 localStorage，避免測試值互相汙染
  const clear = () => {
    window.localStorage.removeItem(TEST_KEY)
    window.localStorage.removeItem(`${TEST_KEY}-2`)
  }

  beforeEach(() => clear())
  afterEach(() => clear())

  it('應該在 localStorage 沒有資料時回傳初始值', () => {
    const TestComponent = () => {
      const [value] = useLocalStorage(TEST_KEY, INITIAL_VALUE)
      expect(value).toBe(INITIAL_VALUE)
      return null
    }

    render(<TestComponent />)
  })

  it('setValue 應該同步更新 localStorage', () => {
    let setValue: (v: string) => void = () => {}

    const TestComponent = () => {
      const [, setter] = useLocalStorage(`${TEST_KEY}-2`, INITIAL_VALUE)
      setValue = setter
      return null
    }

    render(<TestComponent />)

    act(() => {
      setValue('updated')
    })

    const stored = JSON.parse(window.localStorage.getItem(`${TEST_KEY}-2`) as string)
    expect(stored).toBe('updated')
  })
})