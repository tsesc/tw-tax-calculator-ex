import React from 'react';
import { Button } from './components/ui/button';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTaxCalculation } from './hooks/useTaxCalculation';
import { TaxFormData } from './types/tax';
import zhTW from './i18n/zh-TW';
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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 标题和说明 */}
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

        {/* 清除缓存按钮 */}
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

      {/* 2025年重大税制变革 */}
      <TaxReformInfo />

      {/* 免税门槛快速查询 */}
      <TaxThresholdInfo />

      <div className="grid lg:grid-cols-2 gap-6">
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
      <TaxBracketsTable result={result} />

      {/* 节税建议 */}
      <TaxSavingTips />

      {/* 注意事项和免责声明 */}
      <ImportantNotes />
    </div>
  );
};

export default TaxCalculatorRefactored;