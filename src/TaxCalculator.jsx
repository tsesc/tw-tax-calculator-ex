import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import {
  TAX_BRACKETS,
  EXEMPTION_AMOUNTS,
  STANDARD_DEDUCTIONS,
  ITEMIZED_DEDUCTIONS,
  SPECIAL_DEDUCTIONS,
  BASIC_LIVING_EXPENSE,
  TAX_SAVING_TIPS,
  TAX_FREE_THRESHOLDS,
  TAX_REFORM_2025,
  calculateTax,
  calculateDeductions
} from './data/taxRules';
import zhTW from './i18n/zh-TW';

// 自定义hook用于localStorage快取
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

export default function TaxCalculator() {
  // 使用localStorage快取的状态
  const [formData, setFormData] = useLocalStorage('taxCalculatorData', {
    salaryIncome: '',
    otherIncome: '',
    spouseSalaryIncome: '',
    spouseOtherIncome: '',
    isMarried: false,
    taxCalculationMethod: 'auto',
    childrenUnder6: '',
    dependentsGeneral: '',
    elderlyOver70: '',
    students: '',
    disabled: '',
    rentalExpenses: '',
    savingsInterest: '',
    longTermCare: '',
    useItemizedDeduction: false,
    donations: '',
    insurancePremiums: '',
    healthInsurancePremiums: '',
    medicalExpenses: '',
    disasterLoss: '',
    mortgageInterest: ''
  });

  // 收入相关
  const [salaryIncome, setSalaryIncome] = useState(formData.salaryIncome);
  const [otherIncome, setOtherIncome] = useState(formData.otherIncome);
  const [spouseSalaryIncome, setSpouseSalaryIncome] = useState(formData.spouseSalaryIncome);
  const [spouseOtherIncome, setSpouseOtherIncome] = useState(formData.spouseOtherIncome);

  // 基本信息
  const [isMarried, setIsMarried] = useState(formData.isMarried);
  const [taxCalculationMethod, setTaxCalculationMethod] = useState(formData.taxCalculationMethod);

  // 扶养亲属
  const [childrenUnder6, setChildrenUnder6] = useState(formData.childrenUnder6);
  const [dependentsGeneral, setDependentsGeneral] = useState(formData.dependentsGeneral || '');
  const [elderlyOver70, setElderlyOver70] = useState(formData.elderlyOver70);
  const [students, setStudents] = useState(formData.students);
  const [disabled, setDisabled] = useState(formData.disabled);

  // 特別扣除額
  const [rentalExpenses, setRentalExpenses] = useState(formData.rentalExpenses);
  const [savingsInterest, setSavingsInterest] = useState(formData.savingsInterest);
  const [longTermCare, setLongTermCare] = useState(formData.longTermCare || '');

  // 列舉扣除額輸入
  const [useItemizedDeduction, setUseItemizedDeduction] = useState(formData.useItemizedDeduction);
  const [donations, setDonations] = useState(formData.donations);
  const [insurancePremiums, setInsurancePremiums] = useState(formData.insurancePremiums);
  const [healthInsurancePremiums, setHealthInsurancePremiums] = useState(formData.healthInsurancePremiums || '');
  const [medicalExpenses, setMedicalExpenses] = useState(formData.medicalExpenses);
  const [disasterLoss, setDisasterLoss] = useState(formData.disasterLoss);
  const [mortgageInterest, setMortgageInterest] = useState(formData.mortgageInterest);

  const [result, setResult] = useState(null);

  // 保存資料到localStorage
  const saveToLocalStorage = () => {
    const currentData = {
      salaryIncome,
      otherIncome,
      spouseSalaryIncome,
      spouseOtherIncome,
      isMarried,
      taxCalculationMethod,
      childrenUnder6,
      dependentsGeneral,
      elderlyOver70,
      students,
      disabled,
      rentalExpenses,
      savingsInterest,
      longTermCare,
      useItemizedDeduction,
      donations,
      insurancePremiums,
      healthInsurancePremiums,
      medicalExpenses,
      disasterLoss,
      mortgageInterest
    };
    setFormData(currentData);
  };

  // 清除所有快取資料
  const clearCachedData = () => {
    const emptyData = {
      salaryIncome: '',
      otherIncome: '',
      spouseSalaryIncome: '',
      spouseOtherIncome: '',
      isMarried: false,
      taxCalculationMethod: 'auto',
      childrenUnder6: '',
      dependentsGeneral: '',
      elderlyOver70: '',
      students: '',
      disabled: '',
      rentalExpenses: '',
      savingsInterest: '',
      longTermCare: '',
      useItemizedDeduction: false,
      donations: '',
      insurancePremiums: '',
      healthInsurancePremiums: '',
      medicalExpenses: '',
      disasterLoss: '',
      mortgageInterest: ''
    };

    // 更新所有状态
    setSalaryIncome('');
    setOtherIncome('');
    setSpouseSalaryIncome('');
    setSpouseOtherIncome('');
    setIsMarried(false);
    setTaxCalculationMethod('auto');
    setChildrenUnder6('');
    setDependentsGeneral('');
    setElderlyOver70('');
    setStudents('');
    setDisabled('');
    setRentalExpenses('');
    setSavingsInterest('');
    setLongTermCare('');
    setUseItemizedDeduction(false);
    setDonations('');
    setInsurancePremiums('');
    setHealthInsurancePremiums('');
    setMedicalExpenses('');
    setDisasterLoss('');
    setMortgageInterest('');
    setResult(null);

    // 清除localStorage
    setFormData(emptyData);
  };

  // 当任何輸入改变时保存到localStorage
  useEffect(() => {
    saveToLocalStorage();
  }, [
    salaryIncome, otherIncome, spouseSalaryIncome, spouseOtherIncome,
    isMarried, taxCalculationMethod, childrenUnder6, dependentsGeneral, elderlyOver70,
    students, disabled, rentalExpenses, savingsInterest, longTermCare,
    useItemizedDeduction, donations, insurancePremiums, healthInsurancePremiums,
    medicalExpenses, disasterLoss, mortgageInterest
  ]);

  const calculateTaxResult = () => {
    const salary = parseFloat(salaryIncome) || 0;
    const other = parseFloat(otherIncome) || 0;
    const spouseSalary = parseFloat(spouseSalaryIncome) || 0;
    const spouseOther = parseFloat(spouseOtherIncome) || 0;

    const childrenCount = parseInt(childrenUnder6) || 0;
    const dependentsCount = parseInt(dependentsGeneral) || 0;
    const elderlyCount = parseInt(elderlyOver70) || 0;
    const studentCount = parseInt(students) || 0;
    const disabledCount = parseInt(disabled) || 0;
    const rental = parseFloat(rentalExpenses) || 0;
    const savings = parseFloat(savingsInterest) || 0;
    const longTermCareCount = parseInt(longTermCare) || 0;

    // 計算薪資淨額（先扣除薪資{zhTW.cardTitles.specialDeductions}）
    const salaryNetIncome = Math.max(0, salary - Math.min(salary, 218000));
    const spouseSalaryNetIncome = Math.max(0, spouseSalary - Math.min(spouseSalary, 218000));

    // 計算{zhTW.calculationResults.grossIncome}
    const totalIncome = salaryNetIncome + other + (isMarried ? spouseSalaryNetIncome + spouseOther : 0);

    // 如果没有收入，清空結果
    if (totalIncome === 0 && salary === 0 && other === 0) {
      setResult(null);
      return;
    }

    if (isMarried) {
      // 夫妻合併申報，但分開计稅
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
        useItemizedDeduction,
        donations: parseFloat(donations) || 0,
        insurancePremiums: parseFloat(insurancePremiums) || 0,
        healthInsurancePremiums: parseFloat(healthInsurancePremiums) || 0,
        medicalExpenses: parseFloat(medicalExpenses) || 0,
        disasterLoss: parseFloat(disasterLoss) || 0,
        mortgageInterest: parseFloat(mortgageInterest) || 0
      });

      let finalResult;
      if (taxCalculationMethod === 'auto') {
        // 選擇稅负最低的方式
        const methods = ['combined', 'salary_separate', 'all_separate'];
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
        finalResult = {
          ...results[taxCalculationMethod],
          chosenMethod: taxCalculationMethod,
          allMethods: results
        };
      }

      setResult(finalResult);
          } else {
        // 單身申報
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
          useItemizedDeduction,
          donations: parseFloat(donations) || 0,
          insurancePremiums: parseFloat(insurancePremiums) || 0,
          healthInsurancePremiums: parseFloat(healthInsurancePremiums) || 0,
          medicalExpenses: parseFloat(medicalExpenses) || 0,
          disasterLoss: parseFloat(disasterLoss) || 0,
          mortgageInterest: parseFloat(mortgageInterest) || 0,
          grossIncome: totalIncome,
          hasSalaryIncome: salary > 0
        });

        const netIncome = Math.max(0, totalIncome - deductions.totalDeductions);
        const taxResult = calculateTax(netIncome);

        setResult({
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
        });
      }
  };

    const calculateAllMarriedMethods = (params) => {
    const {
      taxpayerSalary, taxpayerOther, spouseSalary, spouseOther,
      childrenCount, dependentsCount, elderlyCount, studentCount, disabledCount, longTermCareCount,
      rentalExpenses, savingsInterest, useItemizedDeduction,
      donations, insurancePremiums, healthInsurancePremiums, medicalExpenses, disasterLoss, mortgageInterest
    } = params;

    // 計算薪資淨額
    const taxpayerSalaryNet = Math.max(0, taxpayerSalary - Math.min(taxpayerSalary, 218000));
    const spouseSalaryNet = Math.max(0, spouseSalary - Math.min(spouseSalary, 218000));

    // 方法1：全部合併计稅
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

                // 方法2：薪資分開计稅，其他合併
    // 按照台灣稅务系統實際計算方式：
    // 1. 本{zhTW.common.people}薪資淨額 - 本{zhTW.common.people}免稅额 = 本{zhTW.common.people}薪資应稅淨額 {zhTW.common.multiply} 稅率
    // 2. {zhTW.calculationResults.netIncome} - 本{zhTW.common.people}薪資应稅淨額 = 剩餘所得淨額 {zhTW.common.multiply} 稅率 - 累进差额

    // 本{zhTW.common.people}薪資淨額
    const taxpayerSalaryForSeparate = taxpayerSalaryNet;

    // 計算本{zhTW.common.people}分配的免稅额（假设本{zhTW.common.people}分配一般免稅额）
    const taxpayerExemption = EXEMPTION_AMOUNTS.standard;

    // 計算本{zhTW.common.people}薪資应稅淨額（只扣除本{zhTW.common.people}免稅额）
    const taxpayerSalaryNetAfterExemption = Math.max(0, taxpayerSalaryForSeparate - taxpayerExemption);
    const taxpayerSalaryTaxInfo = calculateTax(taxpayerSalaryNetAfterExemption);

    // 計算剩餘所得淨額 = {zhTW.calculationResults.netIncome} - 本{zhTW.common.people}薪資应稅淨額
    const remainingNetIncome = Math.max(0, combinedNetIncome - taxpayerSalaryNetAfterExemption);
    const remainingTaxInfo = calculateTax(remainingNetIncome);

    // 實際稅额 = 本{zhTW.common.people}薪資稅额 + 剩餘所得稅额
    const totalSalarySepaRateTax = taxpayerSalaryTaxInfo.taxAmount + remainingTaxInfo.taxAmount;

    const salarySepaRate = {
      method: 'salary_separate',
      description: '薪資分開计稅，其他合併',
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
      // 本{zhTW.common.people}薪資部分
      taxpayerSalaryPortion: {
        grossIncome: taxpayerSalaryForSeparate,
        netIncome: taxpayerSalaryNetAfterExemption,
        exemption: taxpayerExemption, // 只有免稅额
        ...taxpayerSalaryTaxInfo,
        description: '本{zhTW.common.people}薪資所得（分開计稅）'
      },
      // 剩餘所得部分
      remainingPortion: {
        grossIncome: combinedIncome - taxpayerSalaryForSeparate, // 剩餘的总收入
        netIncome: remainingNetIncome,
        ...remainingTaxInfo,
        description: '剩餘所得（合併计稅）'
      }
    };

    // 方法3：各类所得都分開计稅
    // 扣除額分配：每{zhTW.common.people}都有單身標準扣除額，免稅额和{zhTW.cardTitles.specialDeductions}按實際情况分配
    const taxpayerDeductions = calculateDeductions({
      isMarried: false, // 分開计稅按單身处理
      childrenCount: Math.floor(childrenCount / 2),
      dependentsCount: Math.floor(dependentsCount / 2),
      elderlyCount: Math.floor(elderlyCount / 2),
      studentCount: Math.floor(studentCount / 2),
      disabledCount: Math.floor(disabledCount / 2),
      longTermCareCount: Math.floor(longTermCareCount / 2),
      rentalExpenses: rentalExpenses / 2,
      savingsInterest: savingsInterest / 2,
      useItemizedDeduction: false, // 使用標準扣除額
      donations: 0, insurancePremiums: 0, healthInsurancePremiums: 0, medicalExpenses: 0, disasterLoss: 0, mortgageInterest: 0,
      grossIncome: taxpayerSalaryNet + taxpayerOther,
      hasSalaryIncome: taxpayerSalary > 0
    });

    const spouseDeductions = calculateDeductions({
      isMarried: false, // 分開计稅按單身处理
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

    // 分別計算各自的稅额，使用各自的稅率級距
    const taxpayerTax = calculateTax(taxpayerNetIncome);
    const spouseTax = calculateTax(spouseNetIncome);

    return {
      combined: {
        method: 'combined',
        description: '全部合併计稅',
        totalTax: combinedTax.taxAmount,
        grossIncome: combinedIncome,
        netIncome: combinedNetIncome,
        deductions: combinedDeductions,
        ...combinedTax
      },
      salary_separate: salarySepaRate,
      all_separate: {
        method: 'all_separate',
        description: '各类所得都分開计稅',
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

  // 監聽所有輸入變化，自動計算
  useEffect(() => {
    calculateTaxResult();
  }, [
    salaryIncome, otherIncome, spouseSalaryIncome, spouseOtherIncome,
    isMarried, taxCalculationMethod, childrenUnder6, dependentsGeneral, elderlyOver70, students, disabled,
    rentalExpenses, savingsInterest, longTermCare, useItemizedDeduction,
    donations, insurancePremiums, healthInsurancePremiums, medicalExpenses, disasterLoss, mortgageInterest
  ]);

  // 監聽所有輸入變化，自動保存到localStorage
  useEffect(() => {
    saveToLocalStorage();
  }, [
    salaryIncome, otherIncome, spouseSalaryIncome, spouseOtherIncome,
    isMarried, taxCalculationMethod, childrenUnder6, dependentsGeneral, elderlyOver70, students, disabled,
    rentalExpenses, savingsInterest, longTermCare, useItemizedDeduction,
    donations, insurancePremiums, medicalExpenses, disasterLoss, mortgageInterest
  ]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('zh-TW').format(num);
  };

  const formatCurrency = (amount) => {
    return `NT$${formatNumber(amount)}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 标题和說明 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          {zhTW.title}
        </h1>
        <p className="text-lg text-gray-600">
          {zhTW.description}
        </p>
                  <div className="flex justify-center space-x-4 text-sm text-blue-600">
            <span>✓ {zhTW.features.realTimeCalculation}</span>
            <span>✓ {zhTW.features.detailedDeductions}</span>
            <span>✓ {zhTW.features.completeFormula}</span>
            <span>✓ {zhTW.features.taxSavingTips}</span>
            <span>✓ {zhTW.features.autoSave}</span>
          </div>

        {/* 清除快取按钮 */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={clearCachedData}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
                          🗑️ {zhTW.buttons.clearAllData}
          </Button>
        </div>
      </div>

      {/* 2025年重大稅制变革 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">🎯 2025年重大稅制变革</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {TAX_REFORM_2025.map((reform, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">{reform.item}</h4>
                <div className="text-sm space-y-1">
                  <div className="text-gray-600">修正前: {reform.before}</div>
                  <div className="text-green-600 font-medium">修正后: {reform.after}</div>
                  <div className="text-blue-600">影响: {reform.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 免稅门槛快速查询 */}
      <Card>
        <CardHeader>
          <CardTitle>💡 免稅门槛快速查询</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TAX_FREE_THRESHOLDS.map((threshold, index) => (
              <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800">{threshold.familyType}</h4>
                <div className="text-2xl font-bold text-green-600 my-2">
                  {formatCurrency(threshold.threshold)}
                </div>
                <div className="text-xs text-gray-600">{threshold.calculation}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 左侧：輸入区域 */}
        <div className="space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.basicInfo.salaryIncome}
                </label>
                <Input
                  type="number"
                  value={salaryIncome}
                  onChange={(e) => setSalaryIncome(e.target.value)}
                  placeholder="薪資、奖金等所得"
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  包含：薪資、奖金、年终奖金等薪資所得
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.basicInfo.otherIncome}
                </label>
                <Input
                  type="number"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(e.target.value)}
                  placeholder="{zhTW.basicInfo.otherPlaceholder}"
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  包含：利息所得、股利所得、租赁所得、其他所得等
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isMarried}
                    onChange={(e) => setIsMarried(e.target.checked)}
                    className="rounded"
                  />
                  <span>{zhTW.basicInfo.married}</span>
                </label>
              </div>

              {isMarried && (
                <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-blue-800">{zhTW.calculationResults.spouse}信息</h4>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {zhTW.calculationResults.spouse}{zhTW.basicInfo.salaryIncome}
                    </label>
                    <Input
                      type="number"
                      value={spouseSalaryIncome}
                      onChange={(e) => setSpouseSalaryIncome(e.target.value)}
                      placeholder="{zhTW.calculationResults.spouse}薪資、奖金等所得"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {zhTW.calculationResults.spouse}{zhTW.basicInfo.otherIncome}
                    </label>
                    <Input
                      type="number"
                      value={spouseOtherIncome}
                      onChange={(e) => setSpouseOtherIncome(e.target.value)}
                      placeholder="{zhTW.basicInfo.spouseOtherPlaceholder}"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">计稅方式 (2018年修法后)</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="taxCalculationMethod"
                          checked={taxCalculationMethod === 'combined'}
                          onChange={() => setTaxCalculationMethod('combined')}
                          className="rounded"
                        />
                        <span>全部合併计稅 (传统方式)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="taxCalculationMethod"
                          checked={taxCalculationMethod === 'salary_separate'}
                          onChange={() => setTaxCalculationMethod('salary_separate')}
                          className="rounded"
                        />
                        <span>薪資分開计稅，其他合併</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="taxCalculationMethod"
                          checked={taxCalculationMethod === 'all_separate'}
                          onChange={() => setTaxCalculationMethod('all_separate')}
                          className="rounded"
                        />
                        <span>各类所得都分開计稅 (最常见)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="taxCalculationMethod"
                          checked={taxCalculationMethod === 'auto'}
                          onChange={() => setTaxCalculationMethod('auto')}
                          className="rounded"
                        />
                        <span className="text-blue-600 font-medium">{zhTW.basicInfo.autoSelect}</span>
                      </label>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      eTax系統会自動計算三種方式，選擇稅负最低的那種
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 扶养亲属 */}
          <Card>
            <CardHeader>
              <CardTitle>扶养亲属</CardTitle>
                              <p className="text-sm text-gray-600">{zhTW.dependents.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  6岁以下子女{zhTW.common.people}数 (🎯2025年新制)
                </label>
                <Input
                  type="number"
                  value={childrenUnder6}
                  onChange={(e) => setChildrenUnder6(e.target.value)}
                  placeholder="民国107年(含)以后出生"
                  className="w-full"
                />
                <div className="text-xs text-blue-600 mt-1">
                  {zhTW.dependents.childrenDescription}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  70岁以上长辈{zhTW.common.people}数
                </label>
                <Input
                  type="number"
                  value={elderlyOver70}
                  onChange={(e) => setElderlyOver70(e.target.value)}
                  placeholder="年满70岁之直系尊亲属"
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  享有较高免稅额145,500元(一般為97,000元)
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  一般扶养亲属{zhTW.common.people}数
                </label>
                <Input
                  type="number"
                  value={dependentsGeneral}
                  onChange={(e) => setDependentsGeneral(e.target.value)}
                  placeholder="6岁以上70岁以下扶养亲属"
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  享有一般免稅额97,000元
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  大专院校学生{zhTW.common.people}数
                </label>
                <Input
                  type="number"
                  value={students}
                  onChange={(e) => setStudents(e.target.value)}
                  placeholder="大专以上在学子女"
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  每{zhTW.common.people}可享教育学费{zhTW.cardTitles.specialDeductions}25,000元
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  身心障碍{zhTW.common.people}数
                </label>
                <Input
                  type="number"
                  value={disabled}
                  onChange={(e) => setDisabled(e.target.value)}
                  placeholder="持有身心障碍证明者"
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  每{zhTW.common.people}可享身心障碍{zhTW.cardTitles.specialDeductions}218,000元
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  長期照顧需求{zhTW.common.people}数
                </label>
                <Input
                  type="number"
                  value={longTermCare}
                  onChange={(e) => setLongTermCare(e.target.value)}
                  placeholder="{zhTW.dependents.longTermCarePlaceholder}"
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1 space-y-1">
                  <div>每{zhTW.common.people}可享長期照顧{zhTW.cardTitles.specialDeductions}120,000元</div>
                  <div className="text-orange-600">{zhTW.dependents.longTermCareWarning}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* {zhTW.cardTitles.deductionChoice} */}
          <Card>
            <CardHeader>
              <CardTitle>{zhTW.cardTitles.deductionChoice}</CardTitle>
              <p className="text-sm text-gray-600">可選擇標準扣除額或列舉扣除額，系統会自動選擇对您最有利的方案</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={useItemizedDeduction}
                    onChange={(e) => setUseItemizedDeduction(e.target.checked)}
                    className="rounded"
                  />
                  <span>使用列舉扣除額 (需检附证明文件)</span>
                </label>
                <div className="text-xs text-gray-500 mt-1">
                  標準扣除額：單身131,000元、夫妻262,000元
                </div>
              </div>

              {useItemizedDeduction && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800">列舉扣除額明细</h4>
                  <div className="text-xs text-blue-600 mb-4">
                    💡 提醒：列舉扣除額需检附收据证明，国稅局有资料者免附
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      1. 捐贈金額 (NT$)
                    </label>
                    <Input
                      type="number"
                      value={donations}
                      onChange={(e) => setDonations(e.target.value)}
                      placeholder="对合法团体之捐贈"
                    />
                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                      <div>• 教育、文化、公益、慈善机构：限所得總額20{zhTW.common.percent}</div>
                      <div>• 政府、國防、劳军、古迹维护：無金額限制</div>
                      <div>• 政治献金：限所得總額20{zhTW.common.percent}，最高20萬元</div>
                      <div>• 需检附：受赠单位收据正本</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      2a. {zhTW.common.people}身保險費 (非健保) (NT$)
                    </label>
                    <Input
                      type="number"
                      value={insurancePremiums}
                      onChange={(e) => setInsurancePremiums(e.target.value)}
                      placeholder="{zhTW.common.people}身保險費（不含健保費）"
                    />
                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                      <div>• {zhTW.common.people}身保險費：每{zhTW.common.people}限24,000元（壽險、傷害險、年金險等）</div>
                      <div>• 劳保、国民年金、军公教保险：每{zhTW.common.people}限24,000元</div>
                      <div>• 要保{zhTW.common.people}与被保{zhTW.common.people}需在同一申報户</div>
                      <div>• 需检附：保險費收据正本或缴费证明</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      2b. 全民健保費 (NT$)
                    </label>
                    <Input
                      type="number"
                      value={healthInsurancePremiums}
                      onChange={(e) => setHealthInsurancePremiums(e.target.value)}
                      placeholder="全民健保費總額"
                    />
                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                      <div>• 全民健保費：無金額限制，可全額扣除</div>
                      <div>• 包含：一般保费、补充保费</div>
                      <div>• 不限要保{zhTW.common.people}与被保{zhTW.common.people}关系</div>
                      <div>• 需检附：健保費缴费证明或收据</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      3. 醫療及生育費用 (NT$)
                    </label>
                    <Input
                      type="number"
                      value={medicalExpenses}
                      onChange={(e) => setMedicalExpenses(e.target.value)}
                      placeholder="合法醫院之醫療費用"
                    />
                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                      <div>• 核實認列，無金額限制</div>
                      <div>• 限公立醫院、健保特約醫院或诊所</div>
                      <div>• 包含长照治疗費用</div>
                      <div>• 保险理賠部分不可列入</div>
                      <div>• 需检附：醫院开立的收据正本</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      4. 災害損失 (NT$)
                    </label>
                    <Input
                      type="number"
                      value={disasterLoss}
                      onChange={(e) => setDisasterLoss(e.target.value)}
                      placeholder="不可抗力災害損失"
                    />
                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                      <div>• 核實認列，無金額限制</div>
                      <div>• 限不可抗力災害（天灾等）</div>
                      <div>• 保险理賠、救济金部分不可列入</div>
                      <div>• 需检附：国稅局核发的证明文件</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      5. 自用住宅購屋借款利息 (NT$)
                    </label>
                    <Input
                      type="number"
                      value={mortgageInterest}
                      onChange={(e) => setMortgageInterest(e.target.value)}
                      placeholder="自用住宅購屋借款利息"
                    />
                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                      <div>• 每戶限30萬元，限一屋</div>
                      <div>• 需完成户籍登记且未出租、营业</div>
                      <div>• 需先扣除儲蓄投資{zhTW.cardTitles.specialDeductions}</div>
                      <div>• 需检附：金融机构利息单据正本</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <h5 className="font-medium text-yellow-800 mb-2">❌ 不可列入列舉扣除額的项目：</h5>
                    <div className="text-xs text-yellow-700 space-y-1">
                      <div>• 医美整形費用</div>
                      <div>• 已获保险理賠的醫療费</div>
                      <div>• 看护費用</div>
                      <div>• 月子中心費用</div>
                      <div>• 非{zhTW.common.people}身保險費（如財產险）</div>
                      <div>• 未经核准在台销售的境外保单</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* {zhTW.cardTitles.specialDeductions} */}
          <Card>
            <CardHeader>
              <CardTitle>{zhTW.cardTitles.specialDeductions}</CardTitle>
                              <p className="text-sm text-gray-600">{zhTW.specialDeductions.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  房屋租金支出 (NT$) (🎯2025年新制)
                </label>
                <Input
                  type="number"
                  value={rentalExpenses}
                  onChange={(e) => setRentalExpenses(e.target.value)}
                  placeholder="租屋自住年支出"
                  className="w-full"
                />
                <div className="text-xs text-blue-600 mt-1">
                  2025年重大变革：从列舉扣除改為特別扣除，每戶限180,000元
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  儲蓄投資利息 (NT$)
                </label>
                <Input
                  type="number"
                  value={savingsInterest}
                  onChange={(e) => setSavingsInterest(e.target.value)}
                  placeholder="银行存款利息收入"
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  每戶限270,000元，超过部分按一般所得课稅
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：結果顯示 */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* {zhTW.cardTitles.calculationResults}摘要 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">{zhTW.cardTitles.calculationResults}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">應納稅额</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(result.taxAmount)}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">{zhTW.calculationResults.effectiveTaxRate}</div>
                        <div className="text-2xl font-bold text-green-600">
                          {(result.effectiveRate || 0).toFixed(2)}{zhTW.common.percent}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">稅后净收入</div>
                        <div className="text-xl font-bold text-gray-800">
                          {formatCurrency((result.grossIncome || 0) - (result.taxAmount || 0))}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">{zhTW.calculationResults.applicableTaxBracket}</div>
                        <div className="text-xl font-bold text-purple-600">
                          {(result.bracketInfo?.rate || 0)}{zhTW.common.percent}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* {zhTW.basicInfo.married}分開计稅詳細信息 */}
              {isMarried && ((result.taxpayer && result.spouse && result.method === 'all_separate') || (result.taxpayerSalaryPortion && result.remainingPortion && result.method === 'salary_separate')) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-600">分開计稅詳細信息</CardTitle>
                    <p className="text-sm text-gray-600">各自適用不同稅率級距，分別計算稅额</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* 全部分開计稅时顯示纳稅{zhTW.common.people}和{zhTW.calculationResults.spouse} */}
                      {result.method === 'all_separate' && result.taxpayer && result.spouse ? (
                        <>
                          {/* 纳稅{zhTW.common.people} */}
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-bold text-blue-800 mb-3">纳稅{zhTW.common.people}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>{zhTW.calculationResults.grossIncome}</span>
                                <span>{formatCurrency(result.taxpayer.grossIncome)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>减：扣除額总计</span>
                                <span>-{formatCurrency(result.taxpayer.deductions.totalDeductions)}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>{zhTW.calculationResults.netIncome}</span>
                                <span>{formatCurrency(result.taxpayer.netIncome)}</span>
                              </div>
                              <div className="flex justify-between text-red-600 font-bold">
                                <span>{zhTW.calculationResults.applicableTaxRate}</span>
                                <span>{result.taxpayer.bracketInfo?.rate || 0}{zhTW.common.percent}</span>
                              </div>
                              <div className="flex justify-between text-blue-600 font-bold">
                                <span>應納稅额</span>
                                <span>{formatCurrency(result.taxpayer.taxAmount)}</span>
                              </div>
                            </div>
                          </div>

                          {/* {zhTW.calculationResults.spouse} */}
                          <div className="bg-pink-50 p-4 rounded-lg">
                            <h4 className="font-bold text-pink-800 mb-3">{zhTW.calculationResults.spouse}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>{zhTW.calculationResults.grossIncome}</span>
                                <span>{formatCurrency(result.spouse.grossIncome)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>减：扣除額总计</span>
                                <span>-{formatCurrency(result.spouse.deductions.totalDeductions)}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>{zhTW.calculationResults.netIncome}</span>
                                <span>{formatCurrency(result.spouse.netIncome)}</span>
                              </div>
                              <div className="flex justify-between text-red-600 font-bold">
                                <span>{zhTW.calculationResults.applicableTaxRate}</span>
                                <span>{result.spouse.bracketInfo?.rate || 0}{zhTW.common.percent}</span>
                              </div>
                              <div className="flex justify-between text-pink-600 font-bold">
                                <span>應納稅额</span>
                                <span>{formatCurrency(result.spouse.taxAmount)}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : result.method === 'salary_separate' && result.taxpayerSalaryPortion && result.remainingPortion ? (
                        <>
                          {/* 本{zhTW.common.people}薪資分開计稅部分 */}
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-bold text-blue-800 mb-3">{result.taxpayerSalaryPortion.description}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>本{zhTW.common.people}薪資所得淨額</span>
                                <span>{formatCurrency(result.taxpayerSalaryPortion.grossIncome)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>减：本{zhTW.common.people}免稅额</span>
                                <span>-{formatCurrency(result.taxpayerSalaryPortion.exemption || 0)}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>薪資应稅淨額</span>
                                <span>{formatCurrency(result.taxpayerSalaryPortion.netIncome)}</span>
                              </div>
                              <div className="flex justify-between text-red-600 font-bold">
                                <span>{zhTW.calculationResults.applicableTaxRate}</span>
                                <span>{result.taxpayerSalaryPortion.bracketInfo?.rate || 0}{zhTW.common.percent}</span>
                              </div>
                              <div className="flex justify-between text-blue-600 font-bold">
                                <span>本{zhTW.common.people}薪資應納稅额</span>
                                <span>{formatCurrency(result.taxpayerSalaryPortion.taxAmount)}</span>
                              </div>
                            </div>
                          </div>

                          {/* 剩餘所得合併计稅部分 */}
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-bold text-green-800 mb-3">{result.remainingPortion.description}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>剩餘所得總額</span>
                                <span>{formatCurrency(result.remainingPortion.grossIncome)}</span>
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                包括：{zhTW.calculationResults.spouse}薪資 {formatCurrency(result.salaryBreakdown?.spouseSalaryNet || 0)} + 其他所得
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>剩餘所得淨額</span>
                                <span>{formatCurrency(result.remainingPortion.netIncome)}</span>
                              </div>
                              <div className="flex justify-between text-red-600 font-bold">
                                <span>{zhTW.calculationResults.applicableTaxRate}</span>
                                <span>{result.remainingPortion.bracketInfo?.rate || 0}{zhTW.common.percent}</span>
                              </div>
                              <div className="flex justify-between text-green-600 font-bold">
                                <span>剩餘所得應納稅额</span>
                                <span>{formatCurrency(result.remainingPortion.taxAmount)}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>

                    {/* 总计 */}
                    <div className="mt-4 bg-green-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">
                          {result.method === 'salary_separate' ? '薪資分開计稅总计' : '分開计稅总计'}
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(result.taxAmount)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {result.method === 'salary_separate' && result.taxpayerSalaryPortion && result.remainingPortion ? (
                            <div>
                              <div>本{zhTW.common.people}薪資：{formatCurrency(result.taxpayerSalaryPortion.netIncome)} {zhTW.common.multiply} {result.taxpayerSalaryPortion.bracketInfo?.rate || 0}{zhTW.common.percent} = {formatCurrency(result.taxpayerSalaryPortion.taxAmount)}</div>
                              <div>剩餘所得：{formatCurrency(result.remainingPortion.netIncome)} {zhTW.common.multiply} {result.remainingPortion.bracketInfo?.rate || 0}{zhTW.common.percent} = {formatCurrency(result.remainingPortion.taxAmount)}</div>
                            </div>
                          ) : result.method === 'all_separate' && result.taxpayer && result.spouse ? (
                            <div>計算公式：{formatCurrency(result.taxpayer.netIncome)} {zhTW.common.multiply} {result.taxpayer.bracketInfo?.rate || 0}{zhTW.common.percent} + {formatCurrency(result.spouse.netIncome)} {zhTW.common.multiply} {result.spouse.bracketInfo?.rate || 0}{zhTW.common.percent}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* {zhTW.basicInfo.married}计稅方式比較 */}
              {isMarried && result.allMethods && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600">计稅方式比較</CardTitle>
                    <p className="text-sm text-gray-600">系統自動選擇稅负最低的计稅方式</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(result.allMethods).map(([method, data]) => (
                        <div
                          key={method}
                          className={`p-3 rounded-lg border-2 ${
                            result.chosenMethod === method
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{data.description}</div>
                              <div className="text-sm text-gray-600">
                                稅额：{formatCurrency(data.totalTax || data.taxAmount)}
                              </div>
                            </div>
                            {result.chosenMethod === method && (
                              <div className="text-green-600 font-bold">
                                ✓ 最优選擇
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {result.savingsComparedToCombined > 0 && (
                      <div className="mt-4 bg-green-100 p-3 rounded-lg">
                        <div className="text-green-800 font-medium">
                          💰 相比传统合併申報，您节省了 {formatCurrency(result.savingsComparedToCombined)} 的稅款
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* 詳細計算過程 */}
              <Card>
                <CardHeader>
                  <CardTitle>{zhTW.cardTitles.completeCalculationFormula}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    {result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) && (
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-bold text-orange-800 mb-3">步驟1：計算薪資淨額（薪資所得扣除薪資{zhTW.cardTitles.specialDeductions}）</h4>
                        <div className="space-y-2">
                          {result.salaryBreakdown.taxpayerSalary > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>纳稅{zhTW.common.people}薪資所得</span>
                                <span>{formatCurrency(result.salaryBreakdown.taxpayerSalary)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>减：薪資{zhTW.cardTitles.specialDeductions}</span>
                                <span>-{formatCurrency(Math.min(result.salaryBreakdown.taxpayerSalary, 218000))}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>薪資淨額</span>
                                <span>{formatCurrency(result.salaryBreakdown.taxpayerSalaryNet)}</span>
                              </div>
                            </div>
                          )}
                          {result.salaryBreakdown.spouseSalary > 0 && (
                            <div className="space-y-1 mt-3 pt-3 border-t">
                              <div className="flex justify-between">
                                <span>{zhTW.calculationResults.spouse}薪資所得</span>
                                <span>{formatCurrency(result.salaryBreakdown.spouseSalary)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>减：薪資{zhTW.cardTitles.specialDeductions}</span>
                                <span>-{formatCurrency(Math.min(result.salaryBreakdown.spouseSalary, 218000))}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>{zhTW.calculationResults.spouse}薪資淨額</span>
                                <span>{formatCurrency(result.salaryBreakdown.spouseSalaryNet)}</span>
                              </div>
                            </div>
                          )}
                          <div className="border-t pt-2 font-bold flex justify-between text-orange-600">
                            <span>{zhTW.calculationResults.grossIncome}</span>
                            <span>{formatCurrency(result.grossIncome)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-blue-800 mb-3">步驟{result.salaryBreakdown?.taxpayerSalary > 0 || result.salaryBreakdown?.spouseSalary > 0 ? '2' : '1'}：計算免稅额</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>一般免稅额{zhTW.common.people}数：{result.deductions.familySize - parseInt(elderlyOver70 || '0')}{zhTW.common.people}</span>
                          <span>{formatCurrency((result.deductions.familySize - parseInt(elderlyOver70 || '0')) * EXEMPTION_AMOUNTS.standard)}</span>
                        </div>
                        {parseInt(elderlyOver70 || '0') > 0 && (
                          <div className="flex justify-between">
                            <span>70岁以上免稅额{zhTW.common.people}数：{elderlyOver70}{zhTW.common.people}</span>
                            <span>{formatCurrency(parseInt(elderlyOver70) * EXEMPTION_AMOUNTS.elderly)}</span>
                          </div>
                        )}
                        <div className="border-t pt-2 font-medium flex justify-between">
                          <span>免稅额小计</span>
                          <span>{formatCurrency(result.deductions.exemptions)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-800 mb-3">步驟{result.salaryBreakdown?.taxpayerSalary > 0 || result.salaryBreakdown?.spouseSalary > 0 ? '3' : '2'}：計算一般扣除額</h4>
                      {useItemizedDeduction ? (
                        <div className="space-y-2">
                          <div className="text-sm text-green-700 mb-2">選擇列舉扣除額：</div>
                          {parseFloat(donations || '0') > 0 && (
                            <div className="flex justify-between">
                              <span>• 捐贈扣除額</span>
                              <span>{formatCurrency(Math.min(parseFloat(donations), result.grossIncome * 0.2))}</span>
                            </div>
                          )}
                          {parseFloat(insurancePremiums || '0') > 0 && (
                            <div className="flex justify-between">
                              <span>• {zhTW.common.people}身保險費（非健保）</span>
                              <span>{formatCurrency(Math.min(parseFloat(insurancePremiums), result.deductions.familySize * 24000))}</span>
                            </div>
                          )}
                          {parseFloat(healthInsurancePremiums || '0') > 0 && (
                            <div className="flex justify-between">
                              <span>• 全民健保費</span>
                              <span>{formatCurrency(parseFloat(healthInsurancePremiums))}</span>
                            </div>
                          )}
                          {parseFloat(medicalExpenses || '0') > 0 && (
                            <div className="flex justify-between">
                              <span>• 醫療費用</span>
                              <span>{formatCurrency(parseFloat(medicalExpenses))}</span>
                            </div>
                          )}
                          {parseFloat(disasterLoss || '0') > 0 && (
                            <div className="flex justify-between">
                              <span>• 災害損失</span>
                              <span>{formatCurrency(parseFloat(disasterLoss))}</span>
                            </div>
                          )}
                          {parseFloat(mortgageInterest || '0') > 0 && (
                            <div className="flex justify-between">
                              <span>• 房貸利息</span>
                              <span>{formatCurrency(Math.max(0, Math.min(parseFloat(mortgageInterest), 300000) - Math.min(parseFloat(savingsInterest || '0'), 270000)))}</span>
                            </div>
                          )}
                          <div className="border-t pt-2 font-medium flex justify-between">
                            <span>一般扣除額小计</span>
                            <span>{formatCurrency(result.deductions.generalDeductions)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>{isMarried ? '夫妻標準扣除額' : '單身標準扣除額'}</span>
                            <span>{formatCurrency(result.deductions.generalDeductions)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-800 mb-3">步驟{result.salaryBreakdown?.taxpayerSalary > 0 || result.salaryBreakdown?.spouseSalary > 0 ? '4' : '3'}：計算{zhTW.cardTitles.specialDeductions}</h4>
                      <div className="space-y-2">
                        <div className="text-xs text-purple-600 mb-2">注：薪資{zhTW.cardTitles.specialDeductions}已在步驟1計算</div>
                        {result.deductions.breakdown.childrenDeduction > 0 && (
                          <div className="flex justify-between">
                            <span>• 幼儿学前扣除額：{childrenUnder6}{zhTW.common.people}</span>
                            <span>{formatCurrency(result.deductions.breakdown.childrenDeduction)}</span>
                          </div>
                        )}
                        {result.deductions.breakdown.educationDeduction > 0 && (
                          <div className="flex justify-between">
                            <span>• 教育学费扣除額：{students}{zhTW.common.people}</span>
                            <span>{formatCurrency(result.deductions.breakdown.educationDeduction)}</span>
                          </div>
                        )}
                        {result.deductions.breakdown.disabilityDeduction > 0 && (
                          <div className="flex justify-between">
                            <span>• 身心障碍扣除額：{disabled}{zhTW.common.people}</span>
                            <span>{formatCurrency(result.deductions.breakdown.disabilityDeduction)}</span>
                          </div>
                        )}
                        {result.deductions.breakdown.longTermCareDeduction > 0 && (
                          <div className="flex justify-between">
                            <span>• 長期照顧扣除額：{longTermCare}{zhTW.common.people}</span>
                            <span>{formatCurrency(result.deductions.breakdown.longTermCareDeduction)}</span>
                          </div>
                        )}
                        {result.deductions.breakdown.savingsDeduction > 0 && (
                          <div className="flex justify-between">
                            <span>• 儲蓄投資扣除額</span>
                            <span>{formatCurrency(result.deductions.breakdown.savingsDeduction)}</span>
                          </div>
                        )}
                        {result.deductions.breakdown.rentalDeduction > 0 && (
                          <div className="flex justify-between">
                            <span>• 房屋租金扣除額</span>
                            <span>{formatCurrency(result.deductions.breakdown.rentalDeduction)}</span>
                          </div>
                        )}
                        <div className="border-t pt-2 font-medium flex justify-between">
                          <span>{zhTW.cardTitles.specialDeductions}小计</span>
                          <span>{formatCurrency(result.deductions.specialDeductions - (result.deductions.breakdown.salaryDeduction || 0))}</span>
                        </div>
                      </div>
                    </div>

                    {result.deductions.basicLivingDifference > 0 && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-bold text-yellow-800 mb-3">步驟{result.salaryBreakdown?.taxpayerSalary > 0 || result.salaryBreakdown?.spouseSalary > 0 ? '5' : '4'}：基本生活费差额</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>基本生活费總額：{result.deductions.familySize}{zhTW.common.people} {zhTW.common.multiply} {formatCurrency(BASIC_LIVING_EXPENSE.amount)}</span>
                            <span>{formatCurrency(result.deductions.familySize * BASIC_LIVING_EXPENSE.amount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>减：免稅额+扣除額合计</span>
                            <span>-{formatCurrency(result.deductions.familySize * BASIC_LIVING_EXPENSE.amount - result.deductions.basicLivingDifference)}</span>
                          </div>
                          <div className="border-t pt-2 font-medium flex justify-between">
                            <span>基本生活费差额</span>
                            <span>{formatCurrency(result.deductions.basicLivingDifference)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-3">步驟{(() => {
                        let step = result.salaryBreakdown?.taxpayerSalary > 0 || result.salaryBreakdown?.spouseSalary > 0 ? 5 : 4;
                        if (result.deductions.basicLivingDifference > 0) step++;
                        return step;
                      })()}：計算{zhTW.calculationResults.netIncome}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>年总收入</span>
                          <span>{formatCurrency(result.grossIncome)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>减：扣除額总计</span>
                          <span>-{formatCurrency(result.deductions.totalDeductions)}</span>
                        </div>
                        <div className="border-t pt-2 font-bold text-lg flex justify-between">
                          <span>{zhTW.calculationResults.netIncome}</span>
                          <span>{formatCurrency(result.netIncome)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-bold text-red-800 mb-3">步驟{(() => {
                        let step = result.salaryBreakdown?.taxpayerSalary > 0 || result.salaryBreakdown?.spouseSalary > 0 ? 6 : 5;
                        if (result.deductions.basicLivingDifference > 0) step++;
                        return step;
                      })()}：計算應納稅额</h4>

                      {/* 分開计稅顯示 */}
                      {(result.method === 'all_separate' || result.method === 'salary_separate') && result.taxpayer && result.spouse ? (
                        <div className="space-y-4">
                          <div className="text-sm text-red-700 mb-2">分開计稅：各自適用不同稅率級距</div>

                          {/* 全部分開计稅时顯示纳稅{zhTW.common.people}和{zhTW.calculationResults.spouse} */}
                          {result.method === 'all_separate' && result.taxpayer && result.spouse ? (
                            <>
                              {/* 纳稅{zhTW.common.people} */}
                              <div className="bg-blue-100 p-3 rounded">
                                <div className="font-medium text-blue-800 mb-2">纳稅{zhTW.common.people}稅额計算</div>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>{zhTW.calculationResults.applicableTaxBracket}：{result.taxpayer.bracketInfo?.description || '0-59萬元'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>{zhTW.calculationResults.netIncome}</span>
                                    <span>{formatCurrency(result.taxpayer.netIncome)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>{zhTW.common.multiply} 稅率</span>
                                    <span>{result.taxpayer.bracketInfo?.rate || 0}{zhTW.common.percent}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>小计</span>
                                    <span>{formatCurrency(result.taxpayer.netIncome * (result.taxpayer.bracketInfo?.rate || 0) / 100)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>减：累进差额</span>
                                    <span>-{formatCurrency(result.taxpayer.bracketInfo?.progressiveDifference || 0)}</span>
                                  </div>
                                  <div className="border-t pt-1 font-medium text-blue-600 flex justify-between">
                                    <span>纳稅{zhTW.common.people}應納稅额</span>
                                    <span>{formatCurrency(result.taxpayer.taxAmount)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* {zhTW.calculationResults.spouse} */}
                              <div className="bg-pink-100 p-3 rounded">
                                <div className="font-medium text-pink-800 mb-2">{zhTW.calculationResults.spouse}稅额計算</div>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>{zhTW.calculationResults.applicableTaxBracket}：{result.spouse.bracketInfo?.description || '0-59萬元'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>{zhTW.calculationResults.netIncome}</span>
                                    <span>{formatCurrency(result.spouse.netIncome)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>{zhTW.common.multiply} 稅率</span>
                                    <span>{result.spouse.bracketInfo?.rate || 0}{zhTW.common.percent}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>小计</span>
                                    <span>{formatCurrency(result.spouse.netIncome * (result.spouse.bracketInfo?.rate || 0) / 100)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>减：累进差额</span>
                                    <span>-{formatCurrency(result.spouse.bracketInfo?.progressiveDifference || 0)}</span>
                                  </div>
                                  <div className="border-t pt-1 font-medium text-pink-600 flex justify-between">
                                    <span>{zhTW.calculationResults.spouse}應納稅额</span>
                                    <span>{formatCurrency(result.spouse.taxAmount)}</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : result.method === 'salary_separate' && result.taxpayerSalaryPortion && result.remainingPortion ? (
                            <>
                              {/* 本{zhTW.common.people}薪資分開计稅部分 */}
                              <div className="bg-blue-100 p-3 rounded">
                                <div className="font-medium text-blue-800 mb-2">本{zhTW.common.people}薪資稅额計算</div>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>{zhTW.calculationResults.applicableTaxBracket}：{result.taxpayerSalaryPortion.bracketInfo?.description || '0-59萬元'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>本{zhTW.common.people}薪資应稅淨額</span>
                                    <span>{formatCurrency(result.taxpayerSalaryPortion.netIncome)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>{zhTW.common.multiply} 稅率</span>
                                    <span>{result.taxpayerSalaryPortion.bracketInfo?.rate || 0}{zhTW.common.percent}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>小计</span>
                                    <span>{formatCurrency(result.taxpayerSalaryPortion.netIncome * (result.taxpayerSalaryPortion.bracketInfo?.rate || 0) / 100)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>减：累进差额</span>
                                    <span>-{formatCurrency(result.taxpayerSalaryPortion.bracketInfo?.progressiveDifference || 0)}</span>
                                  </div>
                                  <div className="border-t pt-1 font-medium text-blue-600 flex justify-between">
                                    <span>本{zhTW.common.people}薪資應納稅额</span>
                                    <span>{formatCurrency(result.taxpayerSalaryPortion.taxAmount)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* 剩餘所得合併计稅部分 */}
                              <div className="bg-green-100 p-3 rounded">
                                <div className="font-medium text-green-800 mb-2">剩餘所得稅额計算</div>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>{zhTW.calculationResults.applicableTaxBracket}：{result.remainingPortion.bracketInfo?.description || '0-59萬元'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>剩餘所得淨額</span>
                                    <span>{formatCurrency(result.remainingPortion.netIncome)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>{zhTW.common.multiply} 稅率</span>
                                    <span>{result.remainingPortion.bracketInfo?.rate || 0}{zhTW.common.percent}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>小计</span>
                                    <span>{formatCurrency(result.remainingPortion.netIncome * (result.remainingPortion.bracketInfo?.rate || 0) / 100)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>减：累进差额</span>
                                    <span>-{formatCurrency(result.remainingPortion.bracketInfo?.progressiveDifference || 0)}</span>
                                  </div>
                                  <div className="border-t pt-1 font-medium text-green-600 flex justify-between">
                                    <span>剩餘所得應納稅额</span>
                                    <span>{formatCurrency(result.remainingPortion.taxAmount)}</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null}

                          {/* 总计 */}
                          <div className="border-t pt-2 font-bold text-xl flex justify-between text-red-600">
                            <span>應納稅额总计</span>
                            <span>{formatCurrency(result.taxAmount)}</span>
                          </div>
                        </div>
                      ) : (
                        /* 合併计稅顯示 */
                        <div className="space-y-2">
                          <div className="text-sm text-red-700 mb-2">{zhTW.calculationResults.applicableTaxBracket}：{result.bracketInfo?.description}</div>
                          <div className="flex justify-between">
                            <span>{zhTW.calculationResults.netIncome}</span>
                            <span>{formatCurrency(result.netIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{zhTW.common.multiply} 稅率</span>
                            <span>{result.bracketInfo?.rate || 0}{zhTW.common.percent}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>小计</span>
                            <span>{formatCurrency((result.netIncome || 0) * (result.bracketInfo?.rate || 0) / 100)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>减：累进差额</span>
                            <span>-{formatCurrency(result.bracketInfo?.progressiveDifference || 0)}</span>
                          </div>
                          <div className="border-t pt-2 font-bold text-xl flex justify-between text-red-600">
                            <span>應納稅额</span>
                            <span>{formatCurrency(result.taxAmount)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* {zhTW.cardTitles.deductionDetails} */}
              <Card>
                <CardHeader>
                  <CardTitle>{zhTW.cardTitles.deductionDetails}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 免稅额說明 */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">免稅额</h4>
                      <div className="text-sm space-y-1">
                        <div>一般免稅额：每{zhTW.common.people}97,000元</div>
                        <div>70岁以上免稅额：每{zhTW.common.people}145,500元</div>
                        <div className="text-xs text-gray-600 mt-2">
                          適用条件：{EXEMPTION_AMOUNTS.conditions.join('、')}
                        </div>
                      </div>
                    </div>

                    {/* {zhTW.cardTitles.specialDeductions}說明 */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">{zhTW.cardTitles.specialDeductions}明细</h4>
                      {SPECIAL_DEDUCTIONS.map((deduction, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded border border-blue-200">
                          <div className="font-medium text-blue-800">{deduction.name}</div>
                          <div className="text-sm text-gray-700 mt-1">{deduction.description}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {deduction.example}
                          </div>
                          {deduction.conditions && (
                            <div className="text-xs text-gray-500 mt-2">
                              条件：{deduction.conditions.join('；')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-500">{zhTW.cardTitles.calculationResults}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <div className="text-6xl mb-4">🧮</div>
                  <div className="text-lg">{zhTW.emptyState.title}</div>
                  <div className="text-sm mt-2">{zhTW.emptyState.description}</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 稅率級距表 */}
          <Card>
            <CardHeader>
              <CardTitle>{zhTW.cardTitles.taxBrackets2025}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {TAX_BRACKETS.map((bracket, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 ${
                      result && result.netIncome >= bracket.min &&
                      (bracket.max === null || result.netIncome <= bracket.max)
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">
                          {bracket.max ?
                            `${formatNumber(bracket.min)} - ${formatNumber(bracket.max)}` :
                            `${formatNumber(bracket.min)} ${zhTW.taxBrackets.above}`
                          }
                        </div>
                        <div className="text-sm text-gray-600">{bracket.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">{bracket.rate}{zhTW.common.percent}</div>
                        <div className="text-xs text-gray-500">
                          {zhTW.taxBrackets.progressiveDifference}: {formatCurrency(bracket.progressiveDifference)}
                        </div>
                      </div>
                    </div>
                    {result && result.netIncome >= bracket.min &&
                     (bracket.max === null || result.netIncome <= bracket.max) && (
                      <div className="mt-2 text-sm text-red-600 font-medium">
                        {zhTW.taxBrackets.yourApplicableBracket}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 列舉扣除額詳細說明 */}
      <Card>
        <CardHeader>
          <CardTitle>{zhTW.cardTitles.itemizedDeductionDetails}</CardTitle>
          <p className="text-sm text-gray-600">{zhTW.itemizedDeductionDetails.description}</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {ITEMIZED_DEDUCTIONS.map((deduction, index) => (
              <div key={index} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">{deduction.name}</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>{zhTW.itemizedDeductionDetails.limit}</strong>{deduction.limit}</div>
                  <div><strong>{zhTW.itemizedDeductionDetails.description2}</strong>{deduction.description}</div>
                  <div className="text-blue-600"><strong>{zhTW.itemizedDeductionDetails.example}</strong>{deduction.example}</div>
                  <div className="text-gray-600">
                    <strong>{zhTW.itemizedDeductionDetails.conditions}</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {deduction.conditions.map((condition, i) => (
                        <li key={i} className="text-xs">{condition}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-gray-600">
                    <strong>{zhTW.itemizedDeductionDetails.requiredDocuments}</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {deduction.requiredDocuments.map((doc, i) => (
                        <li key={i} className="text-xs">{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 節稅建議 */}
      <Card>
        <CardHeader>
          <CardTitle>{zhTW.cardTitles.taxSavingTips}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {TAX_SAVING_TIPS.map((tip, index) => (
              <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">{tip.category}</h4>
                <div className="text-sm text-gray-700 mb-2">{tip.tip}</div>
                <div className="text-xs text-gray-600">{tip.detail}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

              {/* 注意事項和免責聲明 */}
        <Card>
          <CardHeader>
            <CardTitle>{zhTW.cardTitles.importantNotes}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 space-y-2">
              <div>{zhTW.importantNotes.calculatorReference}</div>
              <div>{zhTW.importantNotes.documentReminder}</div>
              <div>{zhTW.importantNotes.professionalAdvice}</div>
              <div>{zhTW.importantNotes.wealthRestrictions}</div>
              <div>{zhTW.importantNotes.basicLivingProtection}</div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}