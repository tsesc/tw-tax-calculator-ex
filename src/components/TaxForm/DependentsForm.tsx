import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { TaxFormData } from '../../types/tax';
import zhTW from '../../i18n/zh-TW';

interface DependentsFormProps {
  formData: TaxFormData;
  onFieldChange: (field: keyof TaxFormData, value: string) => void;
}

const DependentsForm: React.FC<DependentsFormProps> = ({ formData, onFieldChange }) => {
  return (
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
            value={formData.childrenUnder6}
            onChange={(e) => onFieldChange('childrenUnder6', e.target.value)}
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
            value={formData.elderlyOver70}
            onChange={(e) => onFieldChange('elderlyOver70', e.target.value)}
            placeholder={zhTW.placeholders.elderlyOver70}
            className="w-full"
          />
          <div className="text-xs text-green-600 mt-1">
            {zhTW.descriptions.elderlyHigherExemption}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {zhTW.labels.generalDependentsCount}
          </label>
          <Input
            type="number"
            value={formData.dependentsGeneral}
            onChange={(e) => onFieldChange('dependentsGeneral', e.target.value)}
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
            value={formData.students}
            onChange={(e) => onFieldChange('students', e.target.value)}
            placeholder={zhTW.placeholders.collegeStudents}
            className="w-full"
          />
          <div className="text-xs text-purple-600 mt-1">
            {zhTW.descriptions.educationFeeDeduction}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {zhTW.labels.disabledCount}
          </label>
          <Input
            type="number"
            value={formData.disabled}
            onChange={(e) => onFieldChange('disabled', e.target.value)}
            placeholder={zhTW.placeholders.disabledPersons}
            className="w-full"
          />
          <div className="text-xs text-orange-600 mt-1">
            {zhTW.descriptions.disabilityDeduction}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {zhTW.labels.longTermCareCount}
          </label>
          <Input
            type="number"
            value={formData.longTermCare}
            onChange={(e) => onFieldChange('longTermCare', e.target.value)}
            placeholder={zhTW.placeholders.longTermCareNeeds}
            className="w-full"
          />
          <div className="text-xs text-red-600 mt-1">
            {zhTW.descriptions.longTermCareDeduction}
          </div>
          <div className="text-xs text-red-500 mt-1">
            {zhTW.dependents.longTermCareWarning}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DependentsForm;