import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { TaxFormData } from '../../types/tax';
import zhTW from '../../i18n/zh-TW';

interface DeductionFormProps {
  formData: TaxFormData;
  onFieldChange: (field: keyof TaxFormData, value: string | boolean) => void;
}

const DeductionForm: React.FC<DeductionFormProps> = ({ formData, onFieldChange }) => {
  return (
    <>
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
                checked={formData.useItemizedDeduction}
                onChange={(e) => onFieldChange('useItemizedDeduction', e.target.checked)}
                className="rounded"
              />
              <span>{zhTW.deductionChoice.useItemizedDeduction}</span>
            </label>
            <div className="text-xs text-gray-500 mt-1">
              {zhTW.descriptions.standardDeductionAmounts}
            </div>
          </div>

          {formData.useItemizedDeduction && (
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
                  value={formData.donations}
                  onChange={(e) => onFieldChange('donations', e.target.value)}
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
                  value={formData.insurancePremiums}
                  onChange={(e) => onFieldChange('insurancePremiums', e.target.value)}
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
                  value={formData.healthInsurancePremiums}
                  onChange={(e) => onFieldChange('healthInsurancePremiums', e.target.value)}
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
                  value={formData.medicalExpenses}
                  onChange={(e) => onFieldChange('medicalExpenses', e.target.value)}
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
                  value={formData.disasterLoss}
                  onChange={(e) => onFieldChange('disasterLoss', e.target.value)}
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
                  value={formData.mortgageInterest}
                  onChange={(e) => onFieldChange('mortgageInterest', e.target.value)}
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
              value={formData.rentalExpenses}
              onChange={(e) => onFieldChange('rentalExpenses', e.target.value)}
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
              value={formData.savingsInterest}
              onChange={(e) => onFieldChange('savingsInterest', e.target.value)}
              placeholder={zhTW.placeholders.bankDepositInterest}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {zhTW.descriptions.savingsInterestLimit}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DeductionForm;