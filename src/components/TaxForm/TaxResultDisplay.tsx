import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '../../utils/formatters';
import zhTW from '../../i18n/zh-TW';

interface TaxResultDisplayProps {
  result: any; // 使用 any 类型暂时处理复杂的结果类型
  isMarried: boolean;
}

const TaxResultDisplay: React.FC<TaxResultDisplayProps> = ({ result, isMarried }) => {
  const [showEffectiveRateFormula, setShowEffectiveRateFormula] = useState(false);
  const [showAfterTaxFormula, setShowAfterTaxFormula] = useState(false);

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
            {/* 第一行：總收入和應納稅額 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
                <div className="text-sm text-gray-600">{zhTW.calculationResults.totalIncome}</div>
                <div className="text-xl sm:text-2xl font-bold text-indigo-600 break-all">
                  {formatCurrency(result.grossIncome || 0)}
                </div>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <div className="text-sm text-gray-600">{zhTW.calculationResults.taxAmount}</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-600 break-all">
                  {formatCurrency(result.taxAmount || 0)}
                </div>
              </div>
            </div>

            {/* 第二行：有效稅率和稅後淨收入 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg relative">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">{zhTW.calculationResults.effectiveTaxRate}</div>
                  <button
                    onClick={() => setShowEffectiveRateFormula(!showEffectiveRateFormula)}
                    className="w-4 h-4 bg-green-600 text-white rounded-full text-xs flex items-center justify-center hover:bg-green-700 transition-colors flex-shrink-0"
                    title="點擊查看計算公式"
                  >
                    ?
                  </button>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {(result.effectiveRate || 0).toFixed(2)}%
                </div>
                {showEffectiveRateFormula && (
                  <div className="absolute top-full left-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-xs text-gray-700 max-w-xs sm:whitespace-nowrap">
                    {zhTW.calculationResults.effectiveTaxRateFormula}
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg relative">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">{zhTW.calculationResults.afterTaxIncome}</div>
                  <button
                    onClick={() => setShowAfterTaxFormula(!showAfterTaxFormula)}
                    className="w-4 h-4 bg-gray-600 text-white rounded-full text-xs flex items-center justify-center hover:bg-gray-700 transition-colors flex-shrink-0"
                    title="點擊查看計算公式"
                  >
                    ?
                  </button>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800 break-all">
                  {formatCurrency((result.grossIncome || 0) - (result.taxAmount || 0))}
                </div>
                {showAfterTaxFormula && (
                  <div className="absolute top-full left-0 mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-xs text-gray-700 max-w-xs sm:whitespace-nowrap">
                    {zhTW.calculationResults.afterTaxIncomeFormula}
                  </div>
                )}
              </div>
            </div>

            {/* 第三行：適用稅率級距 */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                <div className="text-sm text-gray-600">{zhTW.calculationResults.applicableTaxBracket}</div>
                <div className="text-xl sm:text-2xl font-bold text-purple-600">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {result.method === 'all_separate' && 'taxpayer' in result && 'spouse' in result && result.taxpayer && result.spouse ? (
                  <>
                    {/* 纳税人 */}
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-bold text-blue-800 mb-3">{zhTW.calculationResults.taxpayer}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-start">
                          <span className="flex-shrink-0">{zhTW.calculationResults.grossIncome}</span>
                          <span className="text-right break-all ml-2">{formatCurrency(result.taxpayer.grossIncome || 0)}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="flex-shrink-0">{zhTW.calculationResults.minusDeductionsTotal}</span>
                          <span className="text-right break-all ml-2">-{formatCurrency(result.taxpayer.deductions.totalDeductions)}</span>
                        </div>
                        <div className="flex justify-between items-start font-medium">
                          <span className="flex-shrink-0">{zhTW.calculationResults.netIncome}</span>
                          <span className="text-right break-all ml-2">{formatCurrency(result.taxpayer.netIncome || 0)}</span>
                        </div>
                        <div className="flex justify-between items-start text-red-600 font-bold">
                          <span className="flex-shrink-0">{zhTW.calculationResults.applicableTaxRate}</span>
                          <span className="text-right ml-2">{result.taxpayer.bracketInfo?.rate || 0}%</span>
                        </div>
                        <div className="flex justify-between items-start text-blue-600 font-bold">
                          <span className="flex-shrink-0">{zhTW.calculationResults.taxAmount}</span>
                          <span className="text-right break-all ml-2">{formatCurrency(result.taxpayer.taxAmount)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 配偶 */}
                    <div className="bg-pink-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-bold text-pink-800 mb-3">{zhTW.calculationResults.spouse}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-start">
                          <span className="flex-shrink-0">{zhTW.calculationResults.grossIncome}</span>
                          <span className="text-right break-all ml-2">{formatCurrency(result.spouse.grossIncome || 0)}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="flex-shrink-0">减：扣除额总计</span>
                          <span className="text-right break-all ml-2">-{formatCurrency(result.spouse.deductions.totalDeductions)}</span>
                        </div>
                        <div className="flex justify-between items-start font-medium">
                          <span className="flex-shrink-0">{zhTW.calculationResults.netIncome}</span>
                          <span className="text-right break-all ml-2">{formatCurrency(result.spouse.netIncome || 0)}</span>
                        </div>
                        <div className="flex justify-between items-start text-red-600 font-bold">
                          <span className="flex-shrink-0">{zhTW.calculationResults.applicableTaxRate}</span>
                          <span className="text-right ml-2">{result.spouse.bracketInfo?.rate || 0}%</span>
                        </div>
                        <div className="flex justify-between items-start text-pink-600 font-bold">
                          <span className="flex-shrink-0">应纳税额</span>
                          <span className="text-right break-all ml-2">{formatCurrency(result.spouse.taxAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              {/* 总计 */}
              <div className="mt-4 bg-green-50 p-3 sm:p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-600">
                    {result.method === 'salary_separate' ? zhTW.calculationResults.salarySeperateTotalLabel : zhTW.calculationResults.separateFilingTotalLabel}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600 break-all">
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
                  className={`p-3 sm:p-4 rounded-lg border-2 ${
                    'chosenMethod' in result && result.chosenMethod === method
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex-1">
                      <div className="font-medium text-sm sm:text-base">{data.description}</div>
                      <div className="text-sm text-gray-600 break-all">
                        {zhTW.filingMethodComparison.taxAmount}：{formatCurrency(data.totalTax || data.taxAmount)}
                      </div>
                    </div>
                    {'chosenMethod' in result && result.chosenMethod === method && (
                      <div className="text-green-600 font-bold text-sm sm:text-base flex-shrink-0">
                        {zhTW.calculationResults.bestChoice}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {'savingsComparedToCombined' in result && result.savingsComparedToCombined && result.savingsComparedToCombined > 0 && (
              <div className="mt-4 bg-green-100 p-3 sm:p-4 rounded-lg">
                <div className="text-green-800 font-medium text-sm sm:text-base break-all">
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