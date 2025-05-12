const otpGenerator =  require('otp-generator');

interface OTPOptions {
  upperCaseAlphabets: boolean;
  lowerCaseAlphabets: boolean;
  specialChars: boolean;
  digits: boolean;
}

export const generateOTP = (length: number = 6, options: OTPOptions = {
  upperCaseAlphabets: true,
  lowerCaseAlphabets: false,
  specialChars: false,
  digits: false,
}): string => {
  return otpGenerator.generate(length, options);
};