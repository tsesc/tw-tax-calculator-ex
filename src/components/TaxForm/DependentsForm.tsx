import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { TaxFormData } from '../../types/tax';
import { useLanguage } from '../../hooks/useLanguage';

interface DependentsFormProps {
  formData: TaxFormData;
  onFieldChange: (field: keyof TaxFormData, value: string | boolean) => void;
}

const DependentsForm: React.FC<DependentsFormProps> = ({ formData, onFieldChange }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.cardTitles.dependents}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 mb-4">
          {t.dependents.description}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t.labels.childrenUnder6New2025}
          </label>
          <Input
            type="number"
            min="0"
            value={formData.childrenUnder6}
            onChange={(e) => onFieldChange('childrenUnder6', e.target.value)}
            placeholder={t.placeholders.bornAfter2018}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {t.dependents.childrenDescription}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t.labels.elderlyOver70Count}
          </label>
          <Input
            type="number"
            min="0"
            value={formData.elderlyOver70}
            onChange={(e) => onFieldChange('elderlyOver70', e.target.value)}
            placeholder={t.placeholders.elderlyOver70}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {t.descriptions.elderlyHigherExemption}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t.labels.generalDependentsCount}
          </label>
          <Input
            type="number"
            min="0"
            value={formData.dependentsGeneral}
            onChange={(e) => onFieldChange('dependentsGeneral', e.target.value)}
            placeholder={t.placeholders.dependents6to70}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {t.descriptions.generalExemptionAmount}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t.labels.collegeStudentsCount}
          </label>
          <Input
            type="number"
            min="0"
            value={formData.students}
            onChange={(e) => onFieldChange('students', e.target.value)}
            placeholder={t.placeholders.collegeStudents}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {t.descriptions.educationFeeDeduction}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t.labels.disabledCount}
          </label>
          <Input
            type="number"
            min="0"
            value={formData.disabled}
            onChange={(e) => onFieldChange('disabled', e.target.value)}
            placeholder={t.placeholders.disabledPersons}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {t.descriptions.disabilityDeduction}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t.labels.longTermCareCount}
          </label>
          <Input
            type="number"
            min="0"
            value={formData.longTermCare}
            onChange={(e) => onFieldChange('longTermCare', e.target.value)}
            placeholder={t.placeholders.longTermCareNeeds}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">
            {t.descriptions.longTermCareDeduction}
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            {t.dependents.longTermCareWarning}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DependentsForm;