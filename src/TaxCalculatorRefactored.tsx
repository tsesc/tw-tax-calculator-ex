import React from 'react';
import { Button } from './components/ui/button';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTaxCalculation } from './hooks/useTaxCalculation';
import { useLanguage } from './hooks/useLanguage';
import { TaxFormData } from './types/tax';
import {
  TaxReformInfo,
  TaxThresholdInfo,
  BasicInfoForm,
  DependentsForm,
  DeductionForm,
  TaxResultDisplay,
  DetailedCalculationProcess,
  TaxBracketsTable,
  TaxSavingTips,
  ImportantNotes
} from './components/TaxForm';

const TaxCalculatorRefactored: React.FC = () => {
  // 使用語言 hook
  const { language, setLanguage, t } = useLanguage();

  // 使用localStorage缓存的状态
  const [formData, setFormData] = useLocalStorage<TaxFormData>('taxCalculatorData', {
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

  // 使用税务计算hook
  const result = useTaxCalculation(formData);

  // 处理字段变更
  const handleFieldChange = (field: keyof TaxFormData, value: string | boolean) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
  };

  // 套用免稅門檻情境預設值
  const applyPreset = (preset: Partial<TaxFormData>) => {
    const emptyData: TaxFormData = {
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
    setFormData({ ...emptyData, ...preset });
  };

  // 清除所有缓存数据
  const clearCachedData = () => {
    const emptyData: TaxFormData = {
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
    setFormData(emptyData);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* 标题和说明 */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          {t.title}
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          {t.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-blue-600">
          <span>✓ {t.features.realTimeCalculation}</span>
          <span>✓ {t.features.detailedDeductions}</span>
          <span>✓ {t.features.completeFormula}</span>
          <span>✓ {t.features.taxSavingTips}</span>
          <span>✓ {t.features.autoSave}</span>
        </div>

        {/* 清除缓存按钮和語言切換按鈕 */}
        <div className="flex justify-center items-center gap-3 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={clearCachedData}
            className="text-red-600 border-red-200 hover:bg-red-50 text-xs sm:text-sm"
          >
            🗑️ {t.buttons.clearAllData}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'zh-TW' ? 'en-US' : 'zh-TW')}
            className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm"
          >
            🌐 {language === 'zh-TW' ? 'English' : '中文'}
          </Button>
        </div>
      </div>

      {/* 115年度重大稅制變革 */}
      <TaxReformInfo />

      {/* 免税门槛快速查询 */}
      <TaxThresholdInfo onApplyPreset={applyPreset} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 左侧：输入区域 */}
        <div className="space-y-6">
          {/* 基本信息 */}
          <BasicInfoForm formData={formData} onFieldChange={handleFieldChange} />

          {/* 扶养亲属 */}
          <DependentsForm formData={formData} onFieldChange={handleFieldChange} />

          {/* 扣除额选择 */}
          <DeductionForm formData={formData} onFieldChange={handleFieldChange} />
        </div>

        {/* 右侧：结果显示 */}
        <div className="space-y-6">
          <TaxResultDisplay result={result} isMarried={formData.isMarried} />

          {/* 详细计算过程 */}
          <DetailedCalculationProcess result={result} formData={formData} />
        </div>
      </div>

      {/* 税率级距表 */}
      <TaxBracketsTable result={result} formData={formData} />

      {/* 节税建议 */}
      <TaxSavingTips />

      {/* 注意事项和免责声明 */}
      <ImportantNotes />
    </div>
  );
};

export default TaxCalculatorRefactored;