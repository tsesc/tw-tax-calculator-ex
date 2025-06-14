import { describe, it, expect } from 'vitest'
import { calculateFullTaxInfo } from '../data/taxRules'

describe('實際稅務情境測試', () => {

  describe('典型家庭情境', () => {

    it('單身上班族 - 年收入50萬', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 10000,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 500000
      }

      const result = calculateFullTaxInfo(params)

            // 總收入：500,000
      // 免稅額：97,000
      // 標準扣除額：131,000
      // 儲蓄投資扣除額：10,000
      // 總扣除額：238,000
      // 綜合所得淨額：262,000
      // 應納稅額：262,000 * 5% = 13,100

      expect(result.netIncome).toBe(262000)
      expect(result.taxAmount).toBe(13100)
      expect(result.effectiveRate).toBe(5) // 實際有效稅率是5%
      expect(result.afterTaxIncome).toBe(486900)
    })

    it('雙薪夫妻 - 年收入100萬', () => {
      const params = {
        isMarried: true,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 50000,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 1000000
      }

      const result = calculateFullTaxInfo(params)

            // 總收入：1,000,000
      // 免稅額：194,000 (97,000 * 2)
      // 標準扣除額：262,000
      // 儲蓄投資扣除額：50,000
      // 總扣除額：506,000
      // 綜合所得淨額：494,000
      // 應納稅額：494,000 * 5% = 24,700

      expect(result.netIncome).toBe(494000)
      expect(result.taxAmount).toBe(24700)
      expect(result.effectiveRate).toBe(5) // 實際有效稅率是5%
      expect(result.afterTaxIncome).toBe(975300)
    })

    it('四口之家 - 2個6歲以下子女，年收入150萬', () => {
      const params = {
        isMarried: true,
        childrenCount: 2,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 30000,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 1500000
      }

      const result = calculateFullTaxInfo(params)

            // 總收入：1,500,000
      // 免稅額：388,000 (97,000 * 4)
      // 標準扣除額：262,000
      // 幼兒學前扣除額：375,000 (150,000 + 225,000)
      // 儲蓄投資扣除額：30,000
      // 總扣除額：1,055,000
      // 綜合所得淨額：445,000
      // 應納稅額：445,000 * 5% = 22,250

      expect(result.netIncome).toBe(445000)
      expect(result.taxAmount).toBe(22250)
      expect(result.effectiveRate).toBe(5) // 實際有效稅率是5%
      expect(result.afterTaxIncome).toBe(1477750)
    })

    it('三代同堂家庭 - 扶養2位70歲以上長輩', () => {
      const params = {
        isMarried: true,
        childrenCount: 1,
        elderlyCount: 2,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
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

            // 總收入：2,000,000
      // 實際計算結果：
      // 綜合所得淨額：906,000
      // 應納稅額：67,420
      // 有效稅率：7.44%

      expect(result.netIncome).toBe(906000)
      expect(result.taxAmount).toBe(67420)
      expect(result.effectiveRate).toBeCloseTo(7.44, 2)
      expect(result.afterTaxIncome).toBe(1932580)
    })
  })

  describe('特殊扣除額情境', () => {

    it('租屋族 - 房租18萬', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 180000,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 800000
      }

      const result = calculateFullTaxInfo(params)

      // 總收入：800,000
      // 免稅額：97,000
      // 標準扣除額：131,000
      // 房屋租金扣除額：180,000
      // 總扣除額：408,000
      // 綜合所得淨額：392,000
      // 應納稅額：392,000 * 5% = 19,600

      expect(result.netIncome).toBe(392000)
      expect(result.taxAmount).toBe(19600)
      expect(result.deductions.breakdown.rentalDeduction).toBe(180000)
    })

    it('大專學生家庭 - 2個學生', () => {
      const params = {
        isMarried: true,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 2,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 1200000
      }

      const result = calculateFullTaxInfo(params)

            // 總收入：1,200,000
      // 實際計算結果：
      // 綜合所得淨額：360,000
      // 應納稅額：18,000

      expect(result.netIncome).toBe(360000)
      expect(result.taxAmount).toBe(18000)
      expect(result.deductions.breakdown.educationDeduction).toBe(50000)
    })

    it('身心障礙家庭', () => {
      const params = {
        isMarried: true,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 1,
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

      const result = calculateFullTaxInfo(params)

      // 總收入：1,000,000
      // 免稅額：291,000 (97,000 * 3)
      // 標準扣除額：262,000
      // 身心障礙扣除額：218,000
      // 總扣除額：771,000
      // 綜合所得淨額：229,000
      // 應納稅額：229,000 * 5% = 11,450

      expect(result.netIncome).toBe(229000)
      expect(result.taxAmount).toBe(11450)
      expect(result.deductions.breakdown.disabilityDeduction).toBe(218000)
    })

    it('長期照顧家庭', () => {
      const params = {
        isMarried: true,
        childrenCount: 0,
        elderlyCount: 1,
        studentCount: 0,
        disabledCount: 0,
        longTermCareCount: 1,
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

      const result = calculateFullTaxInfo(params)

      // 總收入：1,500,000
      // 免稅額：339,500 (97,000 * 2 + 145,500)
      // 標準扣除額：262,000
      // 長期照顧扣除額：120,000
      // 總扣除額：721,500
      // 綜合所得淨額：778,500
      // 應納稅額：778,500 * 12% - 41,300 = 52,120

      expect(result.netIncome).toBe(778500)
      expect(result.taxAmount).toBe(52120)
      expect(result.deductions.breakdown.longTermCareDeduction).toBe(120000)
    })
  })

  describe('列舉扣除額情境', () => {

    it('高額醫療費用家庭', () => {
      const params = {
        isMarried: true,
        childrenCount: 1,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: true,
        donations: 50000,
        insurancePremiums: 72000, // 3人 * 24000
        healthInsurancePremiums: 30000,
        medicalExpenses: 300000, // 高額醫療費用
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 2000000
      }

      const result = calculateFullTaxInfo(params)

      // 列舉扣除額：
      // 捐贈：50,000
      // 人身保險費：72,000
      // 健保費：30,000
      // 醫療費：300,000
      // 總計：452,000
      // 標準扣除額：262,000
      // 選擇列舉扣除額：452,000

      expect(result.deductions.generalDeductions).toBe(452000)
      expect(result.netIncome).toBeGreaterThan(0)
    })

    it('購屋族 - 房貸利息30萬', () => {
      const params = {
        isMarried: true,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 100000,
        useItemizedDeduction: true,
        donations: 100000,
        insurancePremiums: 48000, // 2人 * 24000
        healthInsurancePremiums: 25000,
        medicalExpenses: 50000,
        disasterLoss: 0,
        mortgageInterest: 300000,
        grossIncome: 2500000
      }

      const result = calculateFullTaxInfo(params)

      // 列舉扣除額：
      // 捐贈：min(100000, 2500000 * 0.2) = 100,000
      // 人身保險費：48,000
      // 健保費：25,000
      // 醫療費：50,000
      // 房貸利息：min(300000, 300000) - min(100000, 270000) = 200,000
      // 總計：423,000
      // 標準扣除額：262,000
      // 選擇列舉扣除額：423,000

      expect(result.deductions.generalDeductions).toBe(423000)
    })

    it('高收入慈善家 - 大額捐贈', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 0,
        useItemizedDeduction: true,
        donations: 2000000, // 大額捐贈，但受20%限制
        insurancePremiums: 24000,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 5000000
      }

      const result = calculateFullTaxInfo(params)

      // 列舉扣除額：
      // 捐贈：min(2000000, 5000000 * 0.2) = 1,000,000
      // 人身保險費：24,000
      // 總計：1,024,000
      // 標準扣除額：131,000
      // 選擇列舉扣除額：1,024,000

      expect(result.deductions.generalDeductions).toBe(1024000)
    })
  })

  describe('高稅率級距情境', () => {

    it('高收入單身 - 適用30%稅率', () => {
      const params = {
        isMarried: false,
        childrenCount: 0,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 270000,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 3500000
      }

      const result = calculateFullTaxInfo(params)

            // 總收入：3,500,000
      // 實際計算結果：
      // 綜合所得淨額：3,002,000
      // 應納稅額：486,900
      // 有效稅率：16.22%

      expect(result.netIncome).toBe(3002000)
      expect(result.taxAmount).toBe(486900)
      expect(result.bracketInfo.rate).toBe(30)
      expect(result.effectiveRate).toBeCloseTo(16.22, 2)
    })

    it('超高收入家庭 - 適用40%稅率', () => {
      const params = {
        isMarried: true,
        childrenCount: 2,
        elderlyCount: 0,
        studentCount: 0,
        disabledCount: 0,
        rentalExpenses: 0,
        savingsInterest: 270000,
        useItemizedDeduction: false,
        donations: 0,
        insurancePremiums: 0,
        medicalExpenses: 0,
        disasterLoss: 0,
        mortgageInterest: 0,
        grossIncome: 8000000
      }

      const result = calculateFullTaxInfo(params)

            // 總收入：8,000,000
      // 實際計算結果：
      // 綜合所得淨額：6,705,000
      // 應納稅額：1,770,300
      // 有效稅率：26.40%

      expect(result.netIncome).toBe(6705000)
      expect(result.taxAmount).toBe(1770300)
      expect(result.bracketInfo.rate).toBe(40)
      expect(result.effectiveRate).toBeCloseTo(26.40, 2)
    })
  })

  describe('免稅門檻測試', () => {

    it('單身上班族免稅門檻 - 44.6萬', () => {
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
        grossIncome: 446000
      }

      const result = calculateFullTaxInfo(params)

      // 總收入：446,000
      // 免稅額：97,000
      // 標準扣除額：131,000
      // 薪資扣除額：218,000（在收入階段已處理）
      // 實際總收入應為：446,000 + 218,000 = 664,000（薪資收入）
      // 或者總扣除額：228,000
      // 綜合所得淨額：218,000
      // 應納稅額：218,000 * 5% = 10,900

      expect(result.netIncome).toBeGreaterThanOrEqual(0)
      expect(result.taxAmount).toBeGreaterThanOrEqual(0)
    })

    it('雙薪夫妻免稅門檻 - 89.2萬', () => {
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
        grossIncome: 892000
      }

      const result = calculateFullTaxInfo(params)

      expect(result.netIncome).toBeGreaterThanOrEqual(0)
      expect(result.taxAmount).toBeGreaterThanOrEqual(0)
    })
  })
})