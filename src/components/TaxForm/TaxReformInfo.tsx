import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TAX_REFORM_2025 } from '../../data/taxRules';
import { useLanguage } from '../../hooks/useLanguage';

const TaxReformInfo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">{t.cardTitles.majorTaxReforms2025}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {TAX_REFORM_2025.map((reform, index) => (
            <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">{t.taxReformData?.[reform.itemKey as keyof typeof t.taxReformData] || reform.itemKey}</h4>
              <div className="text-sm space-y-1">
                <div className="text-gray-600">{t.taxReforms.before}: {t.taxReformData?.[reform.beforeKey as keyof typeof t.taxReformData] || reform.beforeKey}</div>
                <div className="text-green-600 font-medium">{t.taxReforms.after}: {t.taxReformData?.[reform.afterKey as keyof typeof t.taxReformData] || reform.afterKey}</div>
                <div className="text-blue-600">{t.taxReforms.impact}: {t.taxReformData?.[reform.impactKey as keyof typeof t.taxReformData] || reform.impactKey}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxReformInfo;