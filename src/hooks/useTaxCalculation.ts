import { useMemo } from 'react';
import {
  TaxFormData,
  MarriedTaxResult,
  TaxResult,
  CalculateAllMarriedMethodsParams
} from '../types/tax';
import {
  calculateTax,
  calculateDeductions,
  EXEMPTION_AMOUNTS
} from '../data/taxRules';

export const useTaxCalculation = (formData: TaxFormData): MarriedTaxResult | TaxResult | null => {
  return useMemo(() => {
    const salary = parseFloat(formData.salaryIncome) || 0;
    const other = parseFloat(formData.otherIncome) || 0;
    const spouseSalary = parseFloat(formData.spouseSalaryIncome) || 0;
    const spouseOther = parseFloat(formData.spouseOtherIncome) || 0;

    const childrenCount = parseInt(formData.childrenUnder6) || 0;
    const dependentsCount = parseInt(formData.dependentsGeneral) || 0;
    const elderlyCount = parseInt(formData.elderlyOver70) || 0;
    const studentCount = parseInt(formData.students) || 0;
    const disabledCount = parseInt(formData.disabled) || 0;
    const rental = parseFloat(formData.rentalExpenses) || 0;
    const savings = parseFloat(formData.savingsInterest) || 0;
    const longTermCareCount = parseInt(formData.longTermCare) || 0;

    // 计算薪资净额（先扣除薪资特别扣除额）
    const salaryNetIncome = Math.max(0, salary - Math.min(salary, 218000));
    const spouseSalaryNetIncome = Math.max(0, spouseSalary - Math.min(spouseSalary, 218000));

    // 计算总收入
    const totalIncome = salaryNetIncome + other + (formData.isMarried ? spouseSalaryNetIncome + spouseOther : 0);

    // 如果没有收入，返回null
    if (totalIncome === 0 && salary === 0 && other === 0) {
      return null;
    }

    if (formData.isMarried) {
      // 已婚计算
      const results = calculateAllMarriedMethods({
        taxpayerSalary: salary,
        taxpayerOther: other,
        spouseSalary: spouseSalary,
        spouseOther: spouseOther,
        childrenCount,
        dependentsCount,
        elderlyCount,
        studentCount,
        disabledCount,
        longTermCareCount,
        rentalExpenses: rental,
        savingsInterest: savings,
        useItemizedDeduction: formData.useItemizedDeduction,
        donations: parseFloat(formData.donations) || 0,
        insurancePremiums: parseFloat(formData.insurancePremiums) || 0,
        healthInsurancePremiums: parseFloat(formData.healthInsurancePremiums) || 0,
        medicalExpenses: parseFloat(formData.medicalExpenses) || 0,
        disasterLoss: parseFloat(formData.disasterLoss) || 0,
        mortgageInterest: parseFloat(formData.mortgageInterest) || 0
      });

      let finalResult: MarriedTaxResult;
      if (formData.taxCalculationMethod === 'auto') {
        // 选择税负最低的方式
        const methods: Array<keyof typeof results> = ['combined', 'salary_separate', 'all_separate'];
        let bestMethod = methods[0];
        let lowestTax = results[bestMethod].totalTax;

        methods.forEach(method => {
          if (results[method].totalTax < lowestTax) {
            lowestTax = results[method].totalTax;
            bestMethod = method;
          }
        });

        finalResult = {
          ...results[bestMethod],
          chosenMethod: bestMethod,
          allMethods: results,
          savingsComparedToCombined: results.combined.totalTax - results[bestMethod].totalTax
        };
      } else {
        const method = formData.taxCalculationMethod as keyof typeof results;
        finalResult = {
          ...results[method],
          chosenMethod: formData.taxCalculationMethod,
          allMethods: results
        };
      }

      return finalResult;
    } else {
      // 单身申报
      const deductions = calculateDeductions({
        isMarried: false,
        childrenCount,
        dependentsCount,
        elderlyCount,
        studentCount,
        disabledCount,
        longTermCareCount,
        rentalExpenses: rental,
        savingsInterest: savings,
        useItemizedDeduction: formData.useItemizedDeduction,
        donations: parseFloat(formData.donations) || 0,
        insurancePremiums: parseFloat(formData.insurancePremiums) || 0,
        healthInsurancePremiums: parseFloat(formData.healthInsurancePremiums) || 0,
        medicalExpenses: parseFloat(formData.medicalExpenses) || 0,
        disasterLoss: parseFloat(formData.disasterLoss) || 0,
        mortgageInterest: parseFloat(formData.mortgageInterest) || 0,
        grossIncome: totalIncome,
        hasSalaryIncome: salary > 0
      });

      const netIncome = Math.max(0, totalIncome - deductions.totalDeductions);
      const taxResult = calculateTax(netIncome);

      return {
        filingMethod: 'single',
        grossIncome: totalIncome,
        deductions,
        netIncome,
        ...taxResult,
        salaryBreakdown: {
          taxpayerSalary: salary,
          taxpayerSalaryNet: salaryNetIncome,
          spouseSalary: 0,
          spouseSalaryNet: 0,
          totalSalaryDeduction: Math.min(salary, 218000)
        }
      } as TaxResult;
    }
  }, [formData]);
};

const calculateAllMarriedMethods = (params: CalculateAllMarriedMethodsParams) => {
  const {
    taxpayerSalary, taxpayerOther, spouseSalary, spouseOther,
    childrenCount, dependentsCount, elderlyCount, studentCount, disabledCount, longTermCareCount,
    rentalExpenses, savingsInterest, useItemizedDeduction,
    donations, insurancePremiums, healthInsurancePremiums, medicalExpenses, disasterLoss, mortgageInterest
  } = params;

  // 计算薪资净额
  const taxpayerSalaryNet = Math.max(0, taxpayerSalary - Math.min(taxpayerSalary, 218000));
  const spouseSalaryNet = Math.max(0, spouseSalary - Math.min(spouseSalary, 218000));

  // 方法1：全部合并计税
  const combinedIncome = taxpayerSalaryNet + taxpayerOther + spouseSalaryNet + spouseOther;
  const combinedDeductions = calculateDeductions({
    isMarried: true,
    childrenCount, dependentsCount, elderlyCount, studentCount, disabledCount, longTermCareCount,
    rentalExpenses, savingsInterest, useItemizedDeduction,
    donations, insurancePremiums, healthInsurancePremiums, medicalExpenses, disasterLoss, mortgageInterest,
    grossIncome: combinedIncome,
    hasSalaryIncome: taxpayerSalary > 0 || spouseSalary > 0
  });
  const combinedNetIncome = Math.max(0, combinedIncome - combinedDeductions.totalDeductions);
  const combinedTax = calculateTax(combinedNetIncome);

  // 方法2：薪资分开计税，其他合并
  const taxpayerSalaryForSeparate = taxpayerSalaryNet;
  const taxpayerExemption = EXEMPTION_AMOUNTS.standard;
  const taxpayerSalaryNetAfterExemption = Math.max(0, taxpayerSalaryForSeparate - taxpayerExemption);
  const taxpayerSalaryTaxInfo = calculateTax(taxpayerSalaryNetAfterExemption);
  const remainingNetIncome = Math.max(0, combinedNetIncome - taxpayerSalaryNetAfterExemption);
  const remainingTaxInfo = calculateTax(remainingNetIncome);
  const totalSalarySepaRateTax = taxpayerSalaryTaxInfo.taxAmount + remainingTaxInfo.taxAmount;

  const salarySepaRate: MarriedTaxResult = {
    method: 'salary_separate',
    description: '薪资分开计税，其他合并',
    totalTax: totalSalarySepaRateTax,
    taxAmount: totalSalarySepaRateTax,
    grossIncome: combinedIncome,
    netIncome: combinedNetIncome,
    effectiveRate: combinedIncome > 0 ? (totalSalarySepaRateTax / combinedIncome) * 100 : 0,
    bracketInfo: remainingTaxInfo.taxAmount >= taxpayerSalaryTaxInfo.taxAmount ? remainingTaxInfo.bracketInfo : taxpayerSalaryTaxInfo.bracketInfo,
    salaryBreakdown: {
      taxpayerSalary,
      taxpayerSalaryNet,
      spouseSalary,
      spouseSalaryNet,
      totalSalaryDeduction: Math.min(taxpayerSalary, 218000) + Math.min(spouseSalary, 218000)
    },
    deductions: combinedDeductions,
    taxpayerSalaryPortion: {
      grossIncome: taxpayerSalaryForSeparate,
      netIncome: taxpayerSalaryNetAfterExemption,
      exemption: taxpayerExemption,
      ...taxpayerSalaryTaxInfo,
      description: '本人薪资所得（分开计税）'
    },
    remainingPortion: {
      grossIncome: combinedIncome - taxpayerSalaryForSeparate,
      netIncome: remainingNetIncome,
      ...remainingTaxInfo,
      description: '剩余所得（合并计税）'
    }
  };

  // 方法3：各类所得都分开计税
  const taxpayerDeductions = calculateDeductions({
    isMarried: false,
    childrenCount: Math.floor(childrenCount / 2),
    dependentsCount: Math.floor(dependentsCount / 2),
    elderlyCount: Math.floor(elderlyCount / 2),
    studentCount: Math.floor(studentCount / 2),
    disabledCount: Math.floor(disabledCount / 2),
    longTermCareCount: Math.floor(longTermCareCount / 2),
    rentalExpenses: rentalExpenses / 2,
    savingsInterest: savingsInterest / 2,
    useItemizedDeduction: false,
    donations: 0, insurancePremiums: 0, healthInsurancePremiums: 0, medicalExpenses: 0, disasterLoss: 0, mortgageInterest: 0,
    grossIncome: taxpayerSalaryNet + taxpayerOther,
    hasSalaryIncome: taxpayerSalary > 0
  });

  const spouseDeductions = calculateDeductions({
    isMarried: false,
    childrenCount: Math.ceil(childrenCount / 2),
    dependentsCount: Math.ceil(dependentsCount / 2),
    elderlyCount: Math.ceil(elderlyCount / 2),
    studentCount: Math.ceil(studentCount / 2),
    disabledCount: Math.ceil(disabledCount / 2),
    longTermCareCount: Math.ceil(longTermCareCount / 2),
    rentalExpenses: rentalExpenses / 2,
    savingsInterest: savingsInterest / 2,
    useItemizedDeduction: false,
    donations: 0, insurancePremiums: 0, healthInsurancePremiums: 0, medicalExpenses: 0, disasterLoss: 0, mortgageInterest: 0,
    grossIncome: spouseSalaryNet + spouseOther,
    hasSalaryIncome: spouseSalary > 0
  });

  const taxpayerNetIncome = Math.max(0, (taxpayerSalaryNet + taxpayerOther) - taxpayerDeductions.totalDeductions);
  const spouseNetIncome = Math.max(0, (spouseSalaryNet + spouseOther) - spouseDeductions.totalDeductions);

  const taxpayerTax = calculateTax(taxpayerNetIncome);
  const spouseTax = calculateTax(spouseNetIncome);

  return {
    combined: {
      method: 'combined' as const,
      description: '全部合并计税',
      totalTax: combinedTax.taxAmount,
      grossIncome: combinedIncome,
      netIncome: combinedNetIncome,
      deductions: combinedDeductions,
      ...combinedTax
    },
    salary_separate: salarySepaRate,
    all_separate: {
      method: 'all_separate' as const,
      description: '各类所得都分开计税',
      totalTax: taxpayerTax.taxAmount + spouseTax.taxAmount,
      taxAmount: taxpayerTax.taxAmount + spouseTax.taxAmount,
      grossIncome: combinedIncome,
      netIncome: taxpayerNetIncome + spouseNetIncome,
      effectiveRate: combinedIncome > 0 ? ((taxpayerTax.taxAmount + spouseTax.taxAmount) / combinedIncome) * 100 : 0,
      bracketInfo: taxpayerTax.taxAmount >= spouseTax.taxAmount ? taxpayerTax.bracketInfo : spouseTax.bracketInfo,
      salaryBreakdown: {
        taxpayerSalary,
        taxpayerSalaryNet,
        spouseSalary,
        spouseSalaryNet,
        totalSalaryDeduction: Math.min(taxpayerSalary, 218000) + Math.min(spouseSalary, 218000)
      },
      deductions: {
        ...combinedDeductions,
        totalDeductions: taxpayerDeductions.totalDeductions + spouseDeductions.totalDeductions
      },
      taxpayer: {
        grossIncome: taxpayerSalaryNet + taxpayerOther,
        salaryIncome: taxpayerSalary,
        salaryNet: taxpayerSalaryNet,
        otherIncome: taxpayerOther,
        netIncome: taxpayerNetIncome,
        deductions: taxpayerDeductions,
        ...taxpayerTax
      },
      spouse: {
        grossIncome: spouseSalaryNet + spouseOther,
        salaryIncome: spouseSalary,
        salaryNet: spouseSalaryNet,
        otherIncome: spouseOther,
        netIncome: spouseNetIncome,
        deductions: spouseDeductions,
        ...spouseTax
      }
    }
  };
};