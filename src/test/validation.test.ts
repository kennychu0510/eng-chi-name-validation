import { describe, expect, it } from "vitest";
import { chineseOnly, englishOnly, setName } from "./utils";

describe("english check", () => {
  it("english only only accepts english", () => {
    expect(englishOnly("ABC")).toBe(true);
  });

  it("english to accept special symbols", () => {
    expect(englishOnly(`. -'`)).toBe(true);
  });

  it("reject chinese", () => {
    expect(englishOnly(`預約遙距視像探訪`)).toBe(false);
  });

  it("reject mix of chinese and english", () => {
    expect(englishOnly(`預約遙距視像探訪abcde`)).toBe(false);
  });
});

describe("chinese check", () => {
  it("accept chinese", () => {
    expect(chineseOnly("預約遙距視像探訪")).toBe(true);
  });

  it("reject english", () => {
    expect(chineseOnly("abcd efg")).toBe(false);
  });

  it("reject space", () => {
    expect(chineseOnly(" ")).toBe(false);
  });

  it("reject space", () => {
    expect(chineseOnly("距視 距視")).toBe(false);
  });

  it("reject mix of chinese and english", () => {
    expect(chineseOnly(`預約遙距視像探訪abcde`)).toBe(false);
  });

  it("reject symbols", () => {
    expect(chineseOnly(`. -'`)).toBe(false);
  });

  it("reject symbols with chinese", () => {
    expect(chineseOnly(`距視. -'`)).toBe(false);
  });
});

describe("set name function", () => {
  it("emojis to be rejected", () => {
    expect(setName("😍😀😄")).toBe("");
  });

  it("emojis to be removed", () => {
    expect(setName("😍abcefg😀😄")).toBe("abcefg");
  });

  it("emojis to be removed", () => {
    expect(setName("😍遙距視像😀探訪😄")).toBe("遙距視像探訪");
  });

  it("forbidden symbols to be removed", () => {
    expect(setName("@dkjlkasd#$%^&")).toBe("dkjlkasd");
  });
});
