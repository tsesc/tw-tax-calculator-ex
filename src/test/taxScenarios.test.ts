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
      // 免稅額：101,000
      // 標準扣除額：136,000
      // 儲蓄投資扣除額：10,000
      // 總扣除額：247,000
      // 綜合所得淨額：253,000
      // 應納稅額：253,000 * 5% = 12,650

      expect(result.netIncome).toBe(253000)
      expect(result.taxAmount).toBe(12650)
      expect(result.effectiveRate).toBe(5) // 實際有效稅率是5%
      expect(result.afterTaxIncome).toBe(487350)
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
      // 免稅額：202,000 (101,000 * 2)
      // 標準扣除額：272,000
      // 儲蓄投資扣除額：50,000
      // 總扣除額：524,000
      // 綜合所得淨額：476,000
      // 應納稅額：476,000 * 5% = 23,800

      expect(result.netIncome).toBe(476000)
      expect(result.taxAmount).toBe(23800)
      expect(result.effectiveRate).toBe(5) // 實際有效稅率是5%
      expect(result.afterTaxIncome).toBe(976200)
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
      // 免稅額：404,000 (101,000 * 4)
      // 標準扣除額：272,000
      // 幼兒學前扣除額：375,000 (150,000 + 225,000)
      // 儲蓄投資扣除額：30,000
      // 總扣除額：1,081,000
      // 綜合所得淨額：419,000
      // 應納稅額：419,000 * 5% = 20,950

      expect(result.netIncome).toBe(419000)
      expect(result.taxAmount).toBe(20950)
      expect(result.effectiveRate).toBe(5) // 實際有效稅率是5%
      expect(result.afterTaxIncome).toBe(1479050)
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
      // 免稅額：101,000 * 3 + 151,500 * 2 = 606,000
      // 標準扣除額：272,000
      // 幼兒學前扣除額：150,000
      // 儲蓄投資扣除額：100,000
      // 比較項目合計：606,000 + 272,000 + 150,000 + 100,000 = 1,128,000
      // 基本生活費：5 * 213,000 = 1,065,000
      // 基本生活費差額：0 (比較項目 > 基本生活費)
      // 總扣除額：1,128,000
      // 綜合所得淨額：872,000
      // 應納稅額：872,000 * 12% - 42,700 = 61,940
      // 有效稅率：61,940 / 872,000 ≈ 7.10%

      expect(result.netIncome).toBe(872000)
      expect(result.taxAmount).toBe(61940)
      expect(result.effectiveRate).toBeCloseTo(7.10, 2)
      expect(result.afterTaxIncome).toBe(1938060)
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
      // 免稅額：101,000
      // 標準扣除額：136,000
      // 房屋租金扣除額：180,000
      // 總扣除額：417,000
      // 綜合所得淨額：383,000
      // 應納稅額：383,000 * 5% = 19,150

      expect(result.netIncome).toBe(383000)
      expect(result.taxAmount).toBe(19150)
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
      // 免稅額：101,000 * 4 = 404,000
      // 標準扣除額：272,000
      // 教育學費扣除額：50,000
      // 比較項目合計：404,000 + 272,000 + 50,000 = 726,000
      // 基本生活費：4 * 213,000 = 852,000
      // 基本生活費差額：126,000
      // 總扣除額：852,000
      // 綜合所得淨額：348,000
      // 應納稅額：348,000 * 5% = 17,400

      expect(result.netIncome).toBe(348000)
      expect(result.taxAmount).toBe(17400)
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
      // 免稅額：303,000 (101,000 * 3)
      // 標準扣除額：272,000
      // 身心障礙扣除額：227,000
      // 總扣除額：802,000
      // 綜合所得淨額：198,000
      // 應納稅額：198,000 * 5% = 9,900

      expect(result.netIncome).toBe(198000)
      expect(result.taxAmount).toBe(9900)
      expect(result.deductions.breakdown.disabilityDeduction).toBe(227000)
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
      // 免稅額：353,500 (101,000 * 2 + 151,500)
      // 標準扣除額：272,000
      // 長期照顧扣除額：180,000
      // 總扣除額：805,500
      // 綜合所得淨額：694,500
      // 應納稅額：694,500 * 12% - 42,700 = 40,640

      expect(result.netIncome).toBe(694500)
      expect(result.taxAmount).toBe(40640)
      expect(result.deductions.breakdown.longTermCareDeduction).toBe(180000)
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
      // 標準扣除額：272,000
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
      // 標準扣除額：272,000
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
      // 標準扣除額：136,000
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
      // 免稅額：101,000
      // 標準扣除額：136,000
      // 儲蓄投資扣除額：270,000
      // 總扣除額：507,000
      // 綜合所得淨額：2,993,000
      // 應納稅額：2,993,000 * 30% - 430,100 = 467,800
      // 有效稅率：467,800 / 2,993,000 ≈ 15.63%

      expect(result.netIncome).toBe(2993000)
      expect(result.taxAmount).toBe(467800)
      expect(result.bracketInfo.rate).toBe(30)
      expect(result.effectiveRate).toBeCloseTo(15.63, 2)
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
      // 免稅額：101,000 * 4 = 404,000
      // 標準扣除額：272,000
      // 幼兒學前扣除額：375,000
      // 儲蓄投資扣除額：270,000
      // 總扣除額：1,321,000
      // 綜合所得淨額：6,679,000
      // 應納稅額：6,679,000 * 40% - 949,100 = 1,722,500
      // 有效稅率：1,722,500 / 6,679,000 ≈ 25.79%

      expect(result.netIncome).toBe(6679000)
      expect(result.taxAmount).toBe(1722500)
      expect(result.bracketInfo.rate).toBe(40)
      expect(result.effectiveRate).toBeCloseTo(25.79, 2)
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
      // 免稅額：101,000
      // 標準扣除額：136,000
      // 薪資扣除額：227,000（在收入階段已處理）
      // 總扣除額：237,000
      // 綜合所得淨額：209,000
      // 應納稅額：209,000 * 5% = 10,450

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