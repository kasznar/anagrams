import { createDictionary, createKey, readLineByLine } from "./dictionary";

const MOCK_WORDLIST = "data/wordlist.mock.txt";

describe("dictionary", () => {
  describe("createKey", () => {
    it("should convert to lowercase", () => {
      expect(createKey("AAAA")).toBe("aaaa");
    });

    it("should sort alphabetically", () => {
      expect(createKey("cba")).toBe("abc");
      expect(createKey("caB")).toBe("abc");
    });

    it("should remove spaces", () => {
      expect(createKey("c ba")).toBe("abc");
    });
  });

  describe("readLineByLine", () => {
    let cb;

    beforeAll(() => {
      cb = jest.fn();
    });

    it("should call the cb 3 times", async () => {
      await readLineByLine(MOCK_WORDLIST, cb);
      expect(cb).toBeCalledTimes(3);
    });

    it("should call with every line value", async () => {
      await readLineByLine(MOCK_WORDLIST, cb);
      expect(cb).toHaveBeenNthCalledWith(1, "cba");
      expect(cb).toHaveBeenNthCalledWith(2, "caB");
      expect(cb).toHaveBeenNthCalledWith(3, "b ca");
    });
  });

  describe("createDictionary", () => {
    let dict;
    beforeAll(async () => {
      dict = await createDictionary(MOCK_WORDLIST);
    });

    it("should return a dictionary", async () => {
      expect(dict).not.toBeUndefined();
    });

    it("should find all anagrams", function () {
      const anagrams = dict.find("abc");
      expect(anagrams).toEqual(["cba", "caB", "b ca"]);
    });

    it("should find all anagrams, if there are spaces in the input", function () {
      const anagrams = dict.find("a bc");
      expect(anagrams).toEqual(["cba", "caB", "b ca"]);
    });
  });
});
