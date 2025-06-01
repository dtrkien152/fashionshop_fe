export const ValidationUtils = {
  isValidEmail: (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isValidPhoneNumber: (phone: string): boolean => /^(?:\+84|0)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])\d{6,7}$/.test(phone),
};
