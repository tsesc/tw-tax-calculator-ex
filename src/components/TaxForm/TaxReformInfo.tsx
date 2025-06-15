import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TAX_REFORM_2025 } from '../../data/taxRules';
import zhTW from '../../i18n/zh-TW';

const TaxReformInfo: React.FC = () => {
  return (
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
  );
};

export default TaxReformInfo;