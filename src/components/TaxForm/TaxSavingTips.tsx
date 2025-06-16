import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../hooks/useLanguage';

const TaxSavingTips: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600">{t.cardTitles.taxSavingTips}</CardTitle>
      </CardHeader>
      <CardContent>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-700 space-y-1">
            <div>💰 {t.taxSavingTipsContent.specialDeductions}</div>
            <div>📄 {t.taxSavingTipsContent.insurancePlanning}</div>
            <div>🏡 {t.taxSavingTipsContent.rentalBenefit}</div>
            <div>💡 {t.taxSavingTipsContent.marriedCouple}</div>
            <div>📋 {t.taxSavingTipsContent.itemizedDeductions}</div>
            <div>🛡️ {t.taxSavingTipsContent.longTermCare}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxSavingTips;