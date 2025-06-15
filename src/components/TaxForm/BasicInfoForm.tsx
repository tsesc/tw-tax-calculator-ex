import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { TaxFormData } from '../../types/tax';
import zhTW from '../../i18n/zh-TW';

interface BasicInfoFormProps {
  formData: TaxFormData;
  onFieldChange: (field: keyof TaxFormData, value: string | boolean) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formData, onFieldChange }) => {
  // Helper function to calculate monthly amount from annual
  const calculateMonthly = (annualAmount: string): string => {
    if (!annualAmount || annualAmount === '0') return '';
    const annual = parseFloat(annualAmount);
    if (isNaN(annual) || annual <= 0) return '';
    return Math.round(annual / 12).toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{zhTW.cardTitles.basicInfo}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {zhTW.basicInfo.salaryIncome}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                value={formData.salaryIncome}
                onChange={(e) => onFieldChange('salaryIncome', e.target.value)}
                placeholder={zhTW.placeholders.salaryAndBonus}
                className="w-full text-sm sm:text-base"
              />
              <div className="text-xs text-gray-400 mt-1">年薪</div>
            </div>
            <div>
              <div className="w-full p-2 bg-gray-50 border rounded-md text-gray-600 text-sm sm:text-base break-all min-h-[2.5rem] flex items-center">
                {calculateMonthly(formData.salaryIncome) || '平均月薪'}
              </div>
              <div className="text-xs text-gray-400 mt-1">平均月薪</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {zhTW.descriptions.salaryIncomeIncluding}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {zhTW.basicInfo.otherIncome}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                value={formData.otherIncome}
                onChange={(e) => onFieldChange('otherIncome', e.target.value)}
                placeholder={zhTW.placeholders.interestDividendRent}
                className="w-full text-sm sm:text-base"
              />
              <div className="text-xs text-gray-400 mt-1">年收入</div>
            </div>
            <div>
              <div className="w-full p-2 bg-gray-50 border rounded-md text-gray-600 text-sm sm:text-base break-all min-h-[2.5rem] flex items-center">
                {calculateMonthly(formData.otherIncome) || '平均月收入'}
              </div>
              <div className="text-xs text-gray-400 mt-1">平均月收入</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {zhTW.descriptions.otherIncomeIncluding}
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isMarried}
              onChange={(e) => onFieldChange('isMarried', e.target.checked)}
              className="rounded"
            />
            <span>{zhTW.basicInfo.married}</span>
          </label>
        </div>

        {formData.isMarried && (
          <div className="bg-blue-50 p-4 rounded-lg space-y-4">
            <h4 className="font-medium text-blue-800">{zhTW.calculationResults.spouse}{zhTW.labels.info}</h4>

            <div>
              <label className="block text-sm font-medium mb-2">
                {zhTW.calculationResults.spouse}{zhTW.basicInfo.salaryIncome}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <Input
                    type="number"
                    value={formData.spouseSalaryIncome}
                    onChange={(e) => onFieldChange('spouseSalaryIncome', e.target.value)}
                    placeholder={zhTW.placeholders.spouseSalaryAndBonus}
                    className="w-full text-sm sm:text-base"
                  />
                  <div className="text-xs text-gray-400 mt-1">年薪</div>
                </div>
                <div>
                  <div className="w-full p-2 bg-gray-50 border rounded-md text-gray-600 text-sm sm:text-base break-all min-h-[2.5rem] flex items-center">
                    {calculateMonthly(formData.spouseSalaryIncome) || '平均月薪'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">平均月薪</div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {zhTW.calculationResults.spouse}{zhTW.basicInfo.otherIncome}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <Input
                    type="number"
                    value={formData.spouseOtherIncome}
                    onChange={(e) => onFieldChange('spouseOtherIncome', e.target.value)}
                    placeholder={zhTW.placeholders.spouseOtherIncome}
                    className="w-full text-sm sm:text-base"
                  />
                  <div className="text-xs text-gray-400 mt-1">年收入</div>
                </div>
                <div>
                  <div className="w-full p-2 bg-gray-50 border rounded-md text-gray-600 text-sm sm:text-base break-all min-h-[2.5rem] flex items-center">
                    {calculateMonthly(formData.spouseOtherIncome) || '平均月收入'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">平均月收入</div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{zhTW.labels.taxCalculationMethodPost2018}</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="taxCalculationMethod"
                    checked={formData.taxCalculationMethod === 'combined'}
                    onChange={() => onFieldChange('taxCalculationMethod', 'combined')}
                    className="rounded"
                  />
                  <span>{zhTW.basicInfo.combinedFiling}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="taxCalculationMethod"
                    checked={formData.taxCalculationMethod === 'salary_separate'}
                    onChange={() => onFieldChange('taxCalculationMethod', 'salary_separate')}
                    className="rounded"
                  />
                  <span>{zhTW.basicInfo.salarySeparate}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="taxCalculationMethod"
                    checked={formData.taxCalculationMethod === 'all_separate'}
                    onChange={() => onFieldChange('taxCalculationMethod', 'all_separate')}
                    className="rounded"
                  />
                  <span>{zhTW.basicInfo.allSeparate}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="taxCalculationMethod"
                    checked={formData.taxCalculationMethod === 'auto'}
                    onChange={() => onFieldChange('taxCalculationMethod', 'auto')}
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
  );
};

export default BasicInfoForm;