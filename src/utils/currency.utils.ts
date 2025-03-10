export const CurrencyUtils = {
  /**
   * Chuyển đổi số sang định dạng tiền VND
   * @param amount Số cần chuyển đổi
   * @param withSuffix Có hiển thị đuôi "₫" hay không (mặc định: true)
   * @returns Chuỗi định dạng tiền tệ VND
   */
  formatCurrencyVND: (amount: number, withSuffix: boolean = true): string => {
    if (!amount) return '0 ₫';

    const formattedAmount = amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    });

    return withSuffix ? formattedAmount : formattedAmount.replace('₫', '').trim();
  },
};
