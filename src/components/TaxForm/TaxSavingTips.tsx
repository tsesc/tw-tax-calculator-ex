import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TAX_SAVING_TIPS } from '../../data/taxRules';
import zhTW from '../../i18n/zh-TW';

const TaxSavingTips: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600">{zhTW.cardTitles.taxSavingTips}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {TAX_SAVING_TIPS.map((tip, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">{tip.category}</h4>
              <p className="text-sm text-green-700 mb-2">{tip.tip}</p>
              <div className="text-xs text-green-600">
                <strong>詳細：</strong>{tip.detail}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxSavingTips;