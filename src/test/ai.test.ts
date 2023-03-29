import { describe, expect, it } from "vitest";

import {
  DISALLOWED_SYMBOLS_REGEXP,
  All_ENGLISH_REGEXP,
  INVALID_CHINESE_REGEXP,
  ALLOWED_CHINESE_REGEXP,
  DOUBLE_SPACE_REGEXP,
  SPACE_REGEXP,
  englishOnly,
  chineseOnly,
} from "./utils";

describe("DISALLOWED_SYMBOLS_REGEXP", () => {
  it("matches disallowed symbols", () => {
    expect(DISALLOWED_SYMBOLS_REGEXP.test("!@#$%^&*()")).toBe(true);
    expect(DISALLOWED_SYMBOLS_REGEXP.test("中文，符号！")).toBe(true);
    expect(DISALLOWED_SYMBOLS_REGEXP.test("abcd中文")).toBe(false);
  });
});

describe("All_ENGLISH_REGEXP", () => {
  it("matches English text", () => {
    expect(All_ENGLISH_REGEXP.test("Hello world")).toBe(true);
    expect(All_ENGLISH_REGEXP.test("中文，符号！")).toBe(false);
  });
});

describe("INVALID_CHINESE_REGEXP", () => {
  it("matches invalid English letters in Chinese-only text", () => {
    expect(INVALID_CHINESE_REGEXP.test("中文，符号！abc")).toBe(true);
    expect(INVALID_CHINESE_REGEXP.test("中文，符号！")).toBe(false);
    expect(INVALID_CHINESE_REGEXP.test("abc")).toBe(true);
  });
});

describe("ALLOWED_CHINESE_REGEXP", () => {
  it("matches Chinese text", () => {
    expect(ALLOWED_CHINESE_REGEXP.test("你好，世界")).toBe(true);
    expect(ALLOWED_CHINESE_REGEXP.test("中文，符号！")).toBe(true);
    expect(ALLOWED_CHINESE_REGEXP.test("Hello, world!")).toBe(false);
  });
});

describe("DOUBLE_SPACE_REGEXP", () => {
  it("matches double spaces", () => {
    expect(DOUBLE_SPACE_REGEXP.test("Hello  world")).toBe(true);
    expect(DOUBLE_SPACE_REGEXP.test("This  has  extra  spaces")).toBe(true);
    expect(DOUBLE_SPACE_REGEXP.test("No double spaces here")).toBe(false);
  });
});

describe("SPACE_REGEXP", () => {
  it("matches spaces", () => {
    expect(SPACE_REGEXP.test("Hello world")).toBe(true);
    expect(SPACE_REGEXP.test("This has spaces")).toBe(true);
    expect(SPACE_REGEXP.test("NoSpacesHere")).toBe(false);
  });
});

describe("englishOnly", () => {
  it("returns true for English text", () => {
    expect(englishOnly("Hello world")).toBe(true);
    expect(englishOnly("This is a sentence.")).toBe(true);
    expect(englishOnly("中文，符号！")).toBe(false);
  });

  it("returns false for non-English text", () => {
    expect(englishOnly("你好，世界")).toBe(false);
    expect(englishOnly("中文，符号！")).toBe(false);
  });
});

describe("chineseOnly", () => {
  it("returns true for Chinese text", () => {
    expect(chineseOnly("你好，世界")).toBe(true);
    expect(chineseOnly("中文，符号！")).toBe(true);
    expect(chineseOnly("Hello, world!")).toBe(false);
  });

  it("returns false for non-Chinese text", () => {
    expect(chineseOnly("Hello, world!")).toBe(false);
    expect(chineseOnly("This is a sentence.")).toBe(false);
  });

  it("returns false for Chinese text with invalid English letters", () => {
    expect(chineseOnly("中文，符号！abc")).toBe(false);
    expect(chineseOnly("中文，符号！")).toBe(true);
  });
});
