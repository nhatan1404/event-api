import parsePhoneNumber from 'libphonenumber-js';

export const formatPhoneNumber = (phone) =>
  parsePhoneNumber(phone, 'VN').number;
