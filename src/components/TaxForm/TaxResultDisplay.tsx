import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '../../utils/formatters';
import zhTW from '../../i18n/zh-TW';

interface TaxResultDisplayProps {
  result: any; // 使用 any 类型暂时处理复杂的结果类型
  isMarried: boolean;
}

const TaxResultDisplay: React.FC<TaxResultDisplayProps> = ({ result, isMarried }) => {
  if (!result) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-gray-500">
            <h3 className="text-lg font-medium mb-2">{zhTW.emptyState.title}</h3>
            <p className="text-sm">{zhTW.emptyState.description}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* 计算结果摘要 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">{zhTW.cardTitles.calculationResults}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">{zhTW.calculationResults.taxAmount}</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.taxAmount || 0)}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">{zhTW.calculationResults.effectiveTaxRate}</div>
                <div className="text-2xl font-bold text-green-600">
                  {(result.effectiveRate || 0).toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">{zhTW.calculationResults.afterTaxIncome}</div>
                <div className="text-xl font-bold text-gray-800">
                  {formatCurrency((result.grossIncome || 0) - (result.taxAmount || 0))}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">{zhTW.calculationResults.applicableTaxBracket}</div>
                <div className="text-xl font-bold text-purple-600">
                  {(result.bracketInfo?.rate || 0)}%
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 已婚分开计税详细信息 */}
      {isMarried && 'method' in result && (
        (('taxpayer' in result && 'spouse' in result && result.method === 'all_separate') ||
         ('taxpayerSalaryPortion' in result && 'remainingPortion' in result && result.method === 'salary_separate')) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">{zhTW.labels.separateFilingDetailedInfo}</CardTitle>
              <p className="text-sm text-gray-600">{zhTW.calculationResults.separateFilingDescription}</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {result.method === 'all_separate' && 'taxpayer' in result && 'spouse' in result && result.taxpayer && result.spouse ? (
                  <>
                    {/* 纳税人 */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-blue-800 mb-3">{zhTW.calculationResults.taxpayer}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{zhTW.calculationResults.grossIncome}</span>
                          <span>{formatCurrency(result.taxpayer.grossIncome || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{zhTW.calculationResults.minusDeductionsTotal}</span>
                          <span>-{formatCurrency(result.taxpayer.deductions.totalDeductions)}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>{zhTW.calculationResults.netIncome}</span>
                          <span>{formatCurrency(result.taxpayer.netIncome || 0)}</span>
                        </div>
                        <div className="flex justify-between text-red-600 font-bold">
                          <span>{zhTW.calculationResults.applicableTaxRate}</span>
                          <span>{result.taxpayer.bracketInfo?.rate || 0}%</span>
                        </div>
                        <div className="flex justify-between text-blue-600 font-bold">
                          <span>{zhTW.calculationResults.taxAmount}</span>
                          <span>{formatCurrency(result.taxpayer.taxAmount)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 配偶 */}
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h4 className="font-bold text-pink-800 mb-3">{zhTW.calculationResults.spouse}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{zhTW.calculationResults.grossIncome}</span>
                          <span>{formatCurrency(result.spouse.grossIncome || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>减：扣除额总计</span>
                          <span>-{formatCurrency(result.spouse.deductions.totalDeductions)}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>{zhTW.calculationResults.netIncome}</span>
                          <span>{formatCurrency(result.spouse.netIncome || 0)}</span>
                        </div>
                        <div className="flex justify-between text-red-600 font-bold">
                          <span>{zhTW.calculationResults.applicableTaxRate}</span>
                          <span>{result.spouse.bracketInfo?.rate || 0}%</span>
                        </div>
                        <div className="flex justify-between text-pink-600 font-bold">
                          <span>应纳税额</span>
                          <span>{formatCurrency(result.spouse.taxAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              {/* 总计 */}
              <div className="mt-4 bg-green-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-600">
                    {result.method === 'salary_separate' ? zhTW.calculationResults.salarySeperateTotalLabel : zhTW.calculationResults.separateFilingTotalLabel}
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.taxAmount || 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )}

      {/* 已婚计税方式比较 */}
      {isMarried && 'allMethods' in result && result.allMethods && (
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">{zhTW.labels.filingMethodComparisonTitle}</CardTitle>
            <p className="text-sm text-gray-600">{zhTW.filingMethodComparison.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(result.allMethods).map(([method, data]: [string, any]) => (
                <div
                  key={method}
                  className={`p-3 rounded-lg border-2 ${
                    'chosenMethod' in result && result.chosenMethod === method
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{data.description}</div>
                      <div className="text-sm text-gray-600">
                        {zhTW.filingMethodComparison.taxAmount}：{formatCurrency(data.totalTax || data.taxAmount)}
                      </div>
                    </div>
                    {'chosenMethod' in result && result.chosenMethod === method && (
                      <div className="text-green-600 font-bold">
                        {zhTW.calculationResults.bestChoice}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {'savingsComparedToCombined' in result && result.savingsComparedToCombined && result.savingsComparedToCombined > 0 && (
              <div className="mt-4 bg-green-100 p-3 rounded-lg">
                <div className="text-green-800 font-medium">
                  {zhTW.calculationResults.savingsMessage} {formatCurrency(result.savingsComparedToCombined)} {zhTW.filingMethodComparison.taxSavings}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TaxResultDisplay;