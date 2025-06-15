// 格式化工具函数

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('zh-TW').format(num);
};

export const formatCurrency = (amount: number): string => {
  return `NT$${formatNumber(amount)}`;
};