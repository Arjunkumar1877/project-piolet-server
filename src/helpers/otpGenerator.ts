const otpGenerator =  require('otp-generator');

interface OTPOptions {
  upperCaseAlphabets: boolean;
  lowerCaseAlphabets: boolean;
  specialChars: boolean;
  digits: boolean;
}

export const generateOTP = (length: number = 6, options: OTPOptions = {
  upperCaseAlphabets: false,
  lowerCaseAlphabets: false,
  specialChars: false,
  digits: true,
}): string => {
  return otpGenerator.generate(length, options);
};