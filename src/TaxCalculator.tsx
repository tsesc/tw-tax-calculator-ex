import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import {
  TAX_BRACKETS,
  EXEMPTION_AMOUNTS,
  BASIC_LIVING_EXPENSE,
  TAX_SAVING_TIPS,
  TAX_FREE_THRESHOLDS,
  TAX_REFORM_2025
} from './data/taxRules';
import zhTW from './i18n/zh-TW';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTaxCalculation } from './hooks/useTaxCalculation';
import { formatCurrency, formatNumber } from './utils/formatters';
import { TaxFormData } from './types/tax';

const TaxCalculator: React.FC = () => {
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

  // 个别状态管理
  const [salaryIncome, setSalaryIncome] = useState(formData.salaryIncome);
  const [otherIncome, setOtherIncome] = useState(formData.otherIncome);
  const [spouseSalaryIncome, setSpouseSalaryIncome] = useState(formData.spouseSalaryIncome);
  const [spouseOtherIncome, setSpouseOtherIncome] = useState(formData.spouseOtherIncome);
  const [isMarried, setIsMarried] = useState(formData.isMarried);
  const [taxCalculationMethod, setTaxCalculationMethod] = useState(formData.taxCalculationMethod);
  const [childrenUnder6, setChildrenUnder6] = useState(formData.childrenUnder6);
  const [dependentsGeneral, setDependentsGeneral] = useState(formData.dependentsGeneral);
  const [elderlyOver70, setElderlyOver70] = useState(formData.elderlyOver70);
  const [students, setStudents] = useState(formData.students);
  const [disabled, setDisabled] = useState(formData.disabled);
  const [rentalExpenses, setRentalExpenses] = useState(formData.rentalExpenses);
  const [savingsInterest, setSavingsInterest] = useState(formData.savingsInterest);
  const [longTermCare, setLongTermCare] = useState(formData.longTermCare);
  const [useItemizedDeduction, setUseItemizedDeduction] = useState(formData.useItemizedDeduction);
  const [donations, setDonations] = useState(formData.donations);
  const [insurancePremiums, setInsurancePremiums] = useState(formData.insurancePremiums);
  const [healthInsurancePremiums, setHealthInsurancePremiums] = useState(formData.healthInsurancePremiums);
  const [medicalExpenses, setMedicalExpenses] = useState(formData.medicalExpenses);
  const [disasterLoss, setDisasterLoss] = useState(formData.disasterLoss);
  const [mortgageInterest, setMortgageInterest] = useState(formData.mortgageInterest);

  // 创建当前表单数据对象
  const currentFormData: TaxFormData = {
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

  // 使用税务计算hook
  const result = useTaxCalculation(currentFormData);

  // 保存数据到localStorage
  const saveToLocalStorage = () => {
    setFormData(currentFormData);
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

    // 清除localStorage
    setFormData(emptyData);
  };

  // 当任何输入改变时保存到localStorage
  useEffect(() => {
    saveToLocalStorage();
  }, [
    salaryIncome, otherIncome, spouseSalaryIncome, spouseOtherIncome,
    isMarried, taxCalculationMethod, childrenUnder6, dependentsGeneral, elderlyOver70,
    students, disabled, rentalExpenses, savingsInterest, longTermCare,
    useItemizedDeduction, donations, insurancePremiums, healthInsurancePremiums,
    medicalExpenses, disasterLoss, mortgageInterest
  ]);

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
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">{zhTW.cardTitles.majorTaxReforms2025}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {TAX_REFORM_2025.map((reform, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">{reform.item}</h4>
                <div className="text-sm space-y-1">
                  <div className="text-gray-600">{zhTW.taxReforms.before}: {reform.before}</div>
                  <div className="text-green-600 font-medium">{zhTW.taxReforms.after}: {reform.after}</div>
                  <div className="text-blue-600">{zhTW.taxReforms.impact}: {reform.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 免税门槛快速查询 */}
      <Card>
        <CardHeader>
          <CardTitle>{zhTW.cardTitles.taxFreeThresholds}</CardTitle>
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
        {/* 左侧：输入区域 */}
        <div className="space-y-6">
                  {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle>{zhTW.cardTitles.basicInfo}</CardTitle>
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
                placeholder={zhTW.placeholders.salaryAndBonus}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">
                {zhTW.descriptions.salaryIncomeIncluding}
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
                placeholder={zhTW.placeholders.interestDividendRent}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">
                {zhTW.descriptions.otherIncomeIncluding}
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
                  <h4 className="font-medium text-blue-800">{zhTW.calculationResults.spouse}{zhTW.labels.info}</h4>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {zhTW.calculationResults.spouse}{zhTW.basicInfo.salaryIncome}
                    </label>
                    <Input
                      type="number"
                      value={spouseSalaryIncome}
                      onChange={(e) => setSpouseSalaryIncome(e.target.value)}
                      placeholder={zhTW.placeholders.spouseSalaryAndBonus}
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
                      placeholder={zhTW.placeholders.spouseOtherIncome}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{zhTW.labels.taxCalculationMethodPost2018}</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="taxCalculationMethod"
                          checked={taxCalculationMethod === 'combined'}
                          onChange={() => setTaxCalculationMethod('combined')}
                          className="rounded"
                        />
                        <span>{zhTW.basicInfo.combinedFiling}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="taxCalculationMethod"
                          checked={taxCalculationMethod === 'salary_separate'}
                          onChange={() => setTaxCalculationMethod('salary_separate')}
                          className="rounded"
                        />
                        <span>{zhTW.basicInfo.salarySeparate}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="taxCalculationMethod"
                          checked={taxCalculationMethod === 'all_separate'}
                          onChange={() => setTaxCalculationMethod('all_separate')}
                          className="rounded"
                        />
                        <span>{zhTW.basicInfo.allSeparate}</span>
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
                      {zhTW.basicInfo.eTaxDescription}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 扶养亲属 */}
          <Card>
            <CardHeader>
              <CardTitle>{zhTW.cardTitles.dependents}</CardTitle>
              <p className="text-sm text-gray-600">{zhTW.dependents.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.labels.childrenUnder6New2025}
                </label>
                <Input
                  type="number"
                  value={childrenUnder6}
                  onChange={(e) => setChildrenUnder6(e.target.value)}
                  placeholder={zhTW.placeholders.bornAfter2018}
                  className="w-full"
                />
                <div className="text-xs text-blue-600 mt-1">
                  {zhTW.dependents.childrenDescription}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.labels.elderlyOver70Count}
                </label>
                <Input
                  type="number"
                  value={elderlyOver70}
                  onChange={(e) => setElderlyOver70(e.target.value)}
                  placeholder={zhTW.placeholders.elderlyOver70}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {zhTW.descriptions.elderlyHigherExemption}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.labels.generalDependentsCount}
                </label>
                <Input
                  type="number"
                  value={dependentsGeneral}
                  onChange={(e) => setDependentsGeneral(e.target.value)}
                  placeholder={zhTW.placeholders.dependents6to70}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {zhTW.descriptions.generalExemptionAmount}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.labels.collegeStudentsCount}
                </label>
                <Input
                  type="number"
                  value={students}
                  onChange={(e) => setStudents(e.target.value)}
                  placeholder={zhTW.placeholders.collegeStudents}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {zhTW.descriptions.educationFeeDeduction}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.labels.disabledCount}
                </label>
                <Input
                  type="number"
                  value={disabled}
                  onChange={(e) => setDisabled(e.target.value)}
                  placeholder={zhTW.placeholders.disabledPersons}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {zhTW.descriptions.disabilityDeduction}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.labels.longTermCareCount}
                </label>
                <Input
                  type="number"
                  value={longTermCare}
                  onChange={(e) => setLongTermCare(e.target.value)}
                  placeholder={zhTW.placeholders.longTermCareNeeds}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1 space-y-1">
                  <div>{zhTW.descriptions.longTermCareDeduction}</div>
                  <div className="text-orange-600">{zhTW.dependents.longTermCareWarning}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 扣除额选择 */}
          <Card>
            <CardHeader>
              <CardTitle>{zhTW.cardTitles.deductionChoice}</CardTitle>
                          <p className="text-sm text-gray-600">{zhTW.deductionChoice.description}</p>
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
                <span>{zhTW.deductionChoice.useItemizedDeduction}</span>
              </label>
              <div className="text-xs text-gray-500 mt-1">
                {zhTW.descriptions.standardDeductionAmounts}
              </div>
            </div>

            {useItemizedDeduction && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800">{zhTW.labels.itemizedDeductionDetails}</h4>
                <div className="text-xs text-blue-600 mb-4">
                  {zhTW.labels.itemizedDeductionReminder}
                </div>

                                  <div>
                  <label className="block text-sm font-medium mb-2">
                    {zhTW.labels.donationAmount}
                  </label>
                  <Input
                    type="number"
                    value={donations}
                    onChange={(e) => setDonations(e.target.value)}
                    placeholder={zhTW.placeholders.donationsToLegalOrgs}
                  />
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    {zhTW.deductionChoice.donationsConditions.map((condition, index) => (
                      <div key={index}>{condition}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {zhTW.labels.personalInsuranceNonNHI}
                  </label>
                  <Input
                    type="number"
                    value={insurancePremiums}
                    onChange={(e) => setInsurancePremiums(e.target.value)}
                    placeholder={zhTW.placeholders.personalInsuranceExcludingNHI}
                  />
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    {zhTW.deductionChoice.personalInsuranceConditions.map((condition, index) => (
                      <div key={index}>{condition}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {zhTW.labels.nationalHealthInsurance}
                  </label>
                  <Input
                    type="number"
                    value={healthInsurancePremiums}
                    onChange={(e) => setHealthInsurancePremiums(e.target.value)}
                    placeholder={zhTW.placeholders.totalNHIPremiums}
                  />
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    {zhTW.deductionChoice.healthInsuranceConditions.map((condition, index) => (
                      <div key={index}>{condition}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {zhTW.labels.medicalAndBirthExpenses}
                  </label>
                  <Input
                    type="number"
                    value={medicalExpenses}
                    onChange={(e) => setMedicalExpenses(e.target.value)}
                    placeholder={zhTW.placeholders.legalHospitalMedicalFees}
                  />
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    {zhTW.deductionChoice.medicalConditions.map((condition, index) => (
                      <div key={index}>{condition}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {zhTW.labels.disasterLosses}
                  </label>
                  <Input
                    type="number"
                    value={disasterLoss}
                    onChange={(e) => setDisasterLoss(e.target.value)}
                    placeholder={zhTW.placeholders.forceDisasterLosses}
                  />
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    {zhTW.deductionChoice.disasterConditions.map((condition, index) => (
                      <div key={index}>{condition}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {zhTW.labels.mortgageInterestSelfUse}
                  </label>
                  <Input
                    type="number"
                    value={mortgageInterest}
                    onChange={(e) => setMortgageInterest(e.target.value)}
                    placeholder={zhTW.placeholders.selfUseMortgageInterest}
                  />
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    {zhTW.deductionChoice.mortgageConditions.map((condition, index) => (
                      <div key={index}>{condition}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 mb-2">{zhTW.labels.excludedFromItemizedDeduction}</h5>
                  <div className="text-xs text-yellow-700 space-y-1">
                    {zhTW.deductionChoice.excludedItemsList.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 特别扣除额 */}
          <Card>
            <CardHeader>
              <CardTitle>{zhTW.cardTitles.specialDeductions}</CardTitle>
              <p className="text-sm text-gray-600">{zhTW.specialDeductions.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.labels.rentalExpensesNew2025}
                </label>
                <Input
                  type="number"
                  value={rentalExpenses}
                  onChange={(e) => setRentalExpenses(e.target.value)}
                  placeholder={zhTW.placeholders.rentalExpensesForSelfUse}
                  className="w-full"
                />
                <div className="text-xs text-blue-600 mt-1">
                  {zhTW.descriptions.rentalMajorReform2025}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {zhTW.labels.savingsInterestIncome}
                </label>
                <Input
                  type="number"
                  value={savingsInterest}
                  onChange={(e) => setSavingsInterest(e.target.value)}
                  placeholder={zhTW.placeholders.bankDepositInterest}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {zhTW.descriptions.savingsInterestLimit}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：结果显示 */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* 计算结果摘要 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">{zhTW.cardTitles.calculationResults}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">{zhTW.calculationResults.taxAmount}</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(result.taxAmount || 0)}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">{zhTW.calculationResults.effectiveTaxRate}</div>
                        <div className="text-2xl font-bold text-green-600">
                          {(result.effectiveRate || 0).toFixed(2)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">{zhTW.calculationResults.afterTaxIncome}</div>
                        <div className="text-xl font-bold text-gray-800">
                          {formatCurrency((result.grossIncome || 0) - (result.taxAmount || 0))}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">{zhTW.calculationResults.applicableTaxBracket}</div>
                        <div className="text-xl font-bold text-purple-600">
                          {(result.bracketInfo?.rate || 0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 已婚分开计税详细信息 */}
              {isMarried && 'method' in result && (
                (('taxpayer' in result && 'spouse' in result && result.method === 'all_separate') ||
                 ('taxpayerSalaryPortion' in result && 'remainingPortion' in result && result.method === 'salary_separate')) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-purple-600">{zhTW.labels.separateFilingDetailedInfo}</CardTitle>
                      <p className="text-sm text-gray-600">{zhTW.calculationResults.separateFilingDescription}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.method === 'all_separate' && 'taxpayer' in result && 'spouse' in result && result.taxpayer && result.spouse ? (
                          <>
                            {/* 纳税人 */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-bold text-blue-800 mb-3">{zhTW.calculationResults.taxpayer}</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>{zhTW.calculationResults.grossIncome}</span>
                                  <span>{formatCurrency(result.taxpayer.grossIncome || 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{zhTW.calculationResults.minusDeductionsTotal}</span>
                                  <span>-{formatCurrency(result.taxpayer.deductions.totalDeductions)}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                  <span>{zhTW.calculationResults.netIncome}</span>
                                  <span>{formatCurrency(result.taxpayer.netIncome || 0)}</span>
                                </div>
                                <div className="flex justify-between text-red-600 font-bold">
                                  <span>{zhTW.calculationResults.applicableTaxRate}</span>
                                  <span>{result.taxpayer.bracketInfo?.rate || 0}%</span>
                                </div>
                                <div className="flex justify-between text-blue-600 font-bold">
                                  <span>{zhTW.calculationResults.taxAmount}</span>
                                  <span>{formatCurrency(result.taxpayer.taxAmount)}</span>
                                </div>
                              </div>
                            </div>

                            {/* 配偶 */}
                            <div className="bg-pink-50 p-4 rounded-lg">
                              <h4 className="font-bold text-pink-800 mb-3">{zhTW.calculationResults.spouse}</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>{zhTW.calculationResults.grossIncome}</span>
                                  <span>{formatCurrency(result.spouse.grossIncome || 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>减：扣除额总计</span>
                                  <span>-{formatCurrency(result.spouse.deductions.totalDeductions)}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                  <span>{zhTW.calculationResults.netIncome}</span>
                                  <span>{formatCurrency(result.spouse.netIncome || 0)}</span>
                                </div>
                                <div className="flex justify-between text-red-600 font-bold">
                                  <span>{zhTW.calculationResults.applicableTaxRate}</span>
                                  <span>{result.spouse.bracketInfo?.rate || 0}%</span>
                                </div>
                                <div className="flex justify-between text-pink-600 font-bold">
                                  <span>应纳税额</span>
                                  <span>{formatCurrency(result.spouse.taxAmount)}</span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : result.method === 'salary_separate' && 'taxpayerSalaryPortion' in result && 'remainingPortion' in result && result.taxpayerSalaryPortion && result.remainingPortion ? (
                          <>
                            {/* 本人薪资分开计税部分 */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-bold text-blue-800 mb-3">{result.taxpayerSalaryPortion.description}</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>{zhTW.calculationResults.taxpayerSalaryNet}</span>
                                  <span>{formatCurrency(result.taxpayerSalaryPortion.grossIncome || 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{zhTW.common.minus}{zhTW.calculationResults.taxpayerExemption}</span>
                                  <span>-{formatCurrency(result.taxpayerSalaryPortion.exemption || 0)}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                  <span>{zhTW.calculationResults.salaryTaxableNet}</span>
                                  <span>{formatCurrency(result.taxpayerSalaryPortion.netIncome || 0)}</span>
                                </div>
                                <div className="flex justify-between text-red-600 font-bold">
                                  <span>{zhTW.calculationResults.applicableTaxRate}</span>
                                  <span>{result.taxpayerSalaryPortion.bracketInfo?.rate || 0}%</span>
                                </div>
                                <div className="flex justify-between text-blue-600 font-bold">
                                  <span>{zhTW.calculationResults.taxpayerSalaryTaxAmount}</span>
                                  <span>{formatCurrency(result.taxpayerSalaryPortion.taxAmount)}</span>
                                </div>
                              </div>
                            </div>

                            {/* 剩余所得合并计税部分 */}
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h4 className="font-bold text-green-800 mb-3">{result.remainingPortion.description}</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>{zhTW.calculationResults.remainingIncomeTotal}</span>
                                  <span>{formatCurrency(result.remainingPortion.grossIncome || 0)}</span>
                                </div>
                                <div className="text-xs text-gray-600 mb-2">
                                  {zhTW.descriptions.includesSpouseSalary} {formatCurrency('salaryBreakdown' in result ? result.salaryBreakdown?.spouseSalaryNet || 0 : 0)} {zhTW.descriptions.otherIncome}
                                </div>
                                <div className="flex justify-between font-medium">
                                  <span>{zhTW.calculationResults.remainingIncomeNet}</span>
                                  <span>{formatCurrency(result.remainingPortion.netIncome || 0)}</span>
                                </div>
                                <div className="flex justify-between text-red-600 font-bold">
                                  <span>{zhTW.calculationResults.applicableTaxRate}</span>
                                  <span>{result.remainingPortion.bracketInfo?.rate || 0}%</span>
                                </div>
                                <div className="flex justify-between text-green-600 font-bold">
                                  <span>{zhTW.calculationResults.remainingIncomeTaxAmount}</span>
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
                            {result.method === 'salary_separate' ? zhTW.calculationResults.salarySeperateTotalLabel : zhTW.calculationResults.separateFilingTotalLabel}
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(result.taxAmount || 0)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {result.method === 'salary_separate' && 'taxpayerSalaryPortion' in result && 'remainingPortion' in result && result.taxpayerSalaryPortion && result.remainingPortion ? (
                              <div>
                                <div>{zhTW.calculationResults.taxpayerSalary}：{formatCurrency(result.taxpayerSalaryPortion.netIncome || 0)} × {result.taxpayerSalaryPortion.bracketInfo?.rate || 0}% = {formatCurrency(result.taxpayerSalaryPortion.taxAmount)}</div>
                                <div>{zhTW.calculationResults.remainingIncome}：{formatCurrency(result.remainingPortion.netIncome || 0)} × {result.remainingPortion.bracketInfo?.rate || 0}% = {formatCurrency(result.remainingPortion.taxAmount)}</div>
                              </div>
                            ) : result.method === 'all_separate' && 'taxpayer' in result && 'spouse' in result && result.taxpayer && result.spouse ? (
                              <div>{zhTW.calculationResults.calculationFormulaLabel}：{formatCurrency(result.taxpayer.netIncome || 0)} × {result.taxpayer.bracketInfo?.rate || 0}% + {formatCurrency(result.spouse.netIncome || 0)} × {result.spouse.bracketInfo?.rate || 0}%</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}

              {/* 已婚计税方式比较 */}
              {isMarried && 'allMethods' in result && result.allMethods && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600">{zhTW.labels.filingMethodComparisonTitle}</CardTitle>
                    <p className="text-sm text-gray-600">{zhTW.filingMethodComparison.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(result.allMethods).map(([method, data]) => (
                        <div
                          key={method}
                          className={`p-3 rounded-lg border-2 ${
                            'chosenMethod' in result && result.chosenMethod === method
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{data.description}</div>
                              <div className="text-sm text-gray-600">
                                {zhTW.filingMethodComparison.taxAmount}：{formatCurrency(data.totalTax || data.taxAmount)}
                              </div>
                            </div>
                            {'chosenMethod' in result && result.chosenMethod === method && (
                              <div className="text-green-600 font-bold">
                                {zhTW.calculationResults.bestChoice}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {'savingsComparedToCombined' in result && result.savingsComparedToCombined && result.savingsComparedToCombined > 0 && (
                      <div className="mt-4 bg-green-100 p-3 rounded-lg">
                        <div className="text-green-800 font-medium">
                          {zhTW.calculationResults.savingsMessage} {formatCurrency(result.savingsComparedToCombined)} {zhTW.filingMethodComparison.taxSavings}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* 详细计算过程 */}
              <Card>
                <CardHeader>
                  <CardTitle>{zhTW.cardTitles.completeCalculationFormula}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    {'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) && (
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-bold text-orange-800 mb-3">步骤1：计算薪资净额（薪资所得扣除薪资{zhTW.cardTitles.specialDeductions}）</h4>
                        <div className="space-y-2">
                          {result.salaryBreakdown.taxpayerSalary > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>纳税人薪资所得</span>
                                <span>{formatCurrency(result.salaryBreakdown.taxpayerSalary)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>减：薪资{zhTW.cardTitles.specialDeductions}</span>
                                <span>-{formatCurrency(Math.min(result.salaryBreakdown.taxpayerSalary, 218000))}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>薪资净额</span>
                                <span>{formatCurrency(result.salaryBreakdown.taxpayerSalaryNet)}</span>
                              </div>
                            </div>
                          )}
                          {result.salaryBreakdown.spouseSalary > 0 && (
                            <div className="space-y-1 mt-3 pt-3 border-t">
                              <div className="flex justify-between">
                                <span>{zhTW.calculationResults.spouse}薪资所得</span>
                                <span>{formatCurrency(result.salaryBreakdown.spouseSalary)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>减：薪资{zhTW.cardTitles.specialDeductions}</span>
                                <span>-{formatCurrency(Math.min(result.salaryBreakdown.spouseSalary, 218000))}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>{zhTW.calculationResults.spouse}薪资净额</span>
                                <span>{formatCurrency(result.salaryBreakdown.spouseSalaryNet)}</span>
                              </div>
                            </div>
                          )}
                          <div className="border-t pt-2 font-bold flex justify-between text-orange-600">
                            <span>{zhTW.calculationResults.grossIncome}</span>
                            <span>{formatCurrency(result.grossIncome || 0)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {'deductions' in result && result.deductions && (
                      <>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-bold text-blue-800 mb-3">步骤{'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? '2' : '1'}：计算免税额</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>一般免税额人数：{result.deductions.familySize - parseInt(elderlyOver70 || '0')}人</span>
                              <span>{formatCurrency((result.deductions.familySize - parseInt(elderlyOver70 || '0')) * EXEMPTION_AMOUNTS.standard)}</span>
                            </div>
                            {parseInt(elderlyOver70 || '0') > 0 && (
                              <div className="flex justify-between">
                                <span>70岁以上免税额人数：{elderlyOver70}人</span>
                                <span>{formatCurrency(parseInt(elderlyOver70) * EXEMPTION_AMOUNTS.elderly)}</span>
                              </div>
                            )}
                            <div className="border-t pt-2 font-medium flex justify-between">
                              <span>免税额小计</span>
                              <span>{formatCurrency(result.deductions.exemptions)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-bold text-green-800 mb-3">步骤{'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? '3' : '2'}：计算一般扣除额</h4>
                          {useItemizedDeduction ? (
                            <div className="space-y-2">
                              <div className="text-sm text-green-700 mb-2">选择列举扣除额：</div>
                              {parseFloat(donations || '0') > 0 && (
                                <div className="flex justify-between">
                                  <span>• 捐赠扣除额</span>
                                  <span>{formatCurrency(Math.min(parseFloat(donations), (result.grossIncome || 0) * 0.2))}</span>
                                </div>
                              )}
                              {parseFloat(insurancePremiums || '0') > 0 && (
                                <div className="flex justify-between">
                                  <span>• 人身保险费（非健保）</span>
                                  <span>{formatCurrency(Math.min(parseFloat(insurancePremiums), result.deductions.familySize * 24000))}</span>
                                </div>
                              )}
                              {parseFloat(healthInsurancePremiums || '0') > 0 && (
                                <div className="flex justify-between">
                                  <span>• 全民健保费</span>
                                  <span>{formatCurrency(parseFloat(healthInsurancePremiums))}</span>
                                </div>
                              )}
                              {parseFloat(medicalExpenses || '0') > 0 && (
                                <div className="flex justify-between">
                                  <span>• 医疗费用</span>
                                  <span>{formatCurrency(parseFloat(medicalExpenses))}</span>
                                </div>
                              )}
                              {parseFloat(disasterLoss || '0') > 0 && (
                                <div className="flex justify-between">
                                  <span>• 灾害损失</span>
                                  <span>{formatCurrency(parseFloat(disasterLoss))}</span>
                                </div>
                              )}
                              {parseFloat(mortgageInterest || '0') > 0 && (
                                <div className="flex justify-between">
                                  <span>• 房贷利息</span>
                                  <span>{formatCurrency(Math.max(0, Math.min(parseFloat(mortgageInterest), 300000) - Math.min(parseFloat(savingsInterest || '0'), 270000)))}</span>
                                </div>
                              )}
                              <div className="border-t pt-2 font-medium flex justify-between">
                                <span>一般扣除额小计</span>
                                <span>{formatCurrency(result.deductions.generalDeductions)}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>{isMarried ? '夫妻标准扣除额' : '单身标准扣除额'}</span>
                                <span>{formatCurrency(result.deductions.generalDeductions)}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-bold text-purple-800 mb-3">步骤{'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? '4' : '3'}：计算{zhTW.cardTitles.specialDeductions}</h4>
                          <div className="space-y-2">
                            <div className="text-xs text-purple-600 mb-2">注：薪资{zhTW.cardTitles.specialDeductions}已在步骤1计算</div>
                            {result.deductions.breakdown.childrenDeduction > 0 && (
                              <div className="flex justify-between">
                                <span>• 幼儿学前扣除额：{childrenUnder6}人</span>
                                <span>{formatCurrency(result.deductions.breakdown.childrenDeduction)}</span>
                              </div>
                            )}
                            {result.deductions.breakdown.educationDeduction > 0 && (
                              <div className="flex justify-between">
                                <span>• 教育学费扣除额：{students}人</span>
                                <span>{formatCurrency(result.deductions.breakdown.educationDeduction)}</span>
                              </div>
                            )}
                            {result.deductions.breakdown.disabilityDeduction > 0 && (
                              <div className="flex justify-between">
                                <span>• 身心障碍扣除额：{disabled}人</span>
                                <span>{formatCurrency(result.deductions.breakdown.disabilityDeduction)}</span>
                              </div>
                            )}
                            {result.deductions.breakdown.longTermCareDeduction > 0 && (
                              <div className="flex justify-between">
                                <span>• 长期照顾扣除额：{longTermCare}人</span>
                                <span>{formatCurrency(result.deductions.breakdown.longTermCareDeduction)}</span>
                              </div>
                            )}
                            {result.deductions.breakdown.savingsDeduction > 0 && (
                              <div className="flex justify-between">
                                <span>• 储蓄投资扣除额</span>
                                <span>{formatCurrency(result.deductions.breakdown.savingsDeduction)}</span>
                              </div>
                            )}
                            {result.deductions.breakdown.rentalDeduction > 0 && (
                              <div className="flex justify-between">
                                <span>• 房屋租金扣除额</span>
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
                            <h4 className="font-bold text-yellow-800 mb-3">步骤{'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? '5' : '4'}：基本生活费差额</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>基本生活费总额：{result.deductions.familySize}人 × {formatCurrency(BASIC_LIVING_EXPENSE.amount)}</span>
                                <span>{formatCurrency(result.deductions.familySize * BASIC_LIVING_EXPENSE.amount)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>减：免税额+扣除额合计</span>
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
                          <h4 className="font-bold text-gray-800 mb-3">步骤{(() => {
                            let step = 'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? 5 : 4;
                            if (result.deductions.basicLivingDifference > 0) step++;
                            return step;
                          })()}：计算{zhTW.calculationResults.netIncome}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>年总收入</span>
                              <span>{formatCurrency(result.grossIncome || 0)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>减：扣除额总计</span>
                              <span>-{formatCurrency(result.deductions.totalDeductions)}</span>
                            </div>
                            <div className="border-t pt-2 font-bold text-lg flex justify-between">
                              <span>{zhTW.calculationResults.netIncome}</span>
                              <span>{formatCurrency(result.netIncome || 0)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg">
                          <h4 className="font-bold text-red-800 mb-3">步骤{(() => {
                            let step = 'salaryBreakdown' in result && result.salaryBreakdown && (result.salaryBreakdown.taxpayerSalary > 0 || result.salaryBreakdown.spouseSalary > 0) ? 6 : 5;
                            if (result.deductions.basicLivingDifference > 0) step++;
                            return step;
                          })()}：计算应纳税额</h4>

                          <div className="space-y-2">
                            <div className="text-sm text-red-700 mb-2">{zhTW.calculationResults.applicableTaxBracket}：{result.bracketInfo?.description}</div>
                            <div className="flex justify-between">
                              <span>{zhTW.calculationResults.netIncome}</span>
                              <span>{formatCurrency(result.netIncome || 0)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>× 税率</span>
                              <span>{result.bracketInfo?.rate || 0}%</span>
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
                              <span>应纳税额</span>
                              <span>{formatCurrency(result.taxAmount || 0)}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
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

          {/* 税率级距表 */}
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
                      result && result.netIncome && result.netIncome >= bracket.min &&
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
                        <div className="text-xl font-bold text-blue-600">{bracket.rate}%</div>
                        <div className="text-xs text-gray-500">
                          {zhTW.taxBrackets.progressiveDifference}: {formatCurrency(bracket.progressiveDifference)}
                        </div>
                      </div>
                    </div>
                    {result && result.netIncome && result.netIncome >= bracket.min &&
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

      {/* 节税建议 */}
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

      {/* 注意事项和免责声明 */}
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
};

export default TaxCalculator;