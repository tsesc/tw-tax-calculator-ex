// import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { useTaxCalculation } from '../hooks/useTaxCalculation'
import { TaxFormData } from '../types/tax'

// Helper to render a component that runs the hook and exposes its result
const executeHook = (formData: TaxFormData) => {
  let result: ReturnType<typeof useTaxCalculation> = null

  const TestComponent = () => {
    result = useTaxCalculation(formData)
    return null
  }

  render(<TestComponent />)
  return result
}

describe('useTaxCalculation Hook', () => {
  it('應該正確計算單身情境', () => {
    const formData: TaxFormData = {
      salaryIncome: '500000',
      otherIncome: '0',
      spouseSalaryIncome: '0',
      spouseOtherIncome: '0',
      isMarried: false,
      taxCalculationMethod: 'auto',
      childrenUnder6: '0',
      dependentsGeneral: '0',
      elderlyOver70: '0',
      students: '0',
      disabled: '0',
      rentalExpenses: '0',
      savingsInterest: '10000',
      longTermCare: '0',
      useItemizedDeduction: false,
      donations: '0',
      insurancePremiums: '0',
      healthInsurancePremiums: '0',
      medicalExpenses: '0',
      disasterLoss: '0',
      mortgageInterest: '0'
    }

    const result = executeHook(formData) as any

    expect(result).not.toBeNull()
    // 檢查稅率級距應為 5%
    expect(result.bracketInfo?.rate).toBe(5)
    // 有效稅率應 <= 5
    expect(result.effectiveRate).toBeLessThanOrEqual(5)
  })

  it('應該為已婚自動選擇最省稅方案並包含 allMethods', () => {
    const formData: TaxFormData = {
      salaryIncome: '600000',
      otherIncome: '100000',
      spouseSalaryIncome: '300000',
      spouseOtherIncome: '50000',
      isMarried: true,
      taxCalculationMethod: 'auto',
      childrenUnder6: '1',
      dependentsGeneral: '0',
      elderlyOver70: '0',
      students: '0',
      disabled: '0',
      rentalExpenses: '0',
      savingsInterest: '20000',
      longTermCare: '0',
      useItemizedDeduction: false,
      donations: '0',
      insurancePremiums: '0',
      healthInsurancePremiums: '0',
      medicalExpenses: '0',
      disasterLoss: '0',
      mortgageInterest: '0'
    }

    const result = executeHook(formData) as any

    expect(result).not.toBeNull()
    // chosenMethod 應該是三種之一
    expect(['combined', 'salary_separate', 'all_separate']).toContain(result.chosenMethod)
    // allMethods 應該含有三個鍵
    expect(result.allMethods).toBeDefined()
    expect(Object.keys(result.allMethods || {})).toEqual(
      expect.arrayContaining(['combined', 'salary_separate', 'all_separate'])
    )
    // savingsComparedToCombined 應 ≥ 0
    expect(result.savingsComparedToCombined).toBeGreaterThanOrEqual(0)
  })
})