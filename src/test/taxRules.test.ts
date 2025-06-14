import { describe, it, expect } from 'vitest'
import {
  calculateDeductions,
  calculateTax,
  calculateNetIncome,
  calculateFullTaxInfo,
  TAX_BRACKETS,
  EXEMPTION_AMOUNTS,
  STANDARD_DEDUCTIONS
} from '../data/taxRules'

describe('稅務計算邏輯測試', () => {

  describe('calculateDeductions - 扣除額計算', () => {

    it('應該正確計算單身標準扣除額', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 500000
      }

      const result = calculateDeductions(params)

      expect(result.exemptions).toBe(EXEMPTION_AMOUNTS.standard) // 97,000
      expect(result.generalDeductions).toBe(STANDARD_DEDUCTIONS[0].amount) // 131,000
      expect(result.familySize).toBe(1)
    })

    it('應該正確計算已婚標準扣除額', () => {
      const params = {
        isMarried: true,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 1000000
      }

      const result = calculateDeductions(params)

      expect(result.exemptions).toBe(EXEMPTION_AMOUNTS.standard * 2) // 194,000
      expect(result.generalDeductions).toBe(STANDARD_DEDUCTIONS[1].amount) // 262,000
      expect(result.familySize).toBe(2)
    })

    it('應該正確計算70歲以上長輩免稅額', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 2,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 800000
      }

      const result = calculateDeductions(params)

      // 本人 + 2位70歲以上長輩
      const expectedExemptions = EXEMPTION_AMOUNTS.standard + (EXEMPTION_AMOUNTS.elderly * 2)
      expect(result.exemptions).toBe(expectedExemptions) // 97,000 + 145,500 * 2 = 388,000
      expect(result.familySize).toBe(3)
    })

    it('應該正確計算幼兒學前特別扣除額', () => {
      const params = {
        isMarried: true,
        childrenCount: 3, // 3個6歲以下子女
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 2000000
      }

      const result = calculateDeductions(params)

      // 第1名：150,000，第2名起：225,000 * 2 = 450,000
      const expectedChildrenDeduction = 150000 + (225000 * 2)
      expect(result.breakdown.childrenDeduction).toBe(expectedChildrenDeduction) // 600,000
    })

    it('應該正確計算教育學費特別扣除額', () => {
      const params = {
        isMarried: true,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 2, // 2個大專學生
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 1500000
      }

      const result = calculateDeductions(params)

      expect(result.breakdown.educationDeduction).toBe(50000) // 25,000 * 2
    })

    it('應該正確計算身心障礙特別扣除額', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 1, // 1位身心障礙者
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 800000
      }

      const result = calculateDeductions(params)

      expect(result.breakdown.disabilityDeduction).toBe(218000)
    })

    it('應該正確計算長期照顧特別扣除額', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        longTermCareCount: 1, // 1位長期照顧需求者
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 600000
      }

      const result = calculateDeductions(params)

      expect(result.breakdown.longTermCareDeduction).toBe(120000)
    })

    it('應該正確計算儲蓄投資特別扣除額（有上限）', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 300000, // 超過上限270,000
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 1000000
      }

      const result = calculateDeductions(params)

      expect(result.breakdown.savingsDeduction).toBe(270000) // 上限270,000
    })

    it('應該正確計算房屋租金特別扣除額（有上限）', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 200000, // 超過上限180,000
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 800000
      }

      const result = calculateDeductions(params)

      expect(result.breakdown.rentalDeduction).toBe(180000) // 上限180,000
    })

    it('應該正確計算列舉扣除額', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 50000,
        useItemizedDeduction: true,
        donations: 100000,
        insurancePremiums: 30000, // 超過單人限額24,000
        healthInsurancePremiums: 20000,
        medicalExpenses: 50000,
        disasterLoss: 0,
        mortgageInterest: 200000,
        grossIncome: 1000000
      }

      const result = calculateDeductions(params)

            // 列舉扣除額計算：
      // 捐贈：min(100000, 1000000 * 0.2) = 100000
      // 人身保險費：min(30000, 24000) = 24000
      // 健保費：20000（無限制）
      // 醫療費：50000
      // 房貸利息：min(200000, 300000) - min(50000, 270000) = 150000
      // 總計：344000（實際計算結果）
      // 標準扣除額：131000
      // 應選擇較高的列舉扣除額：344000

      expect(result.generalDeductions).toBe(344000)
    })

    it('應該在列舉扣除額低於標準扣除額時選擇標準扣除額', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: true,
        donations: 50000, // 列舉總額低於標準扣除額
        insurancePremiums: 20000,
        medicalExpenses: 30000,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 800000
      }

      const result = calculateDeductions(params)

      // 列舉扣除額總計：100000
      // 標準扣除額：131000
      // 應選擇較高的標準扣除額
      expect(result.generalDeductions).toBe(131000)
    })

    it('應該正確計算基本生活費差額', () => {
      const params = {
        isMarried: true,
        childrenCount: 2,
        elderlyCount: 1,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 3000000
      }

      const result = calculateDeductions(params)

      // 家庭人數：2(夫妻) + 2(子女) + 1(長輩) = 5人
      // 基本生活費：5 * 210000 = 1,050,000
      // 比較項目：免稅額 + 一般扣除額 + 特別扣除額
      expect(result.familySize).toBe(5)
      expect(result.basicLivingDifference).toBeGreaterThanOrEqual(0)
    })
  })

  describe('calculateTax - 稅額計算', () => {

    it('應該正確計算5%稅率級距', () => {
      const netIncome = 500000 // 50萬，適用5%稅率
      const result = calculateTax(netIncome)

      expect(result.bracketInfo.rate).toBe(5)
      expect(result.bracketInfo.progressiveDifference).toBe(0)
      expect(result.taxAmount).toBe(25000) // 500000 * 0.05 - 0
      expect(result.effectiveRate).toBe(5)
    })

    it('應該正確計算12%稅率級距', () => {
      const netIncome = 1000000 // 100萬，適用12%稅率
      const result = calculateTax(netIncome)

      expect(result.bracketInfo.rate).toBe(12)
      expect(result.bracketInfo.progressiveDifference).toBe(41300)
      expect(result.taxAmount).toBe(78700) // 1000000 * 0.12 - 41300
      expect(result.effectiveRate).toBeCloseTo(7.87, 2)
    })

    it('應該正確計算20%稅率級距', () => {
      const netIncome = 2000000 // 200萬，適用20%稅率
      const result = calculateTax(netIncome)

      expect(result.bracketInfo.rate).toBe(20)
      expect(result.bracketInfo.progressiveDifference).toBe(147700)
      expect(result.taxAmount).toBe(252300) // 2000000 * 0.20 - 147700
      expect(result.effectiveRate).toBeCloseTo(12.615, 2)
    })

    it('應該正確計算30%稅率級距', () => {
      const netIncome = 3500000 // 350萬，適用30%稅率
      const result = calculateTax(netIncome)

      expect(result.bracketInfo.rate).toBe(30)
      expect(result.bracketInfo.progressiveDifference).toBe(413700)
      expect(result.taxAmount).toBe(636300) // 3500000 * 0.30 - 413700
      expect(result.effectiveRate).toBeCloseTo(18.18, 2)
    })

    it('應該正確計算40%稅率級距', () => {
      const netIncome = 6000000 // 600萬，適用40%稅率
      const result = calculateTax(netIncome)

      expect(result.bracketInfo.rate).toBe(40)
      expect(result.bracketInfo.progressiveDifference).toBe(911700)
      expect(result.taxAmount).toBe(1488300) // 6000000 * 0.40 - 911700
      expect(result.effectiveRate).toBeCloseTo(24.81, 2)
    })

    it('應該處理零收入情況', () => {
      const netIncome = 0
      const result = calculateTax(netIncome)

      expect(result.taxAmount).toBe(0)
      expect(result.effectiveRate).toBe(0)
    })

    it('應該處理負數收入情況', () => {
      const netIncome = -100000
      const result = calculateTax(netIncome)

      expect(result.taxAmount).toBe(0) // 稅額不能為負
      expect(result.effectiveRate).toBe(0)
    })
  })

  describe('calculateNetIncome - 所得淨額計算', () => {

    it('應該正確計算所得淨額', () => {
      const grossIncome = 1000000
      const deductions = {
        totalDeductions: 300000,
        exemptions: 97000,
        generalDeductions: 131000,
        specialDeductions: 72000,
        basicLivingDifference: 0,
        familySize: 1,
        breakdown: {
          standardDeduction: 131000,
          itemizedDeduction: 0,
          salaryDeduction: 0,
          childrenDeduction: 0,
          educationDeduction: 0,
          disabilityDeduction: 0,
          longTermCareDeduction: 0,
          savingsDeduction: 0,
          rentalDeduction: 0
        }
      }

      const netIncome = calculateNetIncome(grossIncome, deductions)

      expect(netIncome).toBe(700000) // 1000000 - 300000
    })

    it('應該處理扣除額大於總收入的情況', () => {
      const grossIncome = 200000
      const deductions = {
        totalDeductions: 300000,
        exemptions: 97000,
        generalDeductions: 131000,
        specialDeductions: 72000,
        basicLivingDifference: 0,
        familySize: 1,
        breakdown: {
          standardDeduction: 131000,
          itemizedDeduction: 0,
          salaryDeduction: 0,
          childrenDeduction: 0,
          educationDeduction: 0,
          disabilityDeduction: 0,
          longTermCareDeduction: 0,
          savingsDeduction: 0,
          rentalDeduction: 0
        }
      }

      const netIncome = calculateNetIncome(grossIncome, deductions)

      expect(netIncome).toBe(0) // 不能為負數
    })
  })

  describe('calculateFullTaxInfo - 完整稅務資訊計算', () => {

    it('應該正確計算完整的稅務資訊', () => {
      const params = {
        isMarried: true,
        childrenCount: 2,
        elderlyCount: 0,
        studentCount: 1,
        disabledCount: 0,
        rentalExpenses: 150000,
        savingsInterest: 100000,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 2000000
      }

      const result = calculateFullTaxInfo(params)

      expect(result.grossIncome).toBe(2000000)
      expect(result.deductions).toBeDefined()
      expect(result.netIncome).toBeGreaterThan(0)
      expect(result.taxAmount).toBeGreaterThanOrEqual(0)
      expect(result.effectiveRate).toBeGreaterThanOrEqual(0)
      expect(result.afterTaxIncome).toBe(result.grossIncome - result.taxAmount)
      expect(result.bracketInfo).toBeDefined()
    })

    it('應該處理高收入家庭的複雜情況', () => {
      const params = {
        isMarried: true,
        childrenCount: 3,
        elderlyCount: 2,
        studentCount: 2,
        disabledCount: 1,
        longTermCareCount: 1,
        rentalExpenses: 180000,
        savingsInterest: 270000,
        useItemizedDeduction: true,
        donations: 500000,
        insurancePremiums: 120000, // 5人 * 24000
        healthInsurancePremiums: 50000,
        medicalExpenses: 200000,
        disasterLoss: 0,
        mortgageInterest: 300000,
        grossIncome: 5000000
      }

      const result = calculateFullTaxInfo(params)

      expect(result.grossIncome).toBe(5000000)
      expect(result.deductions.familySize).toBe(10) // 夫妻2 + 子女3 + 長輩2 + 學生2 + 身障1 = 10
      expect(result.taxAmount).toBeGreaterThan(0)
      expect(result.effectiveRate).toBeGreaterThan(0)
      expect(result.afterTaxIncome).toBeLessThan(result.grossIncome)
    })
  })

  describe('邊界條件測試', () => {

    it('應該處理稅率級距邊界值', () => {
      // 測試各級距的邊界值
      const boundaries = [590000, 1330000, 2660000, 4980000]

      boundaries.forEach(boundary => {
        const result = calculateTax(boundary)
        expect(result.taxAmount).toBeGreaterThanOrEqual(0)
        expect(result.effectiveRate).toBeGreaterThanOrEqual(0)
      })
    })

    it('應該處理極大收入值', () => {
      const netIncome = 100000000 // 1億
      const result = calculateTax(netIncome)

      expect(result.bracketInfo.rate).toBe(40)
      expect(result.taxAmount).toBe(39088300) // 100000000 * 0.40 - 911700
      expect(result.effectiveRate).toBeCloseTo(39.09, 2)
    })

    it('應該處理所有扣除額為零的情況', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 500000
      }

      const result = calculateFullTaxInfo(params)

      expect(result.deductions.totalDeductions).toBeGreaterThan(0) // 至少有免稅額和標準扣除額
      expect(result.netIncome).toBeLessThan(result.grossIncome)
    })
  })
})

describe('稅務常數驗證', () => {

  it('稅率級距應該正確設定', () => {
    expect(TAX_BRACKETS).toHaveLength(5)
    expect(TAX_BRACKETS[0].rate).toBe(5)
    expect(TAX_BRACKETS[1].rate).toBe(12)
    expect(TAX_BRACKETS[2].rate).toBe(20)
    expect(TAX_BRACKETS[3].rate).toBe(30)
    expect(TAX_BRACKETS[4].rate).toBe(40)
  })

  it('免稅額應該正確設定', () => {
    expect(EXEMPTION_AMOUNTS.standard).toBe(97000)
    expect(EXEMPTION_AMOUNTS.elderly).toBe(145500)
  })

  it('標準扣除額應該正確設定', () => {
    expect(STANDARD_DEDUCTIONS[0].amount).toBe(131000) // 單身
    expect(STANDARD_DEDUCTIONS[1].amount).toBe(262000) // 夫妻
  })
})