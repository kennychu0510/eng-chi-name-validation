export const DISALLOWED_SYMBOLS_REGEXP =
/[\p{Extended_Pictographic}\d,，。*!@#$%^&()_+=\[\]{};:"“”～•£¥€~\\|/?（）？。，、⋯œ∑´®†¨øπ«åß∂ƒ©˙∆˚¬⋯⋯æ≈ç√∫˜µ≤≥÷¶×¢✓`°！-：—…【】｛｝《》￥·…；＞《《》｛｛｝【【】＜＜＞「「」※€￡°÷×￦＄￥·／＝＿－＋％＃＊°￦」＞】｝》［］＾｀₩○●□■◇☆︎¤]/gu;
export const All_ENGLISH_REGEXP = /^[A-Za-z .‘'’\-]+$/g;
export const INVALID_CHINESE_REGEXP = /[A-Za-z]/g;
export const ALLOWED_CHINESE_REGEXP = /[\p{sc=Han}]/gu;

export const DOUBLE_SPACE_REGEXP = /\s\s+/g;
export const SPACE_REGEXP = /\s/g;

export function englishOnly(text: string): boolean {
  const regexp = new RegExp(All_ENGLISH_REGEXP);
  return regexp.test(text);
}

export function chineseOnly(text: string): boolean {
  const chiRegExp = new RegExp(ALLOWED_CHINESE_REGEXP);
  const checkForInvalid = new RegExp(INVALID_CHINESE_REGEXP);
  if (chiRegExp.test(text)) {
    if (checkForInvalid.test(text)) {
      return false;
    }
    return true;
  }
  return false;
}

export function setName(value: string) {
  let castedValue = value.replace(DISALLOWED_SYMBOLS_REGEXP, "");
  return castedValue;
}

export function getLocale(value: string) {
  let locale: "eng" | "chi" | undefined = undefined;
  if (chineseOnly(value)) {
    locale = "chi";
  } else if (englishOnly(value)) {
    locale = 'eng'
  }

  return locale

}
