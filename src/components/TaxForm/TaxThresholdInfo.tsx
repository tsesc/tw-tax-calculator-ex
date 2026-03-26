import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TAX_FREE_THRESHOLDS } from '../../data/taxRules';
import { formatCurrency } from '../../utils/formatters';
import { useLanguage } from '../../hooks/useLanguage';
import { TaxFormData } from '../../types/tax';

interface TaxThresholdInfoProps {
  onApplyPreset?: (preset: Partial<TaxFormData>) => void;
}

const TaxThresholdInfo: React.FC<TaxThresholdInfoProps> = ({ onApplyPreset }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-600">{t.cardTitles.taxFreeThresholds}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TAX_FREE_THRESHOLDS.map((threshold, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onApplyPreset?.(threshold.formPreset as Partial<TaxFormData>)}
              className="bg-green-50 p-4 rounded-lg border border-green-200 text-left transition-all hover:bg-green-100 hover:border-green-400 hover:shadow-md cursor-pointer"
            >
              <h4 className="font-semibold text-green-800">{(t as any).taxThresholdData?.[threshold.familyTypeKey] || threshold.familyTypeKey}</h4>
              <div className="text-2xl font-bold text-green-600 my-2">
                {formatCurrency(threshold.threshold)}
              </div>
              <div className="text-xs text-gray-600">{(t as any).taxThresholdData?.[threshold.calculationKey] || threshold.calculationKey}</div>
              <div className="text-xs text-blue-600 mt-2 font-medium">{(t as any).taxThresholdData?.clickToApply || '👆 點擊套用此情境'}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxThresholdInfo;
