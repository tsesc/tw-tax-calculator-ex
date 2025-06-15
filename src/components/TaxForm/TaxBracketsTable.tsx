import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TAX_BRACKETS } from '../../data/taxRules';
import { formatCurrency } from '../../utils/formatters';
import zhTW from '../../i18n/zh-TW';

interface TaxBracketsTableProps {
  result?: any;
}

const TaxBracketsTable: React.FC<TaxBracketsTableProps> = ({ result }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{zhTW.labels.taxBracketTable2025}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">綜合所得淨額</th>
                <th className="text-left p-2">稅率</th>
                <th className="text-left p-2">{zhTW.taxBrackets.progressiveDifference}</th>
              </tr>
            </thead>
            <tbody>
              {TAX_BRACKETS.map((bracket, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    result?.bracketInfo?.rate === bracket.rate
                      ? 'bg-blue-50 font-medium'
                      : ''
                  }`}
                >
                  <td className="p-2">
                    {index === 0 ? '0' : formatCurrency(TAX_BRACKETS[index - 1].max || 0)} - {' '}
                    {bracket.max === Infinity ? `${zhTW.taxBrackets.above}${formatCurrency(bracket.min || 0)}` : formatCurrency(bracket.max || 0)}
                  </td>
                  <td className="p-2">{bracket.rate}%</td>
                  <td className="p-2">{formatCurrency(bracket.progressiveDifference)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {result?.bracketInfo && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-blue-800 font-medium">
              {zhTW.taxBrackets.yourApplicableBracket}：{result.bracketInfo.rate}%
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxBracketsTable;