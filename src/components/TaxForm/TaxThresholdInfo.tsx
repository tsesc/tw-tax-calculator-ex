import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TAX_FREE_THRESHOLDS } from '../../data/taxRules';
import { formatCurrency } from '../../utils/formatters';
import zhTW from '../../i18n/zh-TW';

const TaxThresholdInfo: React.FC = () => {
  return (
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
  );
};

export default TaxThresholdInfo;