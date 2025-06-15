import { describe, it, expect } from 'vitest'

import { formatNumber as formatNumberUtil, formatCurrency as formatCurrencyUtil } from '../utils/formatters'
import { cn, formatNumber as formatNumberLib, formatCurrency as formatCurrencyLib } from '../lib/utils'

// 確保公用工具函式與 lib 工具函式運作正常

describe('工具函式測試', () => {
  const sampleNumber = 1234567
  const sampleCurrency = 10000

  it('formatNumber (utils) 應該正確格式化數字', () => {
    const formatted = formatNumberUtil(sampleNumber)
    expect(formatted).toBe('1,234,567')
  })

  it('formatNumber (lib) 應該與 utils 輸出一致', () => {
    const formatted = formatNumberLib(sampleNumber)
    expect(formatted).toBe(formatNumberUtil(sampleNumber))
  })

  it('formatCurrency (utils) 應該正確格式化貨幣字串', () => {
    const formatted = formatCurrencyUtil(sampleCurrency)
    expect(formatted).toMatch(/NT\$10,000/)
  })

  it('formatCurrency (lib) 應該輸出含有 10,000 數值', () => {
    const formatted = formatCurrencyLib(sampleCurrency)
    expect(formatted).toMatch(/10,000/)
  })

  it('cn 應該合併 className 並移除 falsy 項目', () => {
    const classes = cn('px-2', 'text-center', { hidden: false, 'bg-red-500': true })
    expect(classes.split(' ')).toContain('px-2')
    expect(classes.split(' ')).toContain('text-center')
    expect(classes.split(' ')).toContain('bg-red-500')
    expect(classes).not.toMatch(/hidden/)
  })
})