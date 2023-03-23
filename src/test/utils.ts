export const DISALLOWED_INPUT_REGEXP = /([^a-zA-Z .'’\-\p{sc=Han}])/gu;
export const DISALLOWED_SYMBOLS_REGEXP = /[\p{Extended_Pictographic}\d,，。*!@#$%^&()_+=\[\]{};:"“”～•£¥€~\\|<>/?]/gu
// export const ALLOWED_ENGLISH_REGEXP = /([a-z]|[A-Z]|[ .'’\-])/g;
export const All_ENGLISH_REGEXP = /^[A-Za-z .'’\-]+/g;
export const ALLOWED_ENGLISH_REGEXP = /[A-Za-z .'’\-]/g;
// export const ALLOWED_CHINESE_REGEXP = /^[\p{sc=Han}]+/gu;
export const ALLOWED_CHINESE_REGEXP = /[\p{sc=Han}]/gu;

export const SPACE_REGEXP = /\s\s+/g;

export function englishOnly(text: string): boolean {
  const regexp = new RegExp(All_ENGLISH_REGEXP);
  return regexp.test(text);
}

export function chineseOnly(text: string): boolean {
  const chiRegExp = new RegExp(ALLOWED_CHINESE_REGEXP);
  const checkForInvalid = new RegExp(ALLOWED_ENGLISH_REGEXP);
  if (chiRegExp.test(text)) {
    if (checkForInvalid.test(text)) {
      return false
    }
    return true
  }
  return false
}

export function setName(value: string) {
    let castedValue = value.replace(DISALLOWED_SYMBOLS_REGEXP, '');
    return (castedValue);
  }